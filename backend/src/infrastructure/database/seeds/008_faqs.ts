import { Knex } from 'knex';
import { v4 as uuidv4 } from 'uuid';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('faqs').del();

  // Inserts seed entries
  await knex('faqs').insert([
    {
      id: uuidv4(),
      question: 'Dịch vụ của bạn bao gồm những gì?',
      answer:
        'Chúng tôi cung cấp đầy đủ các dịch vụ tổ chức tiệc cưới bao gồm: trang trí sảnh tiệc, trang điểm cô dâu chú rể, chụp ảnh và quay phim, âm thanh ánh sáng, MC dẫn chương trình, backdrop và photobooth, wedding planner chuyên nghiệp, và nhiều dịch vụ khác. Bạn có thể lựa chọn gói dịch vụ phù hợp hoặc tùy chỉnh theo nhu cầu.',
      category: 'Services',
      language: 'vi',
      display_order: 1,
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: uuidv4(),
      question: 'What services do you offer?',
      answer:
        'We provide comprehensive wedding organization services including: hall decoration, bride and groom makeup, photography and videography, sound and lighting, MC hosting, backdrop and photobooth, professional wedding planning, and many other services. You can choose a suitable package or customize according to your needs.',
      category: 'Services',
      language: 'en',
      display_order: 1,
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
  ]);
}
