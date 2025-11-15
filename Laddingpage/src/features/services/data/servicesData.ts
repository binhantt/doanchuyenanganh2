import { ServiceDetail } from '../types';

export const servicesData: Record<string, ServiceDetail> = {
  'decoration': {
    id: 'decoration',
    slug: 'trang-tri-tiec-cuoi',
    name: 'Trang Trí Tiệc Cưới',
    shortDescription: 'Thiết kế và trang trí không gian tiệc cưới sang trọng, lãng mạn',
    fullDescription: 'Dịch vụ trang trí tiệc cưới chuyên nghiệp với đội ngũ thiết kế giàu kinh nghiệm. Chúng tôi tạo nên không gian tiệc cưới độc đáo, phù hợp với phong cách và chủ đề mà bạn mong muốn. Từ backdrop, sân khấu, đến từng chi tiết nhỏ đều được chăm chút tỉ mỉ.',
    icon: 'sparkles',
    features: [
      'Thiết kế concept độc đáo',
      'Backdrop 3D sang trọng',
      'Trang trí sân khấu',
      'Hoa tươi cao cấp',
      'Ánh sáng nghệ thuật',
      'Bàn gallery & ký tên',
    ],
    detailedFeatures: [
      {
        category: 'Thiết Kế Concept',
        items: [
          'Tư vấn phong cách: Cổ điển, Hiện đại, Vintage, Rustic',
          'Thiết kế 3D trước khi thi công',
          'Chọn màu sắc chủ đạo phù hợp',
          'Concept theo chủ đề: Vườn cổ tích, Biển, Rừng...',
          'Tùy chỉnh theo địa điểm tổ chức',
        ],
      },
      {
        category: 'Backdrop & Sân Khấu',
        items: [
          'Backdrop 3D với hoa tươi và đèn LED',
          'Sân khấu chính với thiết kế độc đáo',
          'Cổng hoa chào đón khách',
          'Lối đi thảm đỏ với hoa trang trí',
          'Photobooth với props đa dạng',
        ],
      },
      {
        category: 'Hoa Tươi',
        items: [
          'Hoa nhập khẩu cao cấp',
          'Hoa theo mùa tươi mới',
          'Cắm hoa nghệ thuật',
          'Hoa bàn tiệc',
          'Hoa cầm tay cô dâu',
        ],
      },
      {
        category: 'Ánh Sáng',
        items: [
          'Đèn LED trang trí',
          'Đèn sân khấu chuyên nghiệp',
          'Đèn bàn tiệc ấm áp',
          'Hiệu ứng ánh sáng đặc biệt',
          'Đèn nến trang trí',
        ],
      },
      {
        category: 'Chi Tiết Khác',
        items: [
          'Bàn gallery trưng bày ảnh',
          'Bàn ký tên với hoa tươi',
          'Bảng welcome chào đón',
          'Bảng seating chart',
          'Trang trí bàn quà',
        ],
      },
    ],
    packages: [
      {
        name: 'Gói Cơ Bản',
        price: 15000000,
        features: [
          'Backdrop 3x4m',
          'Sân khấu cơ bản',
          'Hoa tươi trang trí',
          'Bàn gallery & ký tên',
          'Ánh sáng cơ bản',
        ],
      },
      {
        name: 'Gói Cao Cấp',
        price: 30000000,
        popular: true,
        features: [
          'Backdrop 3D 4x5m',
          'Sân khấu LED',
          'Hoa nhập khẩu cao cấp',
          'Cổng hoa chào đón',
          'Photobooth',
          'Ánh sáng nghệ thuật',
          'Lối đi thảm đỏ',
        ],
      },
      {
        name: 'Gói Sang Trọng',
        price: 50000000,
        features: [
          'Backdrop 3D 5x6m độc quyền',
          'Sân khấu 3D mapping',
          'Hoa nhập khẩu độc quyền',
          'Cổng hoa xa hoa',
          'Photobooth cao cấp',
          'Ánh sáng 3D mapping',
          'Lối đi với hoa và đèn LED',
          'Trang trí toàn bộ venue',
        ],
      },
    ],
    gallery: [
      'https://images.unsplash.com/photo-1519741497674-611481863552?w=800',
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800',
      'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800',
      'https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=800',
    ],
    faqs: [
      {
        question: 'Thời gian setup trang trí là bao lâu?',
        answer: 'Tùy vào quy mô, thường từ 4-8 giờ trước sự kiện. Chúng tôi sẽ hoàn thành trước giờ khách đến.',
      },
      {
        question: 'Có thể thay đổi thiết kế không?',
        answer: 'Có, bạn có thể thay đổi thiết kế trong quá trình tư vấn. Chúng tôi sẽ thiết kế 3D để bạn xem trước.',
      },
      {
        question: 'Hoa tươi có được giữ sau sự kiện không?',
        answer: 'Có, bạn có thể giữ lại hoa sau sự kiện. Chúng tôi sẽ hướng dẫn cách bảo quản.',
      },
    ],
  },
  'photography': {
    id: 'photography',
    slug: 'chup-anh-quay-phim',
    name: 'Chụp Ảnh & Quay Phim',
    shortDescription: 'Lưu giữ những khoảnh khắc đẹp nhất với chất lượng chuyên nghiệp',
    fullDescription: 'Dịch vụ chụp ảnh và quay phim cưới chuyên nghiệp với đội ngũ photographer và videographer giàu kinh nghiệm. Chúng tôi sử dụng thiết bị hiện đại nhất để ghi lại mọi khoảnh khắc đáng nhớ trong ngày trọng đại của bạn.',
    icon: 'camera',
    features: [
      'Photographer chuyên nghiệp',
      'Videographer 4K/8K',
      'Flycam quay phim',
      'Chỉnh sửa ảnh cao cấp',
      'Video cinematic',
      'Album ảnh cao cấp',
    ],
    detailedFeatures: [
      {
        category: 'Chụp Ảnh',
        items: [
          '2-3 Photographer chuyên nghiệp',
          'Chụp phóng sự toàn bộ sự kiện',
          'Chụp ảnh gia đình và khách mời',
          'Chụp chi tiết trang trí và không gian',
          '300-1000 ảnh đã chỉnh sửa',
        ],
      },
      {
        category: 'Quay Phim',
        items: [
          '2-3 Videographer',
          'Quay phim 4K/8K',
          'Flycam quay cảnh tổng thể',
          'Video highlight 10-30 phút',
          'Video full ceremony',
        ],
      },
      {
        category: 'Chỉnh Sửa',
        items: [
          'Chỉnh màu chuyên nghiệp',
          'Ghép ảnh nghệ thuật',
          'Hiệu ứng đặc biệt',
          'Color grading cho video',
          'Âm nhạc nền phù hợp',
        ],
      },
      {
        category: 'Sản Phẩm',
        items: [
          'Album ảnh 30x40cm cao cấp',
          'Album mini 20x30cm',
          'USB pha lê đựng ảnh và video',
          'Ảnh in khổ lớn',
          'Video online để chia sẻ',
        ],
      },
    ],
    packages: [
      {
        name: 'Gói Cơ Bản',
        price: 10000000,
        features: [
          '1 Photographer',
          '1 Videographer',
          '200 ảnh đã chỉnh sửa',
          'Video highlight 5-7 phút',
          'Album 30x40cm (30 trang)',
          'USB đựng ảnh và video',
        ],
      },
      {
        name: 'Gói Cao Cấp',
        price: 20000000,
        popular: true,
        features: [
          '2 Photographers',
          '2 Videographers',
          '500 ảnh đã chỉnh sửa',
          'Video highlight 15-20 phút',
          'Video full ceremony',
          'Album 30x40cm (50 trang)',
          'Album mini 20x30cm',
          'USB pha lê',
        ],
      },
      {
        name: 'Gói Sang Trọng',
        price: 35000000,
        features: [
          '3 Photographers',
          '3 Videographers',
          '1 Flycam operator',
          '1000+ ảnh đã chỉnh sửa',
          'Video cinematic 30-40 phút',
          'Video full ceremony 4K',
          'Video flycam',
          'Album 40x50cm (100 trang)',
          '2 Album mini',
          'USB pha lê cao cấp',
          'Ảnh in khổ lớn',
        ],
      },
    ],
    gallery: [
      'https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800',
      'https://images.unsplash.com/photo-1519741497674-611481863552?w=800',
    ],
    faqs: [
      {
        question: 'Bao lâu sau sự kiện sẽ nhận được ảnh?',
        answer: 'Ảnh thô trong 3-5 ngày, ảnh đã chỉnh sửa trong 2-3 tuần, video trong 4-6 tuần.',
      },
      {
        question: 'Có thể chọn ảnh để chỉnh sửa không?',
        answer: 'Có, chúng tôi sẽ gửi ảnh thô để bạn chọn những ảnh muốn chỉnh sửa đặc biệt.',
      },
    ],
  },
  'makeup': {
    id: 'makeup',
    slug: 'trang-diem-co-dau',
    name: 'Trang Điểm Cô Dâu',
    shortDescription: 'Trang điểm chuyên nghiệp giúp bạn tỏa sáng trong ngày trọng đại',
    fullDescription: 'Dịch vụ trang điểm cô dâu chuyên nghiệp với makeup artist giàu kinh nghiệm. Chúng tôi sử dụng mỹ phẩm cao cấp và kỹ thuật trang điểm hiện đại để tôn lên vẻ đẹp tự nhiên của bạn.',
    icon: 'sparkle',
    features: [
      'Makeup artist chuyên nghiệp',
      'Mỹ phẩm cao cấp',
      'Làm tóc cô dâu',
      'Thử makeup trước',
      'Touch-up trong ngày',
      'Trang điểm phù dâu',
    ],
    detailedFeatures: [
      {
        category: 'Trang Điểm',
        items: [
          'Makeup artist 5+ năm kinh nghiệm',
          'Mỹ phẩm MAC, Bobbi Brown, NARS',
          'Kỹ thuật trang điểm Hàn Quốc',
          'Trang điểm lâu trôi 12+ giờ',
          'Phù hợp với mọi loại da',
        ],
      },
      {
        category: 'Làm Tóc',
        items: [
          'Hairstylist chuyên nghiệp',
          'Nhiều kiểu tóc: Búi, Xoăn, Thả...',
          'Gắn phụ kiện tóc',
          'Sử dụng sản phẩm cao cấp',
          'Giữ nếp cả ngày',
        ],
      },
      {
        category: 'Dịch Vụ Thêm',
        items: [
          'Thử makeup 1-2 lần trước sự kiện',
          'Touch-up trong ngày cưới',
          'Trang điểm phù dâu (2-4 người)',
          'Trang điểm mẹ hai bên',
          'Tư vấn skincare trước cưới',
        ],
      },
    ],
    packages: [
      {
        name: 'Gói Cơ Bản',
        price: 3000000,
        features: [
          'Makeup cô dâu',
          'Làm tóc cô dâu',
          'Mỹ phẩm cao cấp',
          'Touch-up 1 lần',
        ],
      },
      {
        name: 'Gói Cao Cấp',
        price: 5000000,
        popular: true,
        features: [
          'Makeup cô dâu',
          'Làm tóc cô dâu',
          'Thử makeup 1 lần',
          'Touch-up 2 lần',
          'Makeup 2 phù dâu',
          'Mỹ phẩm cao cấp',
        ],
      },
      {
        name: 'Gói VIP',
        price: 8000000,
        features: [
          'Makeup cô dâu & chú rể',
          'Làm tóc cô dâu',
          'Thử makeup 2 lần',
          'Touch-up không giới hạn',
          'Makeup 4 phù dâu/phụ rể',
          'Makeup mẹ hai bên',
          'Mỹ phẩm cao cấp',
          'Tư vấn skincare',
        ],
      },
    ],
    gallery: [
      'https://images.unsplash.com/photo-1594552072238-6d4f32f37b8e?w=800',
    ],
    faqs: [
      {
        question: 'Có cần thử makeup trước không?',
        answer: 'Nên thử makeup 1-2 tuần trước để đảm bảo phong cách phù hợp và không bị dị ứng.',
      },
      {
        question: 'Makeup có lâu trôi không?',
        answer: 'Chúng tôi sử dụng kỹ thuật và sản phẩm lâu trôi, giữ được 12+ giờ.',
      },
    ],
  },
};

export const getServiceBySlug = (slug: string): ServiceDetail | undefined => {
  return Object.values(servicesData).find(service => service.slug === slug);
};

export const getAllServices = (): ServiceDetail[] => {
  return Object.values(servicesData);
};
