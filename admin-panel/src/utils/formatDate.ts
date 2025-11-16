import dayjs from 'dayjs'
import 'dayjs/locale/vi'

dayjs.locale('vi')

export const formatDate = (date: string | Date, format: string = 'DD/MM/YYYY'): string => {
  return dayjs(date).format(format)
}

export const formatDateTime = (date: string | Date): string => {
  return dayjs(date).format('DD/MM/YYYY HH:mm')
}

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(amount)
}
