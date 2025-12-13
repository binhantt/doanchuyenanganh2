import { Knex } from 'knex';
import { v4 as uuidv4 } from 'uuid';

export async function seed(knex: Knex): Promise<void> {
  // Get a sample user (assuming users exist from previous seeds)
  const users = await knex('users').select('id').limit(3);
  
  if (users.length === 0) {
    console.log('No users found. Skipping invitation seeds.');
    return;
  }

  // Delete existing invitations
  await knex('invitations').del();

  const sampleInvitations = [
    {
      id: uuidv4(),
      user_id: users[0].id,
      template_id: 1,
      groom_name: 'Nguyễn Văn Anh',
      bride_name: 'Trần Thị Bình',
      wedding_date: '2024-12-25',
      wedding_time: '18:00:00',
      venue: 'Nhà hàng Tiệc Cưới Hoa Hồng',
      venue_address: '123 Đường Lê Lợi, Quận 1, TP.HCM',
      recipient_name: 'Anh/Chị Nguyễn Văn C',
      message: 'Rất hân hạnh được đón tiếp quý khách trong ngày trọng đại của chúng tôi',
      cover_image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&h=900&fit=crop',
      avatar_image: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=400&h=400&fit=crop',
      share_url: 'abc12345',
      is_active: true,
    },
    {
      id: uuidv4(),
      user_id: users[0].id,
      template_id: 2,
      groom_name: 'Lê Minh Đức',
      bride_name: 'Phạm Thu Hà',
      wedding_date: '2024-12-31',
      wedding_time: '19:00:00',
      venue: 'Trung tâm Hội nghị Tiệc cưới Diamond',
      venue_address: '456 Đường Nguyễn Huệ, Quận 1, TP.HCM',
      recipient_name: 'Anh/Chị Trần Văn D',
      message: 'Chúng tôi rất vui mừng được chia sẻ niềm hạnh phúc này cùng quý khách',
      cover_image: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=1200&h=900&fit=crop',
      share_url: 'def67890',
      is_active: true,
    },
    {
      id: uuidv4(),
      user_id: users[0].id,
      template_id: 3,
      groom_name: 'Hoàng Quốc Việt',
      bride_name: 'Đỗ Thị Mai',
      wedding_date: '2025-01-15',
      wedding_time: '17:30:00',
      venue: 'Khách sạn Continental',
      venue_address: '132-134 Đường Đồng Khởi, Quận 1, TP.HCM',
      recipient_name: 'Anh/Chị Lê Thị E',
      message: null,
      cover_image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1200&h=900&fit=crop',
      share_url: 'ghi11223',
      is_active: true,
    },
    {
      id: uuidv4(),
      user_id: users.length > 1 ? users[1].id : users[0].id,
      template_id: 4,
      groom_name: 'Vũ Đình Khoa',
      bride_name: 'Ngô Thị Lan',
      wedding_date: '2025-02-14',
      wedding_time: '18:30:00',
      venue: 'Nhà hàng Riverside Palace',
      venue_address: '789 Đường Tôn Đức Thắng, Quận 1, TP.HCM',
      recipient_name: 'Anh/Chị Phạm Văn F',
      message: 'Sự hiện diện của quý khách là niềm vinh hạnh lớn lao đối với gia đình chúng tôi',
      share_url: 'jkl44556',
      is_active: true,
    },
    {
      id: uuidv4(),
      user_id: users.length > 1 ? users[1].id : users[0].id,
      template_id: 5,
      groom_name: 'Đặng Tuấn Anh',
      bride_name: 'Bùi Thị Ngọc',
      wedding_date: '2025-03-08',
      wedding_time: '19:30:00',
      venue: 'Trung tâm Tiệc cưới White Palace',
      venue_address: '194 Đường Hoàng Văn Thụ, Phú Nhuận, TP.HCM',
      recipient_name: 'Anh/Chị Vũ Thị G',
      message: 'Chúng tôi rất mong được đón tiếp quý khách trong ngày vui của gia đình',
      share_url: 'mno77889',
      is_active: true,
    },
    {
      id: uuidv4(),
      user_id: users.length > 2 ? users[2].id : users[0].id,
      template_id: 6,
      groom_name: 'Trịnh Công Sơn',
      bride_name: 'Lý Thị Hương',
      wedding_date: '2025-04-20',
      wedding_time: '18:00:00',
      venue: 'Nhà hàng Sài Gòn Palace',
      venue_address: '45 Đường Pasteur, Quận 1, TP.HCM',
      recipient_name: 'Anh/Chị Đặng Văn H',
      message: 'Kính mời quý khách đến dự và chung vui cùng gia đình chúng tôi',
      share_url: 'pqr99001',
      is_active: true,
    },
  ];

  // Insert sample invitations
  await knex('invitations').insert(sampleInvitations);

  console.log(`✅ Seeded ${sampleInvitations.length} sample invitations`);
}
