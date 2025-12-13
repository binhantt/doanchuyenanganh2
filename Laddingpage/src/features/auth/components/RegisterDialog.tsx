'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { authApi } from '@/src/features/api';
import axios from 'axios';

interface RegisterDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSwitchToLogin: () => void;
  onRegisterSuccess?: (user: any) => void;
}

export function RegisterDialog({
  open,
  onOpenChange,
  onSwitchToLogin,
  onRegisterSuccess,
}: RegisterDialogProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    phone: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Mật khẩu xác nhận không khớp');
      return;
    }

    if (formData.password.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự');
      return;
    }

    setLoading(true);

    try {
      const response = await authApi.register({
        email: formData.email,
        password: formData.password,
        fullName: formData.fullName,
        phone: formData.phone || undefined,
      });

      if (response.success) {
        authApi.authUtils.saveAuth(response.data.token, response.data.user);
        onOpenChange(false);
        if (onRegisterSuccess) {
          onRegisterSuccess(response.data.user);
        }
        
        // Check if there's a redirect URL saved
        const redirectUrl = sessionStorage.getItem('redirectAfterLogin');
        if (redirectUrl) {
          sessionStorage.removeItem('redirectAfterLogin');
          router.push(redirectUrl);
        } else {
          router.refresh();
        }
      }
    } catch (err: any) {
      setError(
        err.response?.data?.message || 'Đăng ký thất bại. Vui lòng thử lại.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-white max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl border-0">
        <DialogHeader className="space-y-2">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-rose-500 to-pink-600 rounded-full flex items-center justify-center shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
          </div>
          <DialogTitle className="text-3xl font-bold text-center bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
            Đăng ký
          </DialogTitle>
          <p className="text-sm text-gray-500 text-center">
            Tạo tài khoản mới để bắt đầu sử dụng dịch vụ của chúng tôi.
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-gray-900 font-semibold">
              Họ và tên
            </Label>
            <Input
              id="fullName"
              type="text"
              placeholder="Nguyễn Văn A"
              value={formData.fullName}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
              required
              disabled={loading}
              className="h-12 bg-gray-50 border-gray-200 text-gray-900 focus:border-rose-400 focus:ring-rose-400 rounded-lg"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-900 font-semibold">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="example@email.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
              disabled={loading}
              className="h-12 bg-gray-50 border-gray-200 text-gray-900 focus:border-rose-400 focus:ring-rose-400 rounded-lg"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-gray-900 font-semibold">
              Số điện thoại (tùy chọn)
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="0123456789"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              disabled={loading}
              className="h-12 bg-gray-50 border-gray-200 text-gray-900 focus:border-rose-400 focus:ring-rose-400 rounded-lg"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-gray-900 font-semibold">
              Mật khẩu
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
              disabled={loading}
              className="h-12 bg-gray-50 border-gray-200 text-gray-900 focus:border-rose-400 focus:ring-rose-400 rounded-lg"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-gray-900 font-semibold">
              Xác nhận mật khẩu
            </Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
              required
              disabled={loading}
              className="h-12 bg-gray-50 border-gray-200 text-gray-900 focus:border-rose-400 focus:ring-rose-400 rounded-lg"
            />
          </div>

          {error && (
            <div className="p-3 text-sm text-pink-600 bg-pink-50 border border-pink-200 rounded-lg">
              {error}
            </div>
          )}

          <Button
            type="submit"
            className="w-full h-12 bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Đang đăng ký...
              </span>
            ) : (
              'Đăng ký'
            )}
          </Button>
        </form>

        <div className="text-center text-sm mt-4">
          <span className="text-gray-500">Đã có tài khoản? </span>
          <button
            onClick={() => {
              onOpenChange(false);
              onSwitchToLogin();
            }}
            className="text-pink-600 font-semibold hover:underline"
          >
            Đăng nhập
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
