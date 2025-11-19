import { Knex } from 'knex';
import { v4 as uuidv4 } from 'uuid';

export async function seed(knex: Knex): Promise<void> {
  // Clear existing entries
  await knex('testimonials').del();

  // Insert sample testimonials
  await knex('testimonials').insert([
    {
      id: uuidv4(),
      client_name: 'Nguyễn Văn A',
      client_role: 'Chú rể',
      content: 'Dịch vụ tuyệt vời! Đội ngũ rất chuyên nghiệp và tận tâm. Đám cưới của chúng tôi thật hoàn hảo nhờ sự hỗ trợ của các bạn.',
      rating: 5,
      event_date: new Date('2024-10-15'),
      location: 'Hà Nội',
      language: 'vi',
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: uuidv4(),
      client_name: 'Trần Thị B',
      client_role: 'Cô dâu',
      content: 'Rất hài lòng với dịch vụ trang trí và chụp ảnh. Mọi thứ đều được chuẩn bị chu đáo và đẹp mắt.',
      rating: 5,
      event_date: new Date('2024-09-20'),
      location: 'TP. Hồ Chí Minh',
      language: 'vi',
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: uuidv4(),
      client_name: 'Lê Văn C',
      client_role: 'Chú rể',
      content: 'Giá cả hợp lý, chất lượng dịch vụ tốt. Đội ngũ nhiệt tình và luôn sẵn sàng hỗ trợ.',
      rating: 4,
      event_date: new Date('2024-11-05'),
      location: 'Đà Nẵng',
      language: 'vi',
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: uuidv4(),
      client_name: 'Phạm Thị D',
      client_role: 'Cô dâu',
      content: 'Đám cưới của tôi thật đáng nhớ. Cảm ơn đội ngũ đã tạo nên một ngày đặc biệt như vậy!',
      rating: 5,
      event_date: new Date('2024-08-12'),
      location: 'Hải Phòng',
      language: 'vi',
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: uuidv4(),
      client_name: 'John Smith',
      client_role: 'Groom',
      content: 'Excellent service! The team was very professional and attentive. Our wedding was perfect thanks to their support.',
      rating: 5,
      event_date: new Date('2024-07-25'),
      location: 'Hanoi',
      language: 'en',
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
  ]);
}
