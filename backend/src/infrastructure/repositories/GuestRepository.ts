import { db } from '../config/database';
import { Guest } from '../../domain/entities/Guest';
import { IGuestRepository } from '../../domain/repositories/IGuestRepository';
import { v4 as uuidv4 } from 'uuid';

export class GuestRepository implements IGuestRepository {
  private readonly tableName = 'guests';

  async findAll(): Promise<Guest[]> {
    console.log('Fetching all guests from table:', this.tableName);
    const rows = await db(this.tableName)
      .orderBy('created_at', 'desc')
      .select('*');
    
    console.log('Total guests found:', rows.length);
    return rows.map((row) => this.mapToEntity(row));
  }

  async findByInvitationId(invitationId: string): Promise<Guest[]> {
    console.log('Querying guests for invitation_id:', invitationId);
    console.log('Table name:', this.tableName);
    
    // Kiểm tra xem có dữ liệu trong bảng không
    const totalCount = await db(this.tableName).count('* as count').first();
    console.log('Total guests in table:', totalCount);
    
    const rows = await db(this.tableName)
      .where({ invitation_id: invitationId })
      .orderBy('created_at', 'asc')
      .select('*');
    
    console.log('Found rows:', rows.length);
    if (rows.length > 0) {
      console.log('Sample row:', {
        id: rows[0].id,
        invitation_id: rows[0].invitation_id,
        name: rows[0].name,
      });
    } else {
      // Debug: Kiểm tra xem có guests nào khác không
      const allGuests = await db(this.tableName).select('id', 'invitation_id', 'name').limit(5);
      console.log('Sample guests in table:', allGuests);
    }
    
    return rows.map((row) => this.mapToEntity(row));
  }

  async findById(id: string): Promise<Guest | null> {
    const row = await db(this.tableName).where({ id }).first();
    return row ? this.mapToEntity(row) : null;
  }

  async create(data: {
    invitationId: string;
    name: string;
    status?: 'pending' | 'accepted' | 'declined';
    shareUrl?: string;
  }): Promise<Guest> {
    const id = uuidv4();
    // Tạo shareUrl duy nhất nếu chưa có
    const shareUrl = data.shareUrl || this.generateShareUrl(data.name, id);
    
    console.log('Inserting guest into database:', {
      id,
      invitation_id: data.invitationId,
      name: data.name,
      status: data.status || 'pending',
      share_url: shareUrl,
    });

    try {
      const insertData: any = {
        id,
        invitation_id: data.invitationId,
        name: data.name,
        status: data.status || 'pending',
      };

      // Thêm share_url nếu có (sẽ bỏ qua nếu cột chưa tồn tại)
      try {
        insertData.share_url = shareUrl;
        await db(this.tableName).insert(insertData);
      } catch (insertError: any) {
        // Nếu lỗi do cột share_url không tồn tại, thử lại không có share_url
        if (insertError.code === 'ER_BAD_FIELD_ERROR' || insertError.message?.includes('share_url')) {
          console.warn('⚠️ share_url column does not exist, inserting without shareUrl');
          delete insertData.share_url;
          await db(this.tableName).insert(insertData);
        } else {
          throw insertError;
        }
      }

      console.log('Guest inserted successfully, fetching created guest...');
      const created = await this.findById(id);
      if (!created) {
        console.error('Failed to fetch created guest');
        throw new Error('Failed to create guest');
      }
      console.log('✅ Guest created and fetched:', {
        id: created.id,
        name: created.name,
        invitationId: created.invitationId,
        shareUrl: created.shareUrl,
      });
      return created;
    } catch (error: any) {
      console.error('❌ Error inserting guest:', error);
      console.error('Error details:', {
        message: error.message,
        code: error.code,
        sqlMessage: error.sqlMessage,
      });
      throw error;
    }
  }

  async update(id: string, data: Partial<Guest>): Promise<Guest | null> {
    const updateData: any = {};

    if (data.name) updateData.name = data.name;
    if (data.status) updateData.status = data.status;

    updateData.updated_at = db.fn.now();

    const updated = await db(this.tableName).where({ id }).update(updateData);

    if (updated === 0) {
      return null;
    }

    return this.findById(id);
  }

  async delete(id: string): Promise<boolean> {
    const deleted = await db(this.tableName).where({ id }).del();
    return deleted > 0;
  }

  async findByShareUrl(shareUrl: string): Promise<Guest | null> {
    const row = await db(this.tableName).where({ share_url: shareUrl }).first();
    return row ? this.mapToEntity(row) : null;
  }

  private generateShareUrl(name: string, id: string): string {
    // Tạo shareUrl từ tên và ID: tên-không-dấu + 8 ký tự đầu của UUID
    const nameSlug = name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Loại bỏ dấu
      .replace(/[^a-z0-9]+/g, '-') // Thay ký tự đặc biệt bằng dấu gạch ngang
      .replace(/^-+|-+$/g, ''); // Loại bỏ dấu gạch ngang ở đầu và cuối
    
    const shortId = id.replace(/-/g, '').substring(0, 8);
    return `${nameSlug}-${shortId}`;
  }

  private mapToEntity(row: any): Guest {
    return new Guest(
      row.id,
      row.invitation_id,
      row.name,
      row.status,
      row.share_url,
      row.time,
      row.created_at,
      row.updated_at
    );
  }
}

