export enum SalutationType {
  MR = 'MR',
  MRS = 'MRS',
}

export type User = {
  id: number;
  
  salutation: SalutationType;
  first_name: string | undefined;
  last_name: string | undefined;
  username: string | undefined;
  language: string

  email: string;
  phone_number: string;

  address_line1: string | null;
  address_line2: string | null;
  city: string | null;
  state: string | null;
  postal_code: string | null;

  is_staff: boolean;
  is_admin: boolean;
  is_superuser: boolean;
  is_active: boolean;
};