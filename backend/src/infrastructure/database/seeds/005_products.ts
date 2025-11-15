import { Knex } from 'knex';
import { v4 as uuidv4 } from 'uuid';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('products').del();

  const now = new Date();

  // Insert seed entries
  await knex('products').insert([
    {
      id: uuidv4(),
      name: 'Nhẫn cưới vàng 18K đính kim cương',
      slug: 'nhan-cuoi-vang-18k-dinh-kim-cuong',
      description: 'Nhẫn cưới vàng 18K đính kim cương thiên nhiên, thiết kế tinh tế, sang trọng. Khắc tên miễn phí cho cặp đôi.',
      price: 8000000,
      category: 'Nhẫn Cưới',
      material: 'Vàng 18K',
      features: JSON.stringify([
        'Vàng 18K nguyên chất',
        'Kim cương thiên nhiên',
        'Thiết kế tinh tế',
        'Khắc tên miễn phí'
      ]),
      images: JSON.stringify([
        '/images/products/nhan-cuoi-vang-18k-1.jpg',
        '/images/products/nhan-cuoi-vang-18k-2.jpg',
        '/images/products/nhan-cuoi-vang-18k-3.jpg'
      ]),
      stock_quantity: 50,
      is_featured: true,
      is_active: true,
      created_at: now,
      updated_at: now,
    },
    {
      id: uuidv4(),
      name: 'Nhẫn cưới vàng trắng 18K',
      slug: 'nhan-cuoi-vang-trang-18k',
      description: 'Nhẫn cưới vàng trắng 18K, thiết kế hiện đại, thanh lịch. Phù hợp cho các cặp đôi yêu thích phong cách tối giản.',
      price: 6500000,
      category: 'Nhẫn Cưới',
      material: 'Vàng Trắng 18K',
      features: JSON.stringify([
        'Vàng trắng 18K',
        'Thiết kế hiện đại',
        'Bề mặt bóng loáng',
        'Khắc tên miễn phí'
      ]),
      images: JSON.stringify([
        '/images/products/nhan-cuoi-vang-trang-1.jpg',
        '/images/products/nhan-cuoi-vang-trang-2.jpg'
      ]),
      stock_quantity: 30,
      is_featured: true,
      is_active: true,
      created_at: now,
      updated_at: now,
    },
    {
      id: uuidv4(),
      name: 'Dây chuyền vàng 24K',
      slug: 'day-chuyen-vang-24k',
      description: 'Dây chuyền vàng 24K nguyên chất, thiết kế cổ điển, sang trọng. Phù hợp làm quà tặng trong các dịp đặc biệt.',
      price: 12000000,
      category: 'Dây Chuyền',
      material: 'Vàng 24K',
      features: JSON.stringify([
        'Vàng 24K nguyên chất',
        'Thiết kế cổ điển',
        'Trọng lượng 5 chỉ',
        'Bảo hành trọn đời'
      ]),
      images: JSON.stringify([
        '/images/products/day-chuyen-vang-24k-1.jpg',
        '/images/products/day-chuyen-vang-24k-2.jpg'
      ]),
      stock_quantity: 20,
      is_featured: false,
      is_active: true,
      created_at: now,
      updated_at: now,
    },
    {
      id: uuidv4(),
      name: 'Vòng tay bạc 925',
      slug: 'vong-tay-bac-925',
      description: 'Vòng tay bạc 925 cao cấp, thiết kế trẻ trung, năng động. Phù hợp cho mọi lứa tuổi.',
      price: 1500000,
      category: 'Vòng Tay',
      material: 'Bạc 925',
      features: JSON.stringify([
        'Bạc 925 cao cấp',
        'Thiết kế trẻ trung',
        'Chống dị ứng',
        'Dễ dàng phối đồ'
      ]),
      images: JSON.stringify([
        '/images/products/vong-tay-bac-925-1.jpg'
      ]),
      stock_quantity: 100,
      is_featured: false,
      is_active: true,
      created_at: now,
      updated_at: now,
    },
    {
      id: uuidv4(),
      name: 'Nhẫn kim cương 1 carat',
      slug: 'nhan-kim-cuong-1-carat',
      description: 'Nhẫn kim cương 1 carat, chất lượng cao, thiết kế sang trọng. Lựa chọn hoàn hảo cho lễ đính hôn.',
      price: 45000000,
      category: 'Nhẫn Kim Cương',
      material: 'Vàng Trắng 18K',
      features: JSON.stringify([
        'Kim cương 1 carat',
        'Độ tinh khiết VVS1',
        'Màu sắc D-E',
        'Giấy chứng nhận GIA'
      ]),
      images: JSON.stringify([
        '/images/products/nhan-kim-cuong-1-carat-1.jpg',
        '/images/products/nhan-kim-cuong-1-carat-2.jpg',
        '/images/products/nhan-kim-cuong-1-carat-3.jpg'
      ]),
      stock_quantity: 5,
      is_featured: true,
      is_active: true,
      created_at: now,
      updated_at: now,
    },
  ]);
}
