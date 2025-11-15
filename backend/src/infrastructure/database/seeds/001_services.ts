import { Knex } from 'knex';
import { v4 as uuidv4 } from 'uuid';

export async function seed(knex: Knex): Promise<void> {
  await knex('services').del();

  await knex('services').insert([
    {
      id: uuidv4(),
      name: 'Makeup Artist',
      slug: 'makeup-artist',
      short_description: 'Dịch vụ trang điểm cô dâu chuyên nghiệp',
      full_description: 'Đội ngũ makeup artist chuyên nghiệp với kinh nghiệm nhiều năm, sử dụng mỹ phẩm cao cấp, tạo nên vẻ đẹp hoàn hảo cho cô dâu trong ngày trọng đại.',
      icon: 'Brush',
      features: JSON.stringify([
        'Makeup artist chuyên nghiệp',
        'Mỹ phẩm cao cấp',
        'Trang điểm thử trước',
        'Làm tóc cô dâu',
        'Phục vụ tại nhà',
      ]),
      base_price: 3000000,
      is_active: true,
    },
    {
      id: uuidv4(),
      name: 'Wedding Photography',
      slug: 'wedding-photography',
      short_description: 'Chụp ảnh cưới chuyên nghiệp',
      full_description: 'Dịch vụ chụp ảnh cưới với photographer giàu kinh nghiệm, thiết bị hiện đại, lưu giữ những khoảnh khắc đẹp nhất của bạn.',
      icon: 'Camera',
      features: JSON.stringify([
        'Photographer chuyên nghiệp',
        'Thiết bị chụp hiện đại',
        'Chụp cả ngày cưới',
        'Album ảnh cao cấp',
        'Chỉnh sửa ảnh chuyên nghiệp',
        'Video highlights',
      ]),
      base_price: 8000000,
      is_active: true,
    },
    {
      id: uuidv4(),
      name: 'Wedding Cake',
      slug: 'wedding-cake',
      short_description: 'Bánh cưới đẹp mắt và ngon miệng',
      full_description: 'Bánh cưới được thiết kế độc đáo, phù hợp với chủ đề đám cưới, làm từ nguyên liệu cao cấp, đảm bảo vừa đẹp mắt vừa ngon miệng.',
      icon: 'Cake',
      features: JSON.stringify([
        'Thiết kế bánh độc đáo',
        'Nguyên liệu cao cấp',
        'Nhiều tầng lựa chọn',
        'Trang trí theo yêu cầu',
        'Giao hàng tận nơi',
      ]),
      base_price: 2500000,
      is_active: true,
    },
    {
      id: uuidv4(),
      name: 'Wedding Music',
      slug: 'wedding-music',
      short_description: 'Ban nhạc và DJ chuyên nghiệp',
      full_description: 'Dịch vụ âm nhạc cho đám cưới với ban nhạc sống hoặc DJ chuyên nghiệp, tạo không khí sôi động và lãng mạn cho tiệc cưới.',
      icon: 'Music',
      features: JSON.stringify([
        'Ban nhạc chuyên nghiệp',
        'DJ có kinh nghiệm',
        'Hệ thống âm thanh hiện đại',
        'Playlist theo yêu cầu',
        'MC dẫn chương trình',
      ]),
      base_price: 5000000,
      is_active: true,
    },
    {
      id: uuidv4(),
      name: 'Wedding Planner',
      slug: 'wedding-planner',
      short_description: 'Tư vấn và tổ chức đám cưới trọn gói',
      full_description: 'Dịch vụ wedding planner chuyên nghiệp, hỗ trợ lên kế hoạch, tư vấn và điều phối mọi khâu trong đám cưới của bạn.',
      icon: 'ClipboardList',
      features: JSON.stringify([
        'Tư vấn concept đám cưới',
        'Lập kế hoạch chi tiết',
        'Quản lý ngân sách',
        'Điều phối nhà cung cấp',
        'Giám sát ngày cưới',
        'Xử lý sự cố',
      ]),
      base_price: 10000000,
      is_active: true,
    },
  ]);
}
