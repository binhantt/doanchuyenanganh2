import { PaymentMethod } from '../types';

export const paymentMethods: PaymentMethod[] = [
  {
    id: 'bank-transfer',
    name: 'Chuyển khoản ngân hàng',
    description: 'Chuyển khoản trực tiếp qua ngân hàng',
    icon: 'building-columns',
  },
  {
    id: 'momo',
    name: 'Ví MoMo',
    description: 'Thanh toán qua ví điện tử MoMo',
    icon: 'wallet',
  },
  {
    id: 'zalopay',
    name: 'ZaloPay',
    description: 'Thanh toán qua ví ZaloPay',
    icon: 'wallet',
  },
  {
    id: 'cash',
    name: 'Tiền mặt',
    description: 'Thanh toán bằng tiền mặt khi gặp mặt',
    icon: 'banknote',
  },
];

export const bankInfo = {
  bankName: 'Ngân hàng Vietcombank',
  accountNumber: '1234567890',
  accountName: 'WEDDING PARADISE',
  branch: 'Chi nhánh Hà Nội',
};
