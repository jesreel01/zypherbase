import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { OrganizationsModule } from './modules/tenancy/organizations/organizations.module';
import { WorkspacesModule } from './modules/tenancy/workspaces/workspaces.module';
import { AuthorizationModule } from './modules/authorization/authorization.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    OrganizationsModule,
    WorkspacesModule,
    AuthorizationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
