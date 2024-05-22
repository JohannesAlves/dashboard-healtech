import { IUsers } from '@/providers/dto/get-all-users-dto';

export interface IColumn {
  field: keyof IUsers;
  headerName: string;
  type: string;
  align?: 'right' | 'left' | 'center';
}
