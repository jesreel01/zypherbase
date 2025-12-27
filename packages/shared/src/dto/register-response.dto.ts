import { User } from "../entities";
import { UserResponseDto } from "./user-response.dto";

export class RegisterResponseDto {
  accessToken!: string;
  refreshToken!: string;
  user!: UserResponseDto;
}
