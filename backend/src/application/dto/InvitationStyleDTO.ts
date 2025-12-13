export interface InvitationStyleDTO {
  groomName: string;
  brideName: string;
  story?: string;
  invitationMessage?: string;
  eventDate: string;
  eventTime?: string;
  venue: string;
  coverImage?: string;
  gallery?: string[];
  discountCode?: string;
}

export interface InvitationStyleResponse extends InvitationStyleDTO {
  shareUrl: string;
}

