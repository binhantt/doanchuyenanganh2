"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PackageRepository = void 0;
const Package_1 = require("../../domain/entities/Package");
const connection_1 = require("../database/connection");
class PackageRepository {
    constructor() {
        this.tableName = 'packages';
    }
    async loadFeaturesAndImages(packageId) {
        // Load features
        const featuresRows = await (0, connection_1.db)('features')
            .where({ entity_id: packageId, entity_type: 'package' })
            .orderBy('display_order', 'asc');
        const features = {
            included: [],
            excluded: [],
            highlights: [],
        };
        for (const row of featuresRows) {
            if (row.feature_type === 'included') {
                features.included.push(row.feature_text);
            }
            else if (row.feature_type === 'excluded') {
                features.excluded.push(row.feature_text);
            }
            else if (row.feature_type === 'highlight') {
                features.highlights.push(row.feature_text);
            }
        }
        // Load images
        const imagesRows = await (0, connection_1.db)('images')
            .where({ entity_id: packageId, entity_type: 'package' })
            .orderBy('display_order', 'asc');
        const images = imagesRows.map((row) => row.url);
        return { features, images };
    }
    async mapRowToEntity(row) {
        const { features, images } = await this.loadFeaturesAndImages(row.id);
        return new Package_1.Package(row.id, row.name, row.slug, row.description, Number(row.price), features, images, Boolean(row.is_popular), Boolean(row.is_active), new Date(row.created_at), new Date(row.updated_at));
    }
    async findAll(filters) {
        let query = (0, connection_1.db)(this.tableName);
        if (filters?.keyword) {
            query = query.where((builder) => {
                builder
                    .where('name', 'like', `%${filters.keyword}%`)
                    .orWhere('description', 'like', `%${filters.keyword}%`);
            });
        }
        if (filters?.isActive !== undefined) {
            query = query.where('is_active', filters.isActive);
        }
        if (filters?.isPopular !== undefined) {
            query = query.where('is_popular', filters.isPopular);
        }
        // Map camelCase to snake_case for database columns
        const columnMap = {
            createdAt: 'created_at',
            updatedAt: 'updated_at',
            isPopular: 'is_popular',
            isActive: 'is_active'
        };
        const sortBy = filters?.sortBy || 'created_at';
        const sortOrder = filters?.sortOrder || 'desc';
        const dbColumn = columnMap[sortBy] || sortBy;
        query = query.orderBy(dbColumn, sortOrder);
        const rows = await query.select('*');
        return Promise.all(rows.map((row) => this.mapRowToEntity(row)));
    }
    async findById(id) {
        const row = await (0, connection_1.db)(this.tableName).where({ id }).first();
        return row ? this.mapRowToEntity(row) : null;
    }
    async findBySlug(slug) {
        const row = await (0, connection_1.db)(this.tableName).where({ slug }).first();
        return row ? this.mapRowToEntity(row) : null;
    }
    async findActive() {
        const rows = await (0, connection_1.db)(this.tableName)
            .where({ is_active: true })
            .select('*')
            .orderBy('price', 'asc');
        return Promise.all(rows.map((row) => this.mapRowToEntity(row)));
    }
    async findPopular() {
        const rows = await (0, connection_1.db)(this.tableName)
            .where({ is_popular: true, is_active: true })
            .select('*');
        return Promise.all(rows.map((row) => this.mapRowToEntity(row)));
    }
    async create(pkg) {
        const trx = await connection_1.db.transaction();
        try {
            // Insert package
            await trx(this.tableName).insert({
                id: pkg.id,
                name: pkg.name,
                slug: pkg.slug,
                description: pkg.description,
                price: pkg.price,
                is_popular: pkg.isPopular,
                is_active: pkg.isActive,
            });
            // Insert features
            let order = 0;
            for (const feature of pkg.features.included) {
                await trx('features').insert({
                    id: require('uuid').v4(),
                    entity_id: pkg.id,
                    entity_type: 'package',
                    feature_text: feature,
                    feature_type: 'included',
                    display_order: order++,
                });
            }
            if (pkg.features.excluded) {
                for (const feature of pkg.features.excluded) {
                    await trx('features').insert({
                        id: require('uuid').v4(),
                        entity_id: pkg.id,
                        entity_type: 'package',
                        feature_text: feature,
                        feature_type: 'excluded',
                        display_order: order++,
                    });
                }
            }
            if (pkg.features.highlights) {
                for (const feature of pkg.features.highlights) {
                    await trx('features').insert({
                        id: require('uuid').v4(),
                        entity_id: pkg.id,
                        entity_type: 'package',
                        feature_text: feature,
                        feature_type: 'highlight',
                        display_order: order++,
                    });
                }
            }
            // Insert images
            for (let i = 0; i < pkg.images.length; i++) {
                await trx('images').insert({
                    id: require('uuid').v4(),
                    entity_id: pkg.id,
                    entity_type: 'package',
                    url: pkg.images[i],
                    display_order: i,
                    is_primary: i === 0,
                });
            }
            await trx.commit();
            return pkg;
        }
        catch (error) {
            await trx.rollback();
            throw error;
        }
    }
    async update(id, data) {
        const trx = await connection_1.db.transaction();
        try {
            const updateData = {};
            if (data.name)
                updateData.name = data.name;
            if (data.slug)
                updateData.slug = data.slug;
            if (data.description)
                updateData.description = data.description;
            if (data.price !== undefined)
                updateData.price = data.price;
            if (data.isPopular !== undefined)
                updateData.is_popular = data.isPopular;
            if (data.isActive !== undefined)
                updateData.is_active = data.isActive;
            updateData.updated_at = connection_1.db.fn.now();
            const updated = await trx(this.tableName).where({ id }).update(updateData);
            if (updated === 0) {
                await trx.rollback();
                return null;
            }
            // Update features if provided
            if (data.features) {
                await trx('features').where({ entity_id: id, entity_type: 'package' }).del();
                let order = 0;
                for (const feature of data.features.included) {
                    await trx('features').insert({
                        id: require('uuid').v4(),
                        entity_id: id,
                        entity_type: 'package',
                        feature_text: feature,
                        feature_type: 'included',
                        display_order: order++,
                    });
                }
                if (data.features.excluded) {
                    for (const feature of data.features.excluded) {
                        await trx('features').insert({
                            id: require('uuid').v4(),
                            entity_id: id,
                            entity_type: 'package',
                            feature_text: feature,
                            feature_type: 'excluded',
                            display_order: order++,
                        });
                    }
                }
                if (data.features.highlights) {
                    for (const feature of data.features.highlights) {
                        await trx('features').insert({
                            id: require('uuid').v4(),
                            entity_id: id,
                            entity_type: 'package',
                            feature_text: feature,
                            feature_type: 'highlight',
                            display_order: order++,
                        });
                    }
                }
            }
            // Update images if provided
            if (data.images) {
                await trx('images').where({ entity_id: id, entity_type: 'package' }).del();
                for (let i = 0; i < data.images.length; i++) {
                    await trx('images').insert({
                        id: require('uuid').v4(),
                        entity_id: id,
                        entity_type: 'package',
                        url: data.images[i],
                        display_order: i,
                        is_primary: i === 0,
                    });
                }
            }
            await trx.commit();
            return this.findById(id);
        }
        catch (error) {
            await trx.rollback();
            throw error;
        }
    }
    async delete(id) {
        const trx = await connection_1.db.transaction();
        try {
            // Delete related features and images
            await trx('features').where({ entity_id: id, entity_type: 'package' }).del();
            await trx('images').where({ entity_id: id, entity_type: 'package' }).del();
            // Delete package
            const deleted = await trx(this.tableName).where({ id }).del();
            await trx.commit();
            return deleted > 0;
        }
        catch (error) {
            await trx.rollback();
            throw error;
        }
    }
}
exports.PackageRepository = PackageRepository;
//# sourceMappingURL=PackageRepository.js.map