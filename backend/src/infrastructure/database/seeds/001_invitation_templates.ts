import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('invitation_templates').del();

  // Inserts seed entries
  await knex('invitation_templates').insert([
    {
      id: 1,
      name: 'Thiệp Hoa Hồng',
      description: 'Thiệp cưới lãng mạn với họa tiết hoa hồng đỏ, phù hợp cho đám cưới truyền thống',
      thumbnail_url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=600&fit=crop',
      preview_url: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=1200&fit=crop',
      price: 0,
      category: 'floral',
      design_config: JSON.stringify({
        primaryColor: '#e11d48',
        secondaryColor: '#fecdd3',
        fontFamily: 'serif',
        layout: 'classic',
      }),
      is_active: true,
    },
    {
      id: 2,
      name: 'Thiệp Tối Giản',
      description: 'Thiệp cưới phong cách tối giản, hiện đại với tông màu trắng đen',
      thumbnail_url: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=400&h=600&fit=crop',
      preview_url: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&h=1200&fit=crop',
      price: 0,
      category: 'minimal',
      design_config: JSON.stringify({
        primaryColor: '#000000',
        secondaryColor: '#ffffff',
        fontFamily: 'sans-serif',
        layout: 'minimal',
      }),
      is_active: true,
    },
    {
      id: 3,
      name: 'Thiệp Cổ Điển',
      description: 'Thiệp cưới phong cách cổ điển, sang trọng với họa tiết vàng',
      thumbnail_url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&h=600&fit=crop',
      preview_url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&h=1200&fit=crop',
      price: 0,
      category: 'classic',
      design_config: JSON.stringify({
        primaryColor: '#d97706',
        secondaryColor: '#fef3c7',
        fontFamily: 'serif',
        layout: 'classic',
      }),
      is_active: true,
    },
    {
      id: 4,
      name: 'Thiệp Hoa Cúc',
      description: 'Thiệp cưới tươi mới với họa tiết hoa cúc trắng, phong cách nhẹ nhàng',
      thumbnail_url: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=400&h=600&fit=crop',
      preview_url: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&h=1200&fit=crop',
      price: 0,
      category: 'floral',
      design_config: JSON.stringify({
        primaryColor: '#10b981',
        secondaryColor: '#d1fae5',
        fontFamily: 'sans-serif',
        layout: 'modern',
      }),
      is_active: true,
    },
    {
      id: 5,
      name: 'Thiệp Hiện Đại',
      description: 'Thiệp cưới phong cách hiện đại với gradient màu pastel',
      thumbnail_url: 'https://images.unsplash.com/photo-1529634597447-89a7c5d6e3e4?w=400&h=600&fit=crop',
      preview_url: 'https://images.unsplash.com/photo-1529634597447-89a7c5d6e3e4?w=800&h=1200&fit=crop',
      price: 0,
      category: 'modern',
      design_config: JSON.stringify({
        primaryColor: '#8b5cf6',
        secondaryColor: '#ede9fe',
        fontFamily: 'sans-serif',
        layout: 'modern',
      }),
      is_active: true,
    },
    {
      id: 6,
      name: 'Thiệp Vintage',
      description: 'Thiệp cưới phong cách vintage với tông màu nâu be',
      thumbnail_url: 'https://images.unsplash.com/photo-1460978812857-470ed1c77af0?w=400&h=600&fit=crop',
      preview_url: 'https://images.unsplash.com/photo-1460978812857-470ed1c77af0?w=800&h=1200&fit=crop',
      price: 0,
      category: 'vintage',
      design_config: JSON.stringify({
        primaryColor: '#92400e',
        secondaryColor: '#fef3c7',
        fontFamily: 'serif',
        layout: 'classic',
      }),
      is_active: true,
    },
  ]);
}
