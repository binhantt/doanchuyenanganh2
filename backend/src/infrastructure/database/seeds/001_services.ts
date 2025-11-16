import { Knex } from 'knex';
import { v4 as uuidv4 } from 'uuid';

export async function seed(knex: Knex): Promise<void> {
  // Delete existing data
  await knex('features').where('entity_type', 'service').del();
  await knex('images').where('entity_type', 'service').del();
  await knex('services').del();

  // Define services with their features and images
  const services = [
    {
      id: 'service-1',
      name: 'Trang Trí Tiệc Cưới',
      slug: 'trang-tri-tiec-cuoi',
      short_description: 'Dịch vụ trang trí tiệc cưới chuyên nghiệp với thiết kế độc đáo',
      full_description: 'Chúng tôi cung cấp dịch vụ trang trí tiệc cưới toàn diện với đội ngũ thiết kế giàu kinh nghiệm. Từ backdrop, sân khấu đến trang trí bàn tiệc, chúng tôi đảm bảo mang đến không gian cưới đẹp nhất cho ngày trọng đại của bạn.',
      icon: 'sparkles',
      base_price: 30000000,
      is_active: true,
      features: {
        included: [
          'Thiết kế concept độc đáo',
          'Trang trí backdrop chuyên nghiệp',
          'Trang trí sân khấu',
          'Trang trí bàn tiệc',
          'Hoa tươi cao cấp',
          'Setup và dọn dẹp',
        ],
        excluded: ['Âm thanh ánh sáng', 'MC dẫn chương trình'],
        highlights: ['Thiết kế concept độc đáo', 'Trang trí backdrop chuyên nghiệp', 'Hoa tươi cao cấp'],
      },
      images: [
        'https://images.unsplash.com/photo-1519741497674-611481863552?w=800',
        'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800',
        'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=800',
      ],
    },
    {
      id: 'service-2',
      name: 'Chụp Ảnh Cưới',
      slug: 'chup-anh-cuoi',
      short_description: 'Dịch vụ chụp ảnh cưới chuyên nghiệp với nhiều gói lựa chọn',
      full_description: 'Đội ngũ photographer chuyên nghiệp với nhiều năm kinh nghiệm sẽ ghi lại những khoảnh khắc đẹp nhất trong ngày cưới của bạn. Chúng tôi cung cấp nhiều phong cách chụp từ truyền thống đến hiện đại.',
      icon: 'camera',
      base_price: 20000000,
      is_active: true,
      features: {
        included: [
          'Photographer chuyên nghiệp',
          'Chụp không giới hạn',
          'Chỉnh sửa ảnh chuyên nghiệp',
          'Album ảnh cao cấp',
          'File ảnh gốc',
          'Backup dữ liệu',
        ],
        excluded: ['Quay phim', 'Makeup'],
        highlights: ['Photographer chuyên nghiệp', 'Chụp không giới hạn', 'Album ảnh cao cấp'],
      },
      images: [
        'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800',
        'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800',
      ],
    },
    {
      id: 'service-3',
      name: 'Quay Phim Cưới',
      slug: 'quay-phim-cuoi',
      short_description: 'Dịch vụ quay phim cưới cinematic chuyên nghiệp',
      full_description: 'Chúng tôi tạo ra những video cưới cinematic đẹp mắt với kỹ thuật quay phim hiện đại. Mỗi video là một câu chuyện tình yêu độc đáo được kể lại một cách nghệ thuật.',
      icon: 'video',
      base_price: 25000000,
      is_active: true,
      features: {
        included: [
          'Quay phim 4K',
          'Flycam chuyên nghiệp',
          'Chỉnh sửa cinematic',
          'Video highlights 5-10 phút',
          'Video full ceremony',
          'Nhạc nền bản quyền',
        ],
        excluded: ['Chụp ảnh', 'Live stream'],
        highlights: ['Quay phim 4K', 'Flycam chuyên nghiệp', 'Chỉnh sửa cinematic'],
      },
      images: ['https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800'],
    },
  ];

  // Insert services, features, and images
  for (const service of services) {
    const { features, images, ...serviceData } = service;

    // Insert service
    await knex('services').insert(serviceData);

    // Insert features
    let order = 0;
    for (const feature of features.included) {
      await knex('features').insert({
        id: uuidv4(),
        entity_id: service.id,
        entity_type: 'service',
        feature_text: feature,
        feature_type: 'included',
        display_order: order++,
      });
    }

    for (const feature of features.excluded) {
      await knex('features').insert({
        id: uuidv4(),
        entity_id: service.id,
        entity_type: 'service',
        feature_text: feature,
        feature_type: 'excluded',
        display_order: order++,
      });
    }

    for (const feature of features.highlights) {
      await knex('features').insert({
        id: uuidv4(),
        entity_id: service.id,
        entity_type: 'service',
        feature_text: feature,
        feature_type: 'highlight',
        display_order: order++,
      });
    }

    // Insert images
    for (let i = 0; i < images.length; i++) {
      await knex('images').insert({
        id: uuidv4(),
        entity_id: service.id,
        entity_type: 'service',
        url: images[i],
        display_order: i,
        is_primary: i === 0,
      });
    }
  }
}
