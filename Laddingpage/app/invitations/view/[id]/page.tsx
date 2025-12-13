'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { invitationsApi } from '@/src/features/api';
import type { Invitation } from '@/src/features/api/invitations';

export default function ViewInvitationPage() {
  const params = useParams();
  const shareUrl = params.id as string;
  const [invitation, setInvitation] = useState<Invitation | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const loadInvitation = async () => {
      try {
        const response = await invitationsApi.getInvitationByShareUrl(shareUrl);
        if (response.success) {
          setInvitation(response.data);
        }
      } catch (error) {
        console.error('Failed to load invitation:', error);
      } finally {
        setLoading(false);
      }
    };

    loadInvitation();
  }, [shareUrl]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 flex items-center justify-center p-4">
        <div className="text-gray-600">Đang tải...</div>
      </div>
    );
  }

  if (!invitation) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center max-w-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Không tìm thấy thiệp
          </h2>
          <p className="text-gray-600">
            Thiệp cưới này không tồn tại hoặc đã bị xóa
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 flex items-center justify-center p-2 md:p-4">
      <div className="w-full max-w-md md:max-w-lg lg:max-w-xl">
        <div className="aspect-[3/4] bg-white rounded-lg overflow-hidden shadow-2xl relative">
            {invitation.coverImage ? (
              <div className="h-full relative">
                {/* Page 1: Cover */}
                <div className={`h-full absolute inset-0 transition-transform duration-500 ${currentPage === 1 ? 'translate-x-0' : '-translate-x-full'}`}>
                  <img src={invitation.coverImage} alt="Cover" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30"></div>
                  <div className="absolute inset-0 flex flex-col items-center justify-end p-8 md:p-12 text-white">
                    <div className="text-3xl md:text-4xl font-serif font-bold">{invitation.groomName}</div>
                    <div className="text-2xl md:text-3xl my-2">&</div>
                    <div className="text-3xl md:text-4xl font-serif font-bold">{invitation.brideName}</div>
                    <div className="text-sm mt-4">{new Date(invitation.weddingDate).toLocaleDateString('vi-VN')}</div>
                  </div>
                </div>

                {/* Page 2: Details */}
                <div className={`h-full absolute inset-0 bg-gradient-to-br from-pink-50 via-white to-purple-50 p-8 md:p-12 flex flex-col items-center justify-center text-center space-y-4 md:space-y-6 transition-transform duration-500 ${currentPage === 2 ? 'translate-x-0' : 'translate-x-full'}`}>
                  <div className="w-16 h-1 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full"></div>
                  <div className="text-base md:text-lg text-gray-700">Trân trọng kính mời</div>
                  <div className="text-lg md:text-xl font-semibold text-gray-800">{invitation.recipientName}</div>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p className="font-medium text-base">{new Date(invitation.weddingDate).toLocaleDateString('vi-VN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    <p>Lúc {invitation.weddingTime}</p>
                    <p className="font-semibold mt-3">{invitation.venue}</p>
                    <p className="text-xs text-gray-600">{invitation.venueAddress}</p>
                  </div>
                  {invitation.message && <div className="text-sm text-gray-600 italic">{invitation.message}</div>}
                  <div className="w-16 h-1 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full"></div>
                  <div className="text-xs text-gray-500 italic px-4">Sự hiện diện của quý khách là niềm vinh hạnh cho gia đình chúng tôi</div>
                </div>

                {/* Navigation */}
                <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-2 md:gap-4 z-10">
                  <button 
                    onClick={() => setCurrentPage(1)} 
                    disabled={currentPage === 1} 
                    className="bg-white/80 backdrop-blur-sm text-gray-700 px-3 md:px-4 py-2 rounded-full shadow-lg hover:bg-white disabled:opacity-50 text-xs md:text-sm"
                  >
                    ← Trang 1
                  </button>
                  <div className="flex gap-2">
                    <div className={`w-2 h-2 rounded-full transition-all ${currentPage === 1 ? 'bg-pink-600 w-6' : 'bg-gray-400'}`}></div>
                    <div className={`w-2 h-2 rounded-full transition-all ${currentPage === 2 ? 'bg-pink-600 w-6' : 'bg-gray-400'}`}></div>
                  </div>
                  <button 
                    onClick={() => setCurrentPage(2)} 
                    disabled={currentPage === 2} 
                    className="bg-white/80 backdrop-blur-sm text-gray-700 px-3 md:px-4 py-2 rounded-full shadow-lg hover:bg-white disabled:opacity-50 text-xs md:text-sm"
                  >
                    Trang 2 →
                  </button>
                </div>
              </div>
            ) : (
              <div className="h-full bg-gradient-to-br from-pink-100 to-purple-100 p-8 md:p-12 flex flex-col items-center justify-center text-center space-y-4 md:space-y-6">
                <div className="text-3xl md:text-4xl font-serif text-gray-800">{invitation.groomName} & {invitation.brideName}</div>
                <div className="w-24 h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent"></div>
                <div className="text-base md:text-lg text-gray-700">Trân trọng kính mời</div>
                <div className="text-lg md:text-xl font-semibold text-gray-800">{invitation.recipientName}</div>
                <div className="space-y-2 text-sm text-gray-700">
                  <p className="font-medium">{new Date(invitation.weddingDate).toLocaleDateString('vi-VN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  <p>Lúc {invitation.weddingTime}</p>
                  <p className="font-semibold mt-3">{invitation.venue}</p>
                  <p className="text-xs text-gray-600">{invitation.venueAddress}</p>
                </div>
                {invitation.message && <div className="text-sm text-gray-600 italic">{invitation.message}</div>}
                <div className="text-xs text-gray-500 italic px-4">Sự hiện diện của quý khách là niềm vinh hạnh cho gia đình chúng tôi</div>
              </div>
            )}
        </div>
      </div>
    </div>
  );
}
