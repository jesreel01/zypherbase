export class Role {
  id: string;
  name: string;
  description: string;

  organizationId?: string;

  permissions: string[];
}
