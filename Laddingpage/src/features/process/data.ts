import {
  MessageCircle,
  ClipboardList,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import { ProcessStep } from './types';

export const defaultProcessSteps: ProcessStep[] = [
  {
    id: 'consultation',
    number: 1,
    title: 'Tư vấn',
    description: 'Gặp gỡ và trao đổi về ý tưởng, ngân sách và mong muốn của bạn',
    icon: MessageCircle,
    details: [
      'Tư vấn miễn phí về concept và phong cách',
      'Đánh giá ngân sách và đề xuất gói dịch vụ',
      'Tư vấn địa điểm và thời gian phù hợp',
      'Giải đáp mọi thắc mắc của khách hàng',
    ],
    duration: '1-2 ngày',
  },
  {
    id: 'planning',
    number: 2,
    title: 'Lên kế hoạch',
    description: 'Xây dựng kế hoạch chi tiết và timeline cho sự kiện',
    icon: ClipboardList,
    details: [
      'Lập kế hoạch chi tiết từng hạng mục',
      'Thiết kế concept và bảng màu',
      'Lựa chọn nhà cung cấp và đối tác',
      'Lên timeline và checklist cụ thể',
    ],
    duration: '2-4 tuần',
  },
  {
    id: 'execution',
    number: 3,
    title: 'Thực hiện',
    description: 'Triển khai và giám sát mọi khâu chuẩn bị cho ngày trọng đại',
    icon: Sparkles,
    details: [
      'Điều phối và giám sát các nhà cung cấp',
      'Setup và trang trí địa điểm',
      'Tổng duyệt trước ngày cưới',
      'Xử lý các vấn đề phát sinh',
    ],
    duration: '1-3 tháng',
  },
  {
    id: 'delivery',
    number: 4,
    title: 'Bàn giao',
    description: 'Đảm bảo sự kiện diễn ra hoàn hảo và bàn giao kết quả',
    icon: CheckCircle2,
    details: [
      'Điều phối sự kiện trong ngày cưới',
      'Giám sát và xử lý mọi tình huống',
      'Bàn giao ảnh, video và tài liệu',
      'Hỗ trợ sau sự kiện',
    ],
    duration: '1 ngày + follow-up',
  },
];
