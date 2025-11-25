"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = seed;
const uuid_1 = require("uuid");
async function seed(knex) {
    // Delete existing data
    await knex('features').where('entity_type', 'package').del();
    await knex('images').where('entity_type', 'package').del();
    await knex('packages').del();
    const packages = [
        {
            id: 'b7dcfca2-3c14-4d66-9a07-af643b5f2dbb',
            name: 'Gói Basic',
            slug: 'goi-basic',
            description: 'Gói cơ bản cho tiệc cưới ấm cúng',
            price: 50000000,
            is_popular: false,
            is_active: true,
            features: {
                included: [
                    'Trang trí sảnh tiệc cơ bản',
                    'Backdrop chụp ảnh đơn giản',
                    'Âm thanh ánh sáng cơ bản',
                    'MC dẫn chương trình',
                    'Hỗ trợ setup và dọn dẹp',
                    'Tư vấn kế hoạch cơ bản',
                ],
                excluded: ['Makeup artist', 'Chụp ảnh cưới', 'Album ảnh'],
                highlights: ['Trang trí sảnh tiệc cơ bản', 'MC dẫn chương trình', 'Hỗ trợ setup'],
            },
            images: [
                'https://images.unsplash.com/photo-1519741497674-611481863552?w=800',
                'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800',
                'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=800',
            ],
        },
        {
            id: (0, uuid_1.v4)(),
            name: 'Gói Standard',
            slug: 'goi-standard',
            description: 'Gói tiêu chuẩn với đầy đủ tiện nghi',
            price: 80000000,
            is_popular: true,
            is_active: true,
            features: {
                included: [
                    'Trang trí sảnh tiệc cao cấp',
                    'Backdrop chụp ảnh đẹp mắt',
                    'Hệ thống âm thanh ánh sáng hiện đại',
                    'MC chuyên nghiệp',
                    'Makeup artist cho cô dâu',
                    'Chụp ảnh cưới (100 ảnh)',
                    'Album ảnh cưới',
                    'Hỗ trợ setup và dọn dẹp',
                    'Tư vấn kế hoạch chi tiết',
                ],
                excluded: ['Quay phim', 'Bánh cưới'],
                highlights: ['Trang trí cao cấp', 'Makeup artist', 'Chụp ảnh cưới'],
            },
            images: [
                'https://images.unsplash.com/photo-1519741497674-611481863552?w=800',
                'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800',
            ],
        },
        {
            id: (0, uuid_1.v4)(),
            name: 'Gói Premium',
            slug: 'goi-premium',
            description: 'Gói Premium mang đến trải nghiệm đám cưới hoàn hảo với đầy đủ các dịch vụ cao cấp. Từ trang trí sang trọng, chụp ảnh quay phim chuyên nghiệp đến wedding planner tận tâm, chúng tôi đảm bảo mọi khoảnh khắc đều trọn vẹn.',
            price: 100000000,
            is_popular: true,
            is_active: true,
            features: {
                included: [
                    'Trang trí sảnh tiệc sang trọng',
                    'Chụp ảnh quay phim chuyên nghiệp',
                    'Wedding planner tận tâm',
                    'Hệ thống âm thanh ánh sáng cao cấp',
                    'MC dẫn chương trình chuyên nghiệp',
                    'Makeup artist + Hair stylist',
                    'Backdrop 3D cao cấp',
                    'Album ảnh + Video highlights',
                    'Bánh cưới 3 tầng',
                    'Hoa tươi cao cấp',
                    'Hỗ trợ setup và dọn dẹp',
                    'Tư vấn kế hoạch chi tiết',
                ],
                excluded: ['Xe hoa', 'Pháo hoa'],
                highlights: ['Wedding planner tận tâm', 'Chụp ảnh quay phim', 'Backdrop 3D cao cấp'],
            },
            images: [
                'https://images.unsplash.com/photo-1519741497674-611481863552?w=800',
                'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800',
                'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=800',
            ],
        },
        {
            id: (0, uuid_1.v4)(),
            name: 'Gói Luxury',
            slug: 'goi-luxury',
            description: 'Gói xa hoa đẳng cấp 5 sao',
            price: 200000000,
            is_popular: false,
            is_active: true,
            features: {
                included: [
                    'Trang trí sảnh tiệc đẳng cấp 5 sao',
                    'Backdrop pha lê + LED mapping',
                    'Hệ thống âm thanh ánh sáng đẳng cấp',
                    'MC + Ban nhạc + DJ',
                    'Makeup artist + Hair stylist VIP',
                    'Chụp ảnh cưới không giới hạn',
                    'Quay phim 4K + Flycam',
                    'Album ảnh cao cấp + Video cinematic',
                    'Bánh cưới 5 tầng thiết kế độc đáo',
                    'Hoa tươi nhập khẩu',
                    'Wedding planner chuyên nghiệp',
                    'Xe hoa sang trọng',
                    'Phục vụ rượu champagne',
                    'Pháo hoa nghệ thuật',
                    'Hỗ trợ setup và dọn dẹp',
                ],
                excluded: [],
                highlights: ['Backdrop pha lê + LED mapping', 'MC + Ban nhạc + DJ', 'Quay phim 4K + Flycam'],
            },
            images: [
                'https://images.unsplash.com/photo-1519741497674-611481863552?w=800',
                'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800',
                'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=800',
            ],
        },
    ];
    // Insert packages, features, and images
    for (const pkg of packages) {
        const { features, images, ...packageData } = pkg;
        // Insert package
        await knex('packages').insert(packageData);
        // Insert features
        let order = 0;
        for (const feature of features.included) {
            await knex('features').insert({
                id: (0, uuid_1.v4)(),
                entity_id: pkg.id,
                entity_type: 'package',
                feature_text: feature,
                feature_type: 'included',
                display_order: order++,
            });
        }
        for (const feature of features.excluded) {
            await knex('features').insert({
                id: (0, uuid_1.v4)(),
                entity_id: pkg.id,
                entity_type: 'package',
                feature_text: feature,
                feature_type: 'excluded',
                display_order: order++,
            });
        }
        for (const feature of features.highlights) {
            await knex('features').insert({
                id: (0, uuid_1.v4)(),
                entity_id: pkg.id,
                entity_type: 'package',
                feature_text: feature,
                feature_type: 'highlight',
                display_order: order++,
            });
        }
        // Insert images
        for (let i = 0; i < images.length; i++) {
            await knex('images').insert({
                id: (0, uuid_1.v4)(),
                entity_id: pkg.id,
                entity_type: 'package',
                url: images[i],
                display_order: i,
                is_primary: i === 0,
            });
        }
    }
}
//# sourceMappingURL=004_packages.js.map