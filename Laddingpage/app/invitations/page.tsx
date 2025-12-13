'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { X, Eye, Edit } from 'lucide-react';
import { authApi, invitationsApi } from '@/src/features/api';
import type { Invitation } from '@/src/features/api/invitations';
import dayjs from 'dayjs';

export default function InvitationsPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [myInvitations, setMyInvitations] = useState<Invitation[]>([]);
  const [templates, setTemplates] = useState<any[]>([]);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const checkAuth = async () => {
      const { token, user } = authApi.authUtils.getAuth();
      console.log('Auth check:', { hasToken: !!token, user });
      
      if (!token || !user) {
        console.log('No token or user found');
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      setIsAuthenticated(true);
      
      // Load user's invitations
      try {
        const response = await invitationsApi.getUserInvitations();
        if (response.success) {
          setMyInvitations(response.data);
        }
      } catch (error) {
        console.error('Failed to load invitations:', error);
        // If token is invalid, clear auth
        if ((error as any)?.response?.status === 401) {
          authApi.authUtils.clearAuth();
          setIsAuthenticated(false);
        }
      }
      
      setLoading(false);
    };

    const loadTemplates = async () => {
      try {
        console.log('Loading templates...');
        const response = await fetch('http://localhost:4000/api/user/invitation-templates');
        console.log('Response status:', response.status);
        const data = await response.json();
        console.log('Templates data:', data);
        if (data.success) {
          setTemplates(data.data);
          console.log('Templates loaded:', data.data.length);
        } else {
          console.error('API returned success=false:', data);
        }
      } catch (error) {
        console.error('Failed to load templates:', error);
      }
    };

    checkAuth();
    loadTemplates();
  }, [mounted]);

  // Redirect to home if not authenticated
  useEffect(() => {
    if (!isAuthenticated && !loading) {
      router.push('/');
    }
  }, [isAuthenticated, loading, router]);

  const handleDelete = async (id: string) => {
    if (!confirm('Bạn có chắc chắn muốn xóa thiệp này?')) {
      return;
    }

    try {
      setDeletingId(id);
      await invitationsApi.deleteInvitation(id);
      setMyInvitations((prev) => prev.filter((inv) => inv.id !== id));
    } catch (error) {
      console.error('Failed to delete invitation:', error);
      alert('Có lỗi xảy ra khi xóa thiệp');
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    return dayjs(dateString).format('DD/MM/YYYY');
  };

  if (!mounted || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white via-rose-50/30 to-white pt-24 pb-12 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-600"></div>
      </div>
    );
  }

  // Show message if not authenticated before redirecting
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white via-rose-50/30 to-white pt-24 pb-12 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md text-center space-y-4">
          <div className="text-5xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold text-gray-900">Vui lòng đăng nhập</h2>
          <p className="text-gray-600">
            Bạn cần đăng nhập để truy cập trang thiệp cưới
          </p>
          <p className="text-sm text-gray-500">
            Đang chuyển về trang chủ...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-rose-50/30 to-white pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Thiệp Cưới Online
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Chọn mẫu thiệp cưới yêu thích, tùy chỉnh nội dung và gửi đến khách mời của bạn
          </p>
        </div>

        {/* My Invitations */}
        {myInvitations.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Thiệp của tôi ({myInvitations.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myInvitations.map((invitation) => {
                const groomName = invitation.groom || invitation.groomName || '';
                const brideName = invitation.bride || invitation.brideName || '';
                const displayName = groomName && brideName ? `${groomName} & ${brideName}` : invitation.groomName && invitation.brideName ? `${invitation.groomName} & ${invitation.brideName}` : 'Thiệp cưới';
                const weddingDate = invitation.date || invitation.weddingDate || '';
                
                return (
                  <div key={invitation.id} className="relative bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 border border-rose-100 hover:border-rose-300">
                    {/* Delete Button */}
                    <button
                      onClick={() => handleDelete(invitation.id)}
                      disabled={deletingId === invitation.id}
                      className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 transition-colors disabled:opacity-50"
                      aria-label="Xóa thiệp"
                    >
                      <X className="w-4 h-4" />
                    </button>

                    <div className="space-y-4">
                      <h3 className="font-bold text-lg text-gray-900 pr-8">
                        {displayName}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {formatDate(weddingDate)}
                      </p>
                      <div className="flex gap-3 pt-2">
                        <button
                          onClick={() => router.push(`/invitations/${invitation.id}/preview`)}
                          className="flex-1 px-4 py-2.5 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                        >
                          <Eye className="w-4 h-4" />
                          Xem
                        </button>
                        <button
                          onClick={() => router.push(`/invitations/${invitation.id}/customize`)}
                          className="flex-1 px-4 py-2.5 border-2 border-rose-300 text-rose-600 rounded-lg font-semibold bg-white hover:bg-rose-50 hover:border-rose-400 transition-all duration-300 flex items-center justify-center gap-2"
                        >
                          <Edit className="w-4 h-4" />
                          Sửa
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Templates Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Chọn mẫu thiệp ({templates.length})
          </h2>
        </div>

        {/* Templates Grid */}
        {templates.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Đang tải mẫu thiệp...</p>
            <p className="text-sm text-gray-500 mt-2">
              Nếu không thấy mẫu thiệp, vui lòng kiểm tra console (F12)
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {templates.map((template) => (
            <div
              key={template.id}
              className="bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 border border-rose-100 hover:border-rose-300"
            >
              {/* Template Preview */}
              <div className="aspect-[3/4] bg-gradient-to-br from-rose-100 to-pink-100 relative overflow-hidden">
                {template.thumbnailUrl ? (
                  <img
                    src={template.thumbnailUrl}
                    alt={template.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-gray-400 text-sm">Preview</span>
                  </div>
                )}
              </div>

              {/* Template Info */}
              <div className="p-4 space-y-3">
                <h3 className="font-bold text-lg text-gray-900">
                  {template.name}
                </h3>
                <p className="text-sm text-gray-600">{template.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-rose-600 font-semibold">
                    {Number(template.price || 0).toLocaleString('vi-VN')}đ
                  </span>
                  <Link href={`/invitations/${template.id}/customize`}>
                    <button className="px-4 py-2 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300">
                      Chọn mẫu
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            ))}
          </div>
        )}
        </div>
    </div>
  );
}
