import { Knex } from 'knex';
import { v4 as uuidv4 } from 'uuid';

export async function seed(knex: Knex): Promise<void> {
  await knex('vouchers').del();

  const now = new Date();
  const futureDate = new Date();
  futureDate.setMonth(futureDate.getMonth() + 3);

  await knex('vouchers').insert([
    {
      id: uuidv4(),
      code: 'SUMMER2024',
      name: 'Giảm giá mùa hè 2024',
      description: 'Giảm 10% cho đơn hàng từ 50 triệu',
      discount_type: 'percentage',
      discount_value: 10,
      max_discount_amount: 10000000,
      min_order_value: 50000000,
      usage_limit: 100,
      used_count: 0,
      usage_per_customer: 1,
      start_date: now,
      end_date: futureDate,
      is_active: true,
    },
    {
      id: uuidv4(),
      code: 'WELCOME50',
      name: 'Chào mừng khách hàng mới',
      description: 'Giảm 5 triệu cho đơn hàng đầu tiên',
      discount_type: 'fixed',
      discount_value: 5000000,
      max_discount_amount: null,
      min_order_value: 30000000,
      usage_limit: 50,
      used_count: 0,
      usage_per_customer: 1,
      start_date: now,
      end_date: futureDate,
      is_active: true,
    },
    {
      id: uuidv4(),
      code: 'VIP20',
      name: 'Ưu đãi VIP',
      description: 'Giảm 20% cho đơn hàng từ 100 triệu',
      discount_type: 'percentage',
      discount_value: 20,
      max_discount_amount: 30000000,
      min_order_value: 100000000,
      usage_limit: 20,
      used_count: 0,
      usage_per_customer: 2,
      start_date: now,
      end_date: futureDate,
      is_active: true,
    },
    {
      id: uuidv4(),
      code: 'FREESHIP',
      name: 'Miễn phí vận chuyển',
      description: 'Giảm 500k phí vận chuyển',
      discount_type: 'fixed',
      discount_value: 500000,
      max_discount_amount: null,
      min_order_value: 10000000,
      usage_limit: null, // Không giới hạn
      used_count: 0,
      usage_per_customer: null,
      start_date: now,
      end_date: futureDate,
      is_active: true,
    },
  ]);
}
