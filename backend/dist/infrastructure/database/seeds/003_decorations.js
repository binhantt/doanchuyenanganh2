"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = seed;
const uuid_1 = require("uuid");
async function seed(knex) {
    // Delete existing data
    await knex('features').where('entity_type', 'decoration').del();
    await knex('images').where('entity_type', 'decoration').del();
    await knex('decorations').del();
    const decorations = [
        {
            id: (0, uuid_1.v4)(),
            name: 'Trang trí tiệc cưới Romantic',
            slug: 'trang-tri-tiec-cuoi-romantic',
            description: 'Thiết kế và trang trí không gian tiệc cưới sang trọng, lãng mạn với phong cách độc đáo, phù hợp với chủ đề và sở thích của bạn.',
            theme: 'Romantic',
            style: 'Sang trọng',
            base_price: 15000000,
            is_active: true,
            features: {
                included: [
                    'Thiết kế concept độc đáo',
                    'Backdrop sân khấu cao cấp',
                    'Trang trí bàn tiệc',
                    'Hoa tươi cao cấp',
                    'Ánh sáng nghệ thuật',
                    'Đội ngũ setup chuyên nghiệp',
                ],
                excluded: [],
                highlights: ['Thiết kế concept độc đáo', 'Backdrop sân khấu cao cấp', 'Hoa tươi cao cấp'],
            },
            images: [
                'https://images.unsplash.com/photo-1519741497674-611481863552?w=800',
                'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800',
                'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=800',
            ],
        },
        {
            id: (0, uuid_1.v4)(),
            name: 'Trang trí tiệc cưới Vintage',
            slug: 'trang-tri-tiec-cuoi-vintage',
            description: 'Phong cách vintage cổ điển, mang đến không gian ấm cúng và đầy hoài niệm cho ngày trọng đại của bạn.',
            theme: 'Vintage',
            style: 'Cổ điển',
            base_price: 12000000,
            is_active: true,
            features: {
                included: [
                    'Concept vintage độc đáo',
                    'Đồ trang trí cổ điển',
                    'Bàn ghế gỗ vintage',
                    'Hoa khô và hoa tươi kết hợp',
                    'Ánh sáng vàng ấm',
                    'Phụ kiện trang trí handmade',
                ],
                excluded: [],
                highlights: ['Concept vintage độc đáo', 'Đồ trang trí cổ điển', 'Bàn ghế gỗ vintage'],
            },
            images: [
                'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800',
                'https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=800',
            ],
        },
        {
            id: (0, uuid_1.v4)(),
            name: 'Trang trí tiệc cưới Modern',
            slug: 'trang-tri-tiec-cuoi-modern',
            description: 'Phong cách hiện đại, tối giản nhưng vẫn sang trọng và ấn tượng với những đường nét tinh tế.',
            theme: 'Modern',
            style: 'Hiện đại',
            base_price: 18000000,
            is_active: true,
            features: {
                included: [
                    'Thiết kế hiện đại tối giản',
                    'Backdrop LED cao cấp',
                    'Trang trí bàn tiệc sang trọng',
                    'Hoa tươi nhập khẩu',
                    'Hệ thống ánh sáng thông minh',
                    'Công nghệ mapping 3D',
                ],
                excluded: [],
                highlights: ['Thiết kế hiện đại tối giản', 'Backdrop LED cao cấp', 'Công nghệ mapping 3D'],
            },
            images: [
                'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800',
                'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800',
                'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800',
            ],
        },
        {
            id: (0, uuid_1.v4)(),
            name: 'Trang trí tiệc cưới Garden',
            slug: 'trang-tri-tiec-cuoi-garden',
            description: 'Phong cách vườn xanh mát mẻ, gần gũi với thiên nhiên, tạo không gian thư giãn và thoải mái.',
            theme: 'Garden',
            style: 'Thiên nhiên',
            base_price: 14000000,
            is_active: true,
            features: {
                included: [
                    'Concept vườn xanh',
                    'Cây xanh và hoa tươi tự nhiên',
                    'Backdrop hoa tươi',
                    'Bàn ghế gỗ tự nhiên',
                    'Ánh sáng tự nhiên',
                    'Trang trí lối đi hoa',
                ],
                excluded: [],
                highlights: ['Concept vườn xanh', 'Cây xanh và hoa tươi tự nhiên', 'Backdrop hoa tươi'],
            },
            images: [
                'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800',
                'https://images.unsplash.com/photo-1519167758481-83f29da8c2b0?w=800',
            ],
        },
        {
            id: (0, uuid_1.v4)(),
            name: 'Trang trí tiệc cưới Luxury',
            slug: 'trang-tri-tiec-cuoi-luxury',
            description: 'Phong cách xa hoa, đẳng cấp với những chi tiết trang trí cao cấp nhất, phù hợp cho tiệc cưới quy mô lớn.',
            theme: 'Luxury',
            style: 'Xa hoa',
            base_price: 25000000,
            is_active: true,
            features: {
                included: [
                    'Thiết kế concept đẳng cấp',
                    'Backdrop pha lê cao cấp',
                    'Hoa tươi nhập khẩu cao cấp',
                    'Trang trí bàn tiệc sang trọng',
                    'Hệ thống ánh sáng nghệ thuật',
                    'Sân khấu 3D mapping',
                    'Đội ngũ setup chuyên nghiệp',
                    'Phụ kiện trang trí cao cấp',
                ],
                excluded: [],
                highlights: ['Backdrop pha lê cao cấp', 'Sân khấu 3D mapping', 'Hoa tươi nhập khẩu cao cấp'],
            },
            images: [
                'https://images.unsplash.com/photo-1519741497674-611481863552?w=800',
                'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800',
                'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=800',
                'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800',
            ],
        },
    ];
    // Insert decorations, features, and images
    for (const decoration of decorations) {
        const { features, images, ...decorationData } = decoration;
        // Insert decoration
        await knex('decorations').insert(decorationData);
        // Insert features
        let order = 0;
        for (const feature of features.included) {
            await knex('features').insert({
                id: (0, uuid_1.v4)(),
                entity_id: decoration.id,
                entity_type: 'decoration',
                feature_text: feature,
                feature_type: 'included',
                display_order: order++,
            });
        }
        for (const feature of features.excluded) {
            await knex('features').insert({
                id: (0, uuid_1.v4)(),
                entity_id: decoration.id,
                entity_type: 'decoration',
                feature_text: feature,
                feature_type: 'excluded',
                display_order: order++,
            });
        }
        for (const feature of features.highlights) {
            await knex('features').insert({
                id: (0, uuid_1.v4)(),
                entity_id: decoration.id,
                entity_type: 'decoration',
                feature_text: feature,
                feature_type: 'highlight',
                display_order: order++,
            });
        }
        // Insert images
        for (let i = 0; i < images.length; i++) {
            await knex('images').insert({
                id: (0, uuid_1.v4)(),
                entity_id: decoration.id,
                entity_type: 'decoration',
                url: images[i],
                display_order: i,
                is_primary: i === 0,
            });
        }
    }
}
//# sourceMappingURL=003_decorations.js.map