export class Membership {
  id: string;
  userId: string;
  organizationId: string;

  roleId: string;

  scope: string; // 'organization' or 'workspace'
  workspaceIds: string[];
}
