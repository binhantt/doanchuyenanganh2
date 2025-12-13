import React, { useEffect, useState } from 'react';
import { Layout, Spin, message } from 'antd';
import Header from '../components/Header';
import Hero from '../components/Hero';
import InvitationCard from '../components/InvitationCard';
import StorySection from '../components/StorySection';
import InfoSection from '../components/InfoSection';
import Gallery from '../components/Gallery';
import Footer from '../components/Footer';
import { getInvitationByShareUrl, getInvitationBySlug } from '../api/client';

const { Content } = Layout;

/**
 * Format date từ ISO string sang định dạng tiếng Việt
 */
function formatDate(dateString) {
  if (!dateString) return '';
  
  try {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    
    const monthNames = [
      'tháng 1', 'tháng 2', 'tháng 3', 'tháng 4', 'tháng 5', 'tháng 6',
      'tháng 7', 'tháng 8', 'tháng 9', 'tháng 10', 'tháng 11', 'tháng 12'
    ];
    
    const timeStr = hours || minutes ? `, ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}` : '';
    return `${day} ${monthNames[month - 1]}, ${year}${timeStr}`;
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString;
  }
}

/**
 * Get URL query parameters
 */
function getQueryParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    shareUrl: params.get('shareUrl') || params.get('share'),
    slug: params.get('slug'),
    guestName: params.get('guestName') || '',
  };
}

/**
 * Single-page wedding blog / invitation layout.
 * Fetches invitation data from backend API based on shareUrl or slug from URL params.
 */
function WeddingPage() {
  const [loading, setLoading] = useState(true);
  const [invitationData, setInvitationData] = useState(null);
  const [guestNameFromUrl, setGuestNameFromUrl] = useState('');

  useEffect(() => {
    const fetchInvitation = async () => {
      try {
        setLoading(true);
        const { shareUrl, slug, guestName } = getQueryParams();

        // Lưu guestName từ URL để sử dụng sau
        if (guestName) {
          setGuestNameFromUrl(decodeURIComponent(guestName));
          console.log('Guest name from URL:', decodeURIComponent(guestName));
        }

        if (!shareUrl && !slug) {
          message.warning('Thiếu thông tin thiệp cưới. Vui lòng kiểm tra lại URL.');
          setLoading(false);
          return;
        }

        let response;
        if (slug) {
          response = await getInvitationBySlug(slug, guestName);
        } else {
          response = await getInvitationByShareUrl(shareUrl, guestName);
        }

        if (response.success && response.data) {
          console.log('Invitation data received:', response.data);
          console.log('Guest name from URL:', guestName);
          console.log('Guest name from response:', response.data.guestName);
          // Ưu tiên guestName từ URL nếu có
          if (guestName) {
            response.data.guestName = decodeURIComponent(guestName);
            console.log('Using guestName from URL:', response.data.guestName);
          } else if (response.data.guestName) {
            console.log('Using guestName from response:', response.data.guestName);
          }
          setInvitationData(response.data);
        } else {
          message.error('Không tìm thấy thiệp cưới');
        }
      } catch (error) {
        console.error('Error fetching invitation:', error);
        message.error('Có lỗi xảy ra khi tải thiệp cưới');
      } finally {
        setLoading(false);
      }
    };

    fetchInvitation();
  }, []);

  // Debug: Log guestName khi invitationData thay đổi
  useEffect(() => {
    if (invitationData) {
      console.log('=== DEBUG GUEST NAME ===');
      console.log('guestNameFromUrl:', guestNameFromUrl);
      console.log('invitationData.guestName:', invitationData.guestName);
      console.log('invitationData.recipientName:', invitationData.recipientName);
      const finalGuestName = guestNameFromUrl || invitationData.guestName || invitationData.recipientName || '';
      console.log('Final guestName to display:', finalGuestName);
    }
  }, [invitationData, guestNameFromUrl]);

  if (loading) {
    return (
      <Layout style={{ minHeight: '100vh', background: '#fff' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
          }}
        >
          <Spin size="large" />
        </div>
      </Layout>
    );
  }

  if (!invitationData) {
    return (
      <Layout style={{ minHeight: '100vh', background: '#fff' }}>
        <Content style={{ padding: '48px 16px', textAlign: 'center' }}>
          <h2>Không tìm thấy thiệp cưới</h2>
          <p>Vui lòng kiểm tra lại đường dẫn.</p>
        </Content>
      </Layout>
    );
  }

  return (
    <Layout style={{ minHeight: '100vh', background: '#fff' }}>
      <Header />
      <Content>
        <Hero
          groom={invitationData.groom || invitationData.groomName || 'Chú Rể'}
          bride={invitationData.bride || invitationData.brideName || 'Cô Dâu'}
          coverImage={invitationData.coverImage || ''}
          sideImage={invitationData.sideImage || invitationData.avatarImage || invitationData.coverImage || ''}
          brideImage={invitationData.brideImage || ''}
          groomImage={invitationData.groomImage || ''}
        />
        <InvitationCard
          groom={invitationData.groom || invitationData.groomName || 'Chú Rể'}
          bride={invitationData.bride || invitationData.brideName || 'Cô Dâu'}
          date={formatDate(invitationData.date || invitationData.weddingDate)}
          location={invitationData.location || invitationData.venue || ''}
          invitationMessage={invitationData.invitationMessage || invitationData.message || invitationData.customText || ''}
          coupleImage={invitationData.coupleImage || invitationData.avatarImage || invitationData.coverImage || ''}
          guestName={guestNameFromUrl || invitationData.guestName || invitationData.recipientName || ''}
        />
        <StorySection 
          story={invitationData.story || ''} 
          storyImages={invitationData.weddingImages && invitationData.weddingImages.length > 0 
            ? invitationData.weddingImages 
            : invitationData.storyImages || invitationData.gallery || []} 
        />
        <InfoSection
          date={formatDate(invitationData.date || invitationData.weddingDate)}
          location={invitationData.location || invitationData.venue || ''}
          message={invitationData.message || invitationData.invitationMessage || invitationData.customText || ''}
          mapSrc={invitationData.mapSrc || null}
          locationImage={invitationData.locationImage || invitationData.coverImage || ''}
          organization={invitationData.organization || ''}
        />
        <Gallery images={invitationData.gallery || invitationData.storyImages || invitationData.weddingImages || []} />
      </Content>
      <Footer />
    </Layout>
  );
}

export default WeddingPage;

