export type User = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  username: string;

  is_staff: boolean;
  is_admin: boolean;
  is_superuser: boolean;
  is_active: boolean;
};