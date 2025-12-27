import { Permission } from './permission.entity';

export class PermissionGroup {
  id: string;
  name: string;
  description: string;

  permissions: Permission[];
}
