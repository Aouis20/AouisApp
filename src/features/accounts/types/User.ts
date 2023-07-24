export type User = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;

  is_staff: boolean;
  is_admin: boolean;
  is_superuser: boolean;
  is_active: boolean;
};