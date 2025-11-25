"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = seed;
const uuid_1 = require("uuid");
async function seed(knex) {
    // Delete existing data
    await knex('features').where('entity_type', 'product').del();
    await knex('images').where('entity_type', 'product').del();
    await knex('products').del();
    const products = [
        {
            id: (0, uuid_1.v4)(),
            name: 'Backdrop Hoa Tươi Cao Cấp',
            slug: 'backdrop-hoa-tuoi-cao-cap',
            description: 'Backdrop trang trí bằng hoa tươi nhập khẩu, thiết kế sang trọng',
            price: 15000000,
            category: 'backdrop',
            is_popular: true,
            is_active: true,
            features: {
                included: [
                    'Hoa tươi nhập khẩu',
                    'Thiết kế theo yêu cầu',
                    'Kích thước 3m x 4m',
                    'Setup tại địa điểm',
                    'Bảo quản trong 8 giờ',
                ],
                excluded: ['Vận chuyển ngoài 20km', 'Thay đổi thiết kế sau khi setup'],
                highlights: ['Hoa tươi nhập khẩu', 'Thiết kế theo yêu cầu', 'Kích thước 3m x 4m'],
            },
            images: [
                'https://images.unsplash.com/photo-1519741497674-611481863552?w=800',
                'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800',
            ],
        },
        {
            id: (0, uuid_1.v4)(),
            name: 'Bàn Ghế Tiệc Cưới',
            slug: 'ban-ghe-tiec-cuoi',
            description: 'Bộ bàn ghế tiệc cưới sang trọng, phù hợp mọi không gian',
            price: 5000000,
            category: 'furniture',
            is_popular: false,
            is_active: true,
            features: {
                included: [
                    'Bàn tròn 10 người',
                    'Ghế có nệm êm ái',
                    'Khăn trải bàn cao cấp',
                    'Setup và thu dọn',
                    'Vệ sinh sạch sẽ',
                ],
                excluded: ['Trang trí bàn', 'Hoa để bàn'],
                highlights: ['Bàn tròn 10 người', 'Ghế có nệm êm ái', 'Khăn trải bàn cao cấp'],
            },
            images: ['https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800'],
        },
        {
            id: (0, uuid_1.v4)(),
            name: 'Hệ Thống Âm Thanh Ánh Sáng',
            slug: 'he-thong-am-thanh-anh-sang',
            description: 'Hệ thống âm thanh ánh sáng chuyên nghiệp cho tiệc cưới',
            price: 8000000,
            category: 'equipment',
            is_popular: true,
            is_active: true,
            features: {
                included: [
                    'Loa công suất lớn',
                    'Micro không dây',
                    'Đèn LED sân khấu',
                    'Kỹ thuật viên vận hành',
                    'Backup thiết bị',
                ],
                excluded: ['DJ', 'Ban nhạc'],
                highlights: ['Loa công suất lớn', 'Micro không dây', 'Đèn LED sân khấu'],
            },
            images: ['https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800'],
        },
    ];
    // Insert products, features, and images
    for (const product of products) {
        const { features, images, ...productData } = product;
        // Insert product
        await knex('products').insert(productData);
        // Insert features
        let order = 0;
        for (const feature of features.included) {
            await knex('features').insert({
                id: (0, uuid_1.v4)(),
                entity_id: product.id,
                entity_type: 'product',
                feature_text: feature,
                feature_type: 'included',
                display_order: order++,
            });
        }
        for (const feature of features.excluded) {
            await knex('features').insert({
                id: (0, uuid_1.v4)(),
                entity_id: product.id,
                entity_type: 'product',
                feature_text: feature,
                feature_type: 'excluded',
                display_order: order++,
            });
        }
        for (const feature of features.highlights) {
            await knex('features').insert({
                id: (0, uuid_1.v4)(),
                entity_id: product.id,
                entity_type: 'product',
                feature_text: feature,
                feature_type: 'highlight',
                display_order: order++,
            });
        }
        // Insert images
        for (let i = 0; i < images.length; i++) {
            await knex('images').insert({
                id: (0, uuid_1.v4)(),
                entity_id: product.id,
                entity_type: 'product',
                url: images[i],
                display_order: i,
                is_primary: i === 0,
            });
        }
    }
}
//# sourceMappingURL=005_products.js.map