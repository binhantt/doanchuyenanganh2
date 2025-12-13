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

interface LoginDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSwitchToRegister: () => void;
  onLoginSuccess?: (user: any) => void;
}

export function LoginDialog({
  open,
  onOpenChange,
  onSwitchToRegister,
  onLoginSuccess,
}: LoginDialogProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authApi.login(formData);

      if (response.success) {
        authApi.authUtils.saveAuth(response.data.token, response.data.user);
        onOpenChange(false);
        if (onLoginSuccess) {
          onLoginSuccess(response.data.user);
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
        err.response?.data?.message || 'Đăng nhập thất bại. Vui lòng thử lại.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-white rounded-2xl shadow-2xl border-0">
        <DialogHeader className="space-y-2">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-rose-500 to-pink-600 rounded-full flex items-center justify-center shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>
          <DialogTitle className="text-3xl font-bold text-center bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
            Đăng nhập
          </DialogTitle>
          <p className="text-sm text-gray-500 text-center">
            Chào mừng bạn trở lại! Vui lòng đăng nhập để tiếp tục.
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-900 font-semibold">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="doan444600@gmail.com"
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
                Đang đăng nhập...
              </span>
            ) : (
              'Đăng nhập'
            )}
          </Button>
        </form>

        <div className="text-center text-sm mt-4">
          <span className="text-gray-500">Chưa có tài khoản? </span>
          <button
            onClick={() => {
              onOpenChange(false);
              onSwitchToRegister();
            }}
            className="text-pink-600 font-semibold hover:underline"
          >
            Đăng ký ngay
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
