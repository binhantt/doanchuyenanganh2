'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Form, Input, Button, DatePicker, TimePicker, message, Card, Space, Divider } from 'antd';
import { SaveOutlined, EyeOutlined, ArrowLeftOutlined, PlusOutlined, DeleteOutlined, CopyOutlined, LinkOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { getInvitationById, updateInvitation, getInvitationByShareUrl, createGuest, getTemplateById } from '@/src/features/api/invitations';
import dayjs from 'dayjs';

const { TextArea } = Input;

export default function CustomizeInvitationPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
  const idFromUrl = params.id as string;
  const editId = searchParams.get('edit'); // Invitation ID from query param
  
  // Check if idFromUrl is UUID format
  const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(idFromUrl);
  
  // If idFromUrl is UUID, it's an invitationId; otherwise it's a templateId
  const invitationId: string | null = isUUID ? idFromUrl : (editId || null);
  const templateId: string | null = isUUID ? null : idFromUrl;
  
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [invitationData, setInvitationData] = useState<any>(null);
  const [guestUrls, setGuestUrls] = useState<Array<{ name: string; url: string }>>([]);
  const [templatePreviewUrl, setTemplatePreviewUrl] = useState<string>('');

  // Load invitation data
  useEffect(() => {
    const loadInvitation = async () => {
      try {
        setFetching(true);
        
        // Check if user is authenticated
        const token = localStorage.getItem('token');
        if (!token) {
          message.error('Vui lòng đăng nhập để chỉnh sửa thiệp cưới');
          router.push('/');
          return;
        }

        if (!invitationId) {
          throw new Error('No invitation ID provided');
      }

        console.log('Loading invitation with ID:', invitationId);

        // Check if invitationId is UUID format
        const isUUIDFormat = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(invitationId);
        
        let response;
        if (isUUIDFormat) {
          // Try to get by ID
          response = await getInvitationById(invitationId);
        } else {
          // Try to get by shareUrl or slug
          try {
            response = await getInvitationByShareUrl(invitationId);
            if (response.success && response.data) {
              // If found by shareUrl, redirect to correct URL with UUID
              const correctId = response.data.id;
              router.replace(`/invitations/${correctId}/customize`);
              return;
            }
          } catch (shareUrlError) {
            console.log('Not found by shareUrl, trying slug...');
            // Try slug if available
            // For now, show error
            throw new Error('Invitation not found');
          }
        }
        
        console.log('API Response:', response);
        
        if (response.success && response.data) {
            const inv = response.data;
          console.log('Invitation data:', inv);
          setInvitationData(inv);
          
          // Lấy preview_url từ template
          const invTemplateId = inv.templateId || (inv as any).template_id;
          if (invTemplateId) {
            try {
              const templateResponse = await getTemplateById(Number(invTemplateId));
              if (templateResponse.success && templateResponse.data?.previewUrl) {
                setTemplatePreviewUrl(templateResponse.data.previewUrl);
                console.log('Template preview URL:', templateResponse.data.previewUrl);
              }
            } catch (templateError) {
              console.error('Error fetching template:', templateError);
            }
          } else if (templateId) {
            // Nếu đang tạo mới, lấy template từ templateId
            try {
              const templateResponse = await getTemplateById(Number(templateId));
              if (templateResponse.success && templateResponse.data?.previewUrl) {
                setTemplatePreviewUrl(templateResponse.data.previewUrl);
                console.log('Template preview URL:', templateResponse.data.previewUrl);
              }
            } catch (templateError) {
              console.error('Error fetching template:', templateError);
            }
          }
          
          // Set form values
          form.setFieldsValue({
            groomName: inv.groom || inv.groomName || '',
            brideName: inv.bride || inv.brideName || '',
            weddingDate: inv.date || inv.weddingDate ? dayjs(inv.date || inv.weddingDate) : null,
            weddingTime: inv.weddingTime ? dayjs(`2000-01-01 ${inv.weddingTime}`, 'YYYY-MM-DD HH:mm:ss') : null,
            venue: inv.location || inv.venue || '',
            venueAddress: inv.venueAddress || '',
            recipientNames: (inv as any).guests && Array.isArray((inv as any).guests) && (inv as any).guests.length > 0
              ? (inv as any).guests.map((g: any) => g.name)
              : inv.recipientName ? [inv.recipientName] : ['Quý khách'],
            message: inv.message || inv.invitationMessage || inv.customText || '',
            invitationMessage: inv.invitationMessage || inv.customText || '',
            story: inv.story || '',
            coverImage: inv.coverImage || '',
            avatarImage: inv.avatarImage || inv.coupleImage || '',
            brideImage: inv.brideImage || '',
            groomImage: inv.groomImage || '',
            locationImage: inv.locationImage || '',
            organization: inv.organization || '',
            gallery: inv.gallery && Array.isArray(inv.gallery) ? inv.gallery.join(', ') : '',
            weddingImages: inv.weddingImages && Array.isArray(inv.weddingImages) ? inv.weddingImages.join(', ') : '',
          });
        } else {
          console.error('Invalid response:', response);
          // Nếu không tìm thấy invitation và có templateId, tự động tạo mới
          if (templateId && !invitationId) {
            console.log('Invitation not found, will create new one with templateId:', templateId);
            message.info('Không tìm thấy thiệp cưới. Bạn có thể tạo mới bằng cách điền form và nhấn Lưu.');
            // Không redirect, để người dùng có thể điền form và tạo mới
          } else {
            message.error(response.message || 'Không tìm thấy thiệp cưới');
            router.push('/invitations');
            }
          }
      } catch (error: any) {
        console.error('Error loading invitation:', error);
        console.error('Error details:', {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status,
        });
        
        if (error.response?.status === 401) {
          message.error('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.');
          localStorage.removeItem('token');
          router.push('/');
        } else if (error.response?.status === 404) {
          // Nếu không tìm thấy invitation và có templateId, cho phép tạo mới
          if (templateId && !invitationId) {
            console.log('Invitation not found (404), will allow creating new one with templateId:', templateId);
            message.info('Không tìm thấy thiệp cưới. Bạn có thể tạo mới bằng cách điền form và nhấn Lưu.');
            // Không redirect, để người dùng có thể điền form và tạo mới
          } else {
            message.error('Không tìm thấy thiệp cưới');
            router.push('/invitations');
        }
        } else {
          message.error(error.response?.data?.message || 'Có lỗi xảy ra khi tải thiệp cưới');
        }
      } finally {
        setFetching(false);
      }
    };

    // Load invitation if:
    // 1. idFromUrl is UUID (direct invitation ID)
    // 2. Or we have editId from query param
    if (invitationId) {
      loadInvitation();
    } else {
      // Creating new invitation with template - no need to load data
      setFetching(false);
    }
  }, [invitationId, form, router]);

  const onFinish = async (values: any) => {
    try {
    setLoading(true);

      const invitationDataPayload: any = {
        groomName: values.groomName,
        brideName: values.brideName,
        weddingDate: values.weddingDate ? values.weddingDate.format('YYYY-MM-DD') : null,
        weddingTime: values.weddingTime ? values.weddingTime.format('HH:mm:ss') : null,
        venue: values.venue,
        venueAddress: values.venueAddress,
        recipientName: values.recipientNames && values.recipientNames.length > 0 
          ? values.recipientNames[0] 
          : 'Quý khách',
        message: values.message || '',
        invitationMessage: values.invitationMessage || '',
        story: values.story || '',
        coverImage: values.coverImage || '',
        avatarImage: values.avatarImage || '',
        brideImage: values.brideImage || '',
        groomImage: values.groomImage || '',
        locationImage: values.locationImage || '',
        organization: values.organization || '',
        gallery: values.gallery 
          ? values.gallery.split(',').map((url: string) => url.trim()).filter((url: string) => url)
          : [],
        weddingImages: values.weddingImages
          ? values.weddingImages.split(',').map((url: string) => url.trim()).filter((url: string) => url)
          : [],
      };

      let response;
      try {
        if (invitationId) {
        // Update existing invitation
          console.log('Updating invitation with ID:', invitationId);
          console.log('Update data:', invitationDataPayload);
          response = await updateInvitation(invitationId, invitationDataPayload);
        } else if (templateId) {
          // Create new invitation with template
          console.log('Creating new invitation with templateId:', templateId);
          invitationDataPayload.templateId = Number(templateId);
          console.log('Invitation data:', invitationDataPayload);
          const { createInvitation } = await import('@/src/features/api/invitations');
          response = await createInvitation(invitationDataPayload);
        } else {
          throw new Error('Invalid invitation or template ID');
        }
      } catch (apiError: any) {
        console.error('API Error:', apiError);
        console.error('API Error Response:', apiError.response?.data);
        
        // Nếu lỗi 404 khi update và có templateId, thử tạo mới
        if (apiError.response?.status === 404 && invitationId && templateId) {
          console.log('Invitation not found when updating, trying to create new one...');
          invitationDataPayload.templateId = Number(templateId);
          const { createInvitation } = await import('@/src/features/api/invitations');
          response = await createInvitation(invitationDataPayload);
      } else {
          throw apiError;
        }
      }

      if (response && response.success) {
        const finalInvitationId = invitationId || response.data?.id;
        
        if (!finalInvitationId) {
          throw new Error('Không lấy được ID của invitation');
        }

        // Tạo guests cho mỗi tên người nhận
        const recipientNames = values.recipientNames || ['Quý khách'];
        const createdGuests: Array<{ name: string; url: string }> = [];
        const shareUrl = response.data?.shareUrl || invitationData?.shareUrl;
        
        // Lấy preview_url từ template
        let templateUrl = templatePreviewUrl;
        if (!templateUrl) {
          // Nếu chưa có, thử lấy từ templateId
          const currentTemplateId = response.data?.templateId || invitationData?.templateId || (invitationData as any)?.template_id || templateId;
          if (currentTemplateId) {
            try {
              const templateResponse = await getTemplateById(Number(currentTemplateId));
              if (templateResponse.success && templateResponse.data?.previewUrl) {
                templateUrl = templateResponse.data.previewUrl;
                setTemplatePreviewUrl(templateUrl);
              }
            } catch (templateError) {
              console.error('Error fetching template:', templateError);
            }
          }
        }
        
        // Fallback nếu không có preview_url
        let baseUrl = templateUrl || process.env.NEXT_PUBLIC_TEMPLATE_URL || 'http://localhost:3001';
        // Loại bỏ dấu / ở cuối nếu có
        baseUrl = baseUrl.replace(/\/+$/, '');

        // Lấy danh sách guests hiện tại (nếu đang update)
        let existingGuests: any[] = [];
        if (invitationId && invitationData?.guests) {
          existingGuests = invitationData.guests;
        }

        // Tạo hoặc cập nhật guests (chỉ khi có shareUrl)
        if (shareUrl) {
          for (const recipientName of recipientNames) {
            if (!recipientName || recipientName.trim() === '') continue;

            // Kiểm tra xem guest đã tồn tại chưa
            const existingGuest = existingGuests.find((g: any) => g.name === recipientName.trim());
            
            if (!existingGuest) {
              // Tạo guest mới
              try {
                const guestResponse = await createGuest(finalInvitationId, {
                  name: recipientName.trim(),
                  status: 'pending',
                });

                if (guestResponse.success && guestResponse.data) {
                  // Sử dụng shareUrl riêng của guest nếu có, nếu không thì dùng invitation shareUrl
                  const guestShareUrl = guestResponse.data.shareUrl || shareUrl;
                  // Tạo URL với format: /?shareUrl=guestShareUrl&guestName=encodedName
                  const encodedGuestName = encodeURIComponent(recipientName.trim());
                  const guestUrl = `${baseUrl}/?shareUrl=${guestShareUrl}&guestName=${encodedGuestName}`;
                  createdGuests.push({
                    name: recipientName.trim(),
                    url: guestUrl,
                  });
                }
              } catch (guestError: any) {
                console.error(`Error creating guest for ${recipientName}:`, guestError);
                // Vẫn tạo URL với invitation shareUrl nếu không tạo được guest
                const encodedGuestName = encodeURIComponent(recipientName.trim());
                const guestUrl = `${baseUrl}/?shareUrl=${shareUrl}&guestName=${encodedGuestName}`;
                createdGuests.push({
                  name: recipientName.trim(),
                  url: guestUrl,
                });
                                    }
                                  } else {
              // Guest đã tồn tại, sử dụng shareUrl riêng của guest nếu có
              const guestShareUrl = existingGuest.shareUrl || shareUrl;
              // Tạo URL với format: /?shareUrl=guestShareUrl&guestName=encodedName
              const encodedGuestName = encodeURIComponent(recipientName.trim());
              const guestUrl = `${baseUrl}/?shareUrl=${guestShareUrl}&guestName=${encodedGuestName}`;
              createdGuests.push({
                name: recipientName.trim(),
                url: guestUrl,
              });
            }
          }
        }

        // Cập nhật danh sách guest URLs
        setGuestUrls(createdGuests);

        if (invitationId) {
          message.success(`Cập nhật thiệp cưới thành công! Đã tạo ${createdGuests.length} thiệp cho khách mời.`);
          // Reload data
          const reloadResponse = await getInvitationById(invitationId);
          if (reloadResponse.success && reloadResponse.data) {
            setInvitationData(reloadResponse.data);
          }
        } else {
          message.success(`Tạo thiệp cưới thành công! Đã tạo ${createdGuests.length} thiệp cho khách mời.`);
          // Redirect to edit page with the new invitation ID
          if (response.data?.id && templateId) {
            router.push(`/invitations/${templateId}/customize?edit=${response.data.id}`);
          } else {
            router.push('/invitations');
          }
        }
      } else {
        message.error(invitationId ? 'Có lỗi xảy ra khi cập nhật thiệp cưới' : 'Có lỗi xảy ra khi tạo thiệp cưới');
      }
    } catch (error: any) {
      console.error('Error updating invitation:', error);
      console.error('Error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      
      const errorMessage = error.response?.data?.message 
        || error.message 
        || 'Có lỗi xảy ra khi cập nhật thiệp cưới';
      
      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const viewInvitation = () => {
    if (invitationData?.shareUrl) {
      let baseUrl = templatePreviewUrl || process.env.NEXT_PUBLIC_TEMPLATE_URL || 'http://localhost:3001';
      // Loại bỏ dấu / ở cuối nếu có
      baseUrl = baseUrl.replace(/\/+$/, '');
      window.open(`${baseUrl}/?shareUrl=${invitationData.shareUrl}`, '_blank');
    }
  };

  if (fetching) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white py-12 px-4 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải dữ liệu...</p>
                </div>
                  </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <Card className="shadow-lg">
          <div className="mb-6">
                  <Button
              icon={<ArrowLeftOutlined />}
                    onClick={() => router.back()}
              className="mb-4"
                  >
                    Quay lại
                  </Button>
            <h1 className="text-3xl font-bold text-gray-800">
              Chỉnh sửa Thiệp Cưới
            </h1>
            <p className="text-gray-600 mt-2">
              Cập nhật thông tin thiệp cưới của bạn
            </p>
          </div>

          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            className="space-y-4"
          >
            <Divider>Thông tin cơ bản</Divider>
            
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
              <Input placeholder="Ví dụ: Trung tâm Tiệc cưới White Palace" />
            </Form.Item>

            <Form.Item
              label="Địa Chỉ Chi Tiết"
              name="venueAddress"
              rules={[{ required: true, message: 'Vui lòng nhập địa chỉ chi tiết' }]}
            >
              <TextArea rows={2} placeholder="Nhập địa chỉ chi tiết" />
            </Form.Item>

            <Form.Item
              label="Danh Sách Người Nhận"
              tooltip="Thêm tên các khách mời. Mỗi người nhận sẽ có một link riêng để xem thiệp cưới."
              required
            >
              <Form.List 
                name="recipientNames" 
                initialValue={['Quý khách']}
                rules={[
                  {
                    validator: async (_, names) => {
                      if (!names || names.length === 0) {
                        return Promise.reject(new Error('Vui lòng thêm ít nhất một người nhận'));
                      }
                      const validNames = names.filter((name: string) => name && name.trim());
                      if (validNames.length === 0) {
                        return Promise.reject(new Error('Vui lòng nhập tên người nhận hợp lệ'));
                      }
                    },
                  },
                ]}
              >
                {(fields, { add, remove }, { errors }) => (
                  <div className="space-y-2">
                    {fields.map(({ key, name, ...restField }) => (
                      <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline" className="w-full">
                        <Form.Item
                          {...restField}
                          name={[name]}
                          rules={[
                            { required: true, message: 'Vui lòng nhập tên' },
                            { whitespace: true, message: 'Tên không được để trống' },
                            { max: 100, message: 'Tên không được quá 100 ký tự' }
                          ]}
                          className="flex-1 mb-0"
                        >
                          <Input 
                            placeholder="Nhập tên người nhận (ví dụ: Anh/Chị Nguyễn Văn A)" 
                            maxLength={100}
                            showCount
                          />
                        </Form.Item>
                        {fields.length > 1 && (
                          <Button
                            type="text"
                            danger
                            icon={<DeleteOutlined />}
                            onClick={() => remove(name)}
                            title="Xóa người nhận này"
                          >
                            Xóa
                          </Button>
                        )}
                      </Space>
                    ))}
                    <Form.ErrorList errors={errors} />
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      block
                      icon={<PlusOutlined />}
                      className="mt-2"
                    >
                      Thêm người nhận
                    </Button>
                    <div className="text-sm text-gray-500 mt-2">
                      💡 Mỗi người nhận sẽ nhận được một link riêng để xem thiệp cưới của họ
                      </div>
                    </div>
                )}
              </Form.List>
            </Form.Item>

            <Divider>Nội dung thiệp</Divider>

            <Form.Item
              label="Lời Mời"
              name="invitationMessage"
            >
              <TextArea rows={3} placeholder="Nhập lời mời trang trọng" />
            </Form.Item>

            <Form.Item
              label="Lời Nhắn"
              name="message"
            >
              <TextArea rows={3} placeholder="Lời nhắn đặc biệt..." />
            </Form.Item>

            <Form.Item
              label="Câu Chuyện Tình Yêu"
              name="story"
            >
              <TextArea rows={4} placeholder="Chia sẻ câu chuyện tình yêu của bạn" />
            </Form.Item>

            <Divider>Ảnh</Divider>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Form.Item
                label="Ảnh Bìa (URL)"
                name="coverImage"
              >
                <Input placeholder="https://example.com/cover.jpg" />
              </Form.Item>

              <Form.Item
                label="Ảnh Cặp Đôi (URL)"
                name="avatarImage"
              >
                <Input placeholder="https://example.com/couple.jpg" />
              </Form.Item>
                      </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Form.Item
                label="Ảnh Cô Dâu (URL)"
                name="brideImage"
              >
                <Input placeholder="https://example.com/bride.jpg" />
              </Form.Item>

              <Form.Item
                label="Ảnh Chú Rể (URL)"
                name="groomImage"
              >
                <Input placeholder="https://example.com/groom.jpg" />
              </Form.Item>
                      </div>

            <Form.Item
              label="Ảnh Địa Điểm (URL)"
              name="locationImage"
            >
              <Input placeholder="https://example.com/location.jpg" />
            </Form.Item>

            <Form.Item
              label="3 Ảnh Kết Hôn (URLs, cách nhau bởi dấu phẩy)"
              name="weddingImages"
              tooltip="Nhập 3 URL ảnh, cách nhau bởi dấu phẩy"
            >
              <TextArea rows={3} placeholder="https://example.com/wedding1.jpg, https://example.com/wedding2.jpg, https://example.com/wedding3.jpg" />
            </Form.Item>

            <Form.Item
              label="Thư Viện Ảnh (URLs, cách nhau bởi dấu phẩy)"
              name="gallery"
            >
              <TextArea rows={3} placeholder="https://example.com/img1.jpg, https://example.com/img2.jpg" />
            </Form.Item>

            <Divider>Thông tin khác</Divider>

            <Form.Item
              label="Tổ Chức"
              name="organization"
            >
              <Input placeholder="Tên công ty/đơn vị tổ chức" />
            </Form.Item>

            <Form.Item>
              <Space>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  icon={<SaveOutlined />}
                  size="large"
                  className="bg-rose-500 hover:bg-rose-600"
                >
                  {loading ? 'Đang lưu...' : 'Lưu thay đổi'}
                </Button>
                {invitationData?.shareUrl && (
                  <Button
                    icon={<EyeOutlined />}
                    onClick={viewInvitation}
                    size="large"
                  >
                    Xem thiệp
                  </Button>
                )}
              </Space>
            </Form.Item>
          </Form>

          {/* Hiển thị danh sách URL sau khi tạo thành công */}
          {guestUrls.length > 0 && (
            <Card className="mt-6 border-green-200 bg-green-50">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-green-700">
                  <CheckCircleOutlined className="text-xl" />
                  <h3 className="text-lg font-bold">Danh sách link thiệp cưới đã tạo</h3>
                        </div>
                <p className="text-sm text-gray-600">
                  Mỗi người nhận có một link riêng. Hãy gửi link tương ứng cho từng khách mời.
                </p>
                <div className="space-y-2">
                  {guestUrls.map((guest, index) => (
                    <div key={index} className="flex items-center gap-2 p-3 bg-white rounded border">
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900">{guest.name}</div>
                        <div className="text-sm text-gray-600 break-all">{guest.url}</div>
                        </div>
                      <Space>
                        <Button
                          type="text"
                          icon={<CopyOutlined />}
                          onClick={() => {
                            navigator.clipboard.writeText(guest.url);
                            message.success(`Đã copy link của ${guest.name}`);
                          }}
                          title="Copy link"
                        >
                          Copy
                        </Button>
                        <Button
                          type="text"
                          icon={<LinkOutlined />}
                          onClick={() => window.open(guest.url, '_blank')}
                          title="Mở link trong tab mới"
                        >
                          Mở
                        </Button>
                      </Space>
                      </div>
                  ))}
                    </div>
                  </div>
            </Card>
              )}
            </Card>
      </div>
    </div>
  );
}
