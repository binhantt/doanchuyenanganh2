export interface BookingFormData {
  name: string;
  phone: string;
  eventDate: string;
  package: string;
  notes: string;
}

export interface BookingFormErrors {
  name?: string;
  phone?: string;
  eventDate?: string;
  package?: string;
  notes?: string;
}

export interface BookingSectionProps {
  title?: string;
  subtitle?: string;
  packages?: PackageOption[];
  onSubmit?: (data: BookingFormData) => void | Promise<void>;
}

export interface PackageOption {
  id: string;
  name: string;
  price?: number;
}
