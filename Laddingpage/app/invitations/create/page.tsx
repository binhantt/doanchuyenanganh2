'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Form, Input, Button, DatePicker, TimePicker, message, Card, Modal } from 'antd';
import { CopyOutlined, EyeOutlined } from '@ant-design/icons';
import { createInvitation } from '@/src/features/api/invitations';

const { TextArea } = Input;

export default function CreateInvitationPage() {
  const router = useRouter();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [createdInvitation, setCreatedInvitation] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      
      const invitationData = {
        templateId: 1, // Default template
        groomName: values.groomName,
        brideName: values.brideName,
        weddingDate: values.weddingDate.format('YYYY-MM-DD'),
        weddingTime: values.weddingTime.format('HH:mm:ss'),
        venue: values.venue,
        venueAddress: values.venueAddress,
        recipientName: values.recipientName || 'Quý khách',
        message: values.message,
        invitationMessage: values.invitationMessage,
        story: values.story,
        coverImage: values.coverImage,
        avatarImage: values.avatarImage,
        gallery: values.gallery ? values.gallery.split(',').map((url: string) => url.trim()).filter((url: string) => url) : [],
      };

      console.log('Sending invitation data to backend:', invitationData);

      const response = await createInvitation(invitationData);

      console.log('Backend response:', response);

      if (response.success && response.data) {
        setCreatedInvitation(response.data);
        setModalVisible(true);
        message.success('Tạo thiệp cưới thành công!');
        
        // Tự động chuyển đến trang customize sau 2 giây
        setTimeout(() => {
          setModalVisible(false);
          router.push(`/invitations/${response.data.id}/customize`);
        }, 2000);
      } else {
        message.error('Có lỗi xảy ra khi tạo thiệp cưới');
      }
    } catch (error: any) {
      console.error('Error creating invitation:', error);
      message.error(error.response?.data?.message || 'Có lỗi xảy ra khi tạo thiệp cưới');
    } finally {
      setLoading(false);
    }
  };

  const copyInvitationLink = () => {
    if (createdInvitation) {
      const temlple1Url = process.env.NEXT_PUBLIC_TEMPLATE_URL || 'http://localhost:3001';
      const link = `${temlple1Url}?shareUrl=${createdInvitation.shareUrl}`;
      navigator.clipboard.writeText(link);
      message.success('Đã sao chép link!');
    }
  };

  const viewInvitation = () => {
    if (createdInvitation) {
      // Chuyển đến trang customize để xem và chỉnh sửa
      router.push(`/invitations/${createdInvitation.id}/customize`);
    }
  };

  const handleModalClose = () => {
    setModalVisible(false);
    form.resetFields();
    setCreatedInvitation(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Card className="shadow-lg">
          <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Tạo Thiệp Cưới Online
          </h1>

          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Form.Item
                label="Tên Chú Rể"
                name="groomName"
                rules={[{ required: true, message: 'Vui lòng nhập tên chú rể' }]}
              >
                <Input placeholder="Nhập tên chú rể" />
              </Form.Item>

              <Form.Item
                label="Tên Cô Dâu"
                name="brideName"
                rules={[{ required: true, message: 'Vui lòng nhập tên cô dâu' }]}
              >
                <Input placeholder="Nhập tên cô dâu" />
              </Form.Item>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Form.Item
                label="Ngày Cưới"
                name="weddingDate"
                rules={[{ required: true, message: 'Vui lòng chọn ngày cưới' }]}
              >
                <DatePicker className="w-full" format="DD/MM/YYYY" />
              </Form.Item>

              <Form.Item
                label="Giờ Cưới"
                name="weddingTime"
                rules={[{ required: true, message: 'Vui lòng chọn giờ cưới' }]}
              >
                <TimePicker className="w-full" format="HH:mm" />
              </Form.Item>
            </div>

            <Form.Item
              label="Địa Điểm"
              name="venue"
              rules={[{ required: true, message: 'Vui lòng nhập địa điểm' }]}
            >
              <Input placeholder="Ví dụ: The Rose Garden, London" />
            </Form.Item>

            <Form.Item
              label="Địa Chỉ Chi Tiết"
              name="venueAddress"
              rules={[{ required: true, message: 'Vui lòng nhập địa chỉ chi tiết' }]}
            >
              <TextArea rows={2} placeholder="Nhập địa chỉ chi tiết" />
            </Form.Item>

            <Form.Item
              label="Tên Người Nhận (Mặc định)"
              name="recipientName"
            >
              <Input placeholder="Quý khách" />
            </Form.Item>

            <Form.Item
              label="Lời Mời"
              name="invitationMessage"
            >
              <TextArea rows={3} placeholder="Nhập lời mời trang trọng" />
            </Form.Item>

            <Form.Item
              label="Câu Chuyện Tình Yêu"
              name="story"
            >
              <TextArea rows={4} placeholder="Chia sẻ câu chuyện tình yêu của bạn" />
            </Form.Item>

            <Form.Item
              label="Ảnh Bìa (URL)"
              name="coverImage"
            >
              <Input placeholder="https://example.com/image.jpg" />
            </Form.Item>

            <Form.Item
              label="Ảnh Cặp Đôi (URL)"
              name="avatarImage"
            >
              <Input placeholder="https://example.com/couple.jpg" />
            </Form.Item>

            <Form.Item
              label="Thư Viện Ảnh (URLs, cách nhau bởi dấu phẩy)"
              name="gallery"
            >
              <TextArea rows={3} placeholder="https://example.com/img1.jpg, https://example.com/img2.jpg" />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="w-full bg-rose-500 hover:bg-rose-600"
                size="large"
              >
                {loading ? 'Đang tạo...' : 'Tạo Thiệp Cưới'}
              </Button>
            </Form.Item>
          </Form>
        </Card>

        {/* Success Modal */}
        <Modal
          title="Tạo Thiệp Cưới Thành Công!"
          open={modalVisible}
          onCancel={handleModalClose}
          footer={[
            <Button key="close" onClick={handleModalClose}>
              Đóng
            </Button>,
            <Button key="copy" icon={<CopyOutlined />} onClick={copyInvitationLink}>
              Sao Chép Link
            </Button>,
            <Button
              key="view"
              type="primary"
              icon={<EyeOutlined />}
              onClick={() => {
                if (createdInvitation) {
                  setModalVisible(false);
                  router.push(`/invitations/${createdInvitation.id}/customize`);
                }
              }}
            >
              Xem & Chỉnh Sửa
            </Button>,
          ]}
        >
          <div className="space-y-4">
            <p className="text-gray-700">
              Thiệp cưới của bạn đã được tạo thành công và lưu vào backend! Bạn có thể chia sẻ link này với khách mời.
            </p>
            {createdInvitation && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">Link chia sẻ:</p>
                <div className="flex items-center gap-2">
                  <Input
                    readOnly
                    value={`${process.env.NEXT_PUBLIC_TEMPLATE_URL || 'http://localhost:3001'}?shareUrl=${createdInvitation.shareUrl}`}
                    className="flex-1"
                  />
                  <Button icon={<CopyOutlined />} onClick={copyInvitationLink}>
                    Copy
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Share URL: <code>{createdInvitation.shareUrl}</code>
                </p>
              </div>
            )}
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Lưu ý:</strong> Bạn có thể thêm <code>?guestName=Tên Khách</code> vào cuối link để cá nhân hóa thiệp mời cho từng khách.
              </p>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}
