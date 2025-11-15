import { BookingFormData, BookingFormErrors } from '../types';

export const validateBookingForm = (
  data: BookingFormData
): BookingFormErrors => {
  const errors: BookingFormErrors = {};

  // Name validation
  if (!data.name.trim()) {
    errors.name = 'Vui lòng nhập họ tên';
  } else if (data.name.trim().length < 2) {
    errors.name = 'Họ tên phải có ít nhất 2 ký tự';
  } else if (data.name.trim().length > 100) {
    errors.name = 'Họ tên không được quá 100 ký tự';
  }

  // Phone validation
  if (!data.phone.trim()) {
    errors.phone = 'Vui lòng nhập số điện thoại';
  } else if (!/^[0-9]{10,11}$/.test(data.phone.replace(/\s/g, ''))) {
    errors.phone = 'Số điện thoại không hợp lệ (10-11 số)';
  }

  // Event date validation
  if (!data.eventDate) {
    errors.eventDate = 'Vui lòng chọn ngày tổ chức';
  } else {
    const selectedDate = new Date(data.eventDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      errors.eventDate = 'Ngày tổ chức phải là ngày trong tương lai';
    }

    // Check if date is at least 1 month from now
    const oneMonthFromNow = new Date();
    oneMonthFromNow.setMonth(oneMonthFromNow.getMonth() + 1);
    oneMonthFromNow.setHours(0, 0, 0, 0);

    if (selectedDate < oneMonthFromNow) {
      errors.eventDate =
        'Khuyến nghị đặt dịch vụ trước ít nhất 1 tháng';
    }
  }

  // Package validation
  if (!data.package) {
    errors.package = 'Vui lòng chọn gói dịch vụ';
  }

  // Notes validation (optional but with max length)
  if (data.notes && data.notes.length > 500) {
    errors.notes = 'Ghi chú không được quá 500 ký tự';
  }

  return errors;
};

export const formatPhoneNumber = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `${match[1]} ${match[2]} ${match[3]}`;
  }
  return phone;
};

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('vi-VN').format(price);
};
