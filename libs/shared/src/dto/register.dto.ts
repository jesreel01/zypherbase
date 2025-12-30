import { IsEmail, IsString, MinLength } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class RegisterDto {
  @ApiProperty({
    example: "user@example.com",
    description: "User email address",
  })
  @IsEmail()
  email!: string;

  @ApiProperty({
    example: "password123",
    description: "User password",
    minLength: 6,
  })
  @IsString()
  @MinLength(6)
  password!: string;

  @ApiProperty({
    example: "John",
    description: "User first name",
    minLength: 2,
  })
  @IsString()
  @MinLength(2)
  firstName!: string;

  @ApiProperty({ example: "Doe", description: "User last name", minLength: 2 })
  @IsString()
  @MinLength(2)
  lastName!: string;

  @ApiPropertyOptional({
    example: "+1234567890",
    description: "User phone number",
  })
  @IsString()
  phone?: string;
}
