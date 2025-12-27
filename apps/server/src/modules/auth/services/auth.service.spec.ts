import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../../modules/users/users.service';
import { JwtTokenService } from './jwt-token.service';
import { RegisterDto } from '@zypherbase/shared';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt');

describe('AuthService', () => {
  let service: AuthService;
  let usersService: jest.Mocked<UsersService>;
  let tokenService: jest.Mocked<JwtTokenService>;

  const mockUser = {
    id: '123e4567-e89b-12d3-a456-426614174000',
    email: 'test@example.com',
    passwordHash: 'hashedPassword123',
    firstName: 'John',
    lastName: 'Doe',
    phone: '1234567890',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockRegisterDto: RegisterDto = {
    email: 'test@example.com',
    password: 'password123',
    firstName: 'John',
    lastName: 'Doe',
    phone: '1234567890',
  };

  beforeEach(async () => {
    const mockUsersService = {
      existsByEmail: jest.fn(),
      create: jest.fn(),
    };

    const mockTokenService = {
      generateAccessToken: jest.fn(),
      generateRefreshToken: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
        {
          provide: JwtTokenService,
          useValue: mockTokenService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get(UsersService);
    tokenService = module.get(JwtTokenService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('register', () => {
    it('should successfully register a new user', async () => {
      usersService.existsByEmail.mockResolvedValue(false);
      usersService.create.mockResolvedValue(mockUser);
      tokenService.generateAccessToken.mockReturnValue('mock-access-token');
      tokenService.generateRefreshToken.mockReturnValue('mock-refresh-token');
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword123');

      const result = await service.register(mockRegisterDto);

      expect(result.accessToken).toBe('mock-access-token');
      expect(result.refreshToken).toBe('mock-refresh-token');
      expect(result.user).toEqual(mockUser);
    });

    it('should check if email already exists', async () => {
      usersService.existsByEmail.mockResolvedValue(false);
      usersService.create.mockResolvedValue(mockUser);
      tokenService.generateAccessToken.mockReturnValue('mock-access-token');
      tokenService.generateRefreshToken.mockReturnValue('mock-refresh-token');
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword123');

      await service.register(mockRegisterDto);

      expect(usersService.existsByEmail).toHaveBeenCalledWith(
        mockRegisterDto.email,
      );
      expect(usersService.existsByEmail).toHaveBeenCalledTimes(1);
    });

    it('should throw ConflictException when email already exists', async () => {
      usersService.existsByEmail.mockResolvedValue(true);

      await expect(service.register(mockRegisterDto)).rejects.toThrow(
        ConflictException,
      );
      await expect(service.register(mockRegisterDto)).rejects.toThrow(
        'Email already exists',
      );

      expect(usersService.existsByEmail).toHaveBeenCalledWith(
        mockRegisterDto.email,
      );
      expect(usersService.create).not.toHaveBeenCalled();
      expect(tokenService.generateAccessToken).not.toHaveBeenCalled();
      expect(tokenService.generateRefreshToken).not.toHaveBeenCalled();
    });

    it('should hash the password with bcrypt using 10 salt rounds', async () => {
      usersService.existsByEmail.mockResolvedValue(false);
      usersService.create.mockResolvedValue(mockUser);
      tokenService.generateAccessToken.mockReturnValue('mock-access-token');
      tokenService.generateRefreshToken.mockReturnValue('mock-refresh-token');
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword123');

      await service.register(mockRegisterDto);

      expect(bcrypt.hash).toHaveBeenCalledWith(mockRegisterDto.password, 10);
      expect(bcrypt.hash).toHaveBeenCalledTimes(1);
    });

    it('should create user with email and hashed password', async () => {
      const hashedPassword = 'hashedPassword123';
      usersService.existsByEmail.mockResolvedValue(false);
      usersService.create.mockResolvedValue(mockUser);
      tokenService.generateAccessToken.mockReturnValue('mock-access-token');
      tokenService.generateRefreshToken.mockReturnValue('mock-refresh-token');
      (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);

      await service.register(mockRegisterDto);

      expect(usersService.create).toHaveBeenCalledWith({
        email: mockRegisterDto.email,
        passwordHash: hashedPassword,
        firstName: mockRegisterDto.firstName,
        lastName: mockRegisterDto.lastName,
        phone: mockRegisterDto.phone,
      });
      expect(usersService.create).toHaveBeenCalledTimes(1);
    });

    it('should generate access token with user id', async () => {
      usersService.existsByEmail.mockResolvedValue(false);
      usersService.create.mockResolvedValue(mockUser);
      tokenService.generateAccessToken.mockReturnValue('mock-access-token');
      tokenService.generateRefreshToken.mockReturnValue('mock-refresh-token');
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword123');

      await service.register(mockRegisterDto);

      expect(tokenService.generateAccessToken).toHaveBeenCalledWith(
        mockUser.id,
      );
      expect(tokenService.generateAccessToken).toHaveBeenCalledTimes(1);
    });

    it('should generate refresh token with user id', async () => {
      usersService.existsByEmail.mockResolvedValue(false);
      usersService.create.mockResolvedValue(mockUser);
      tokenService.generateAccessToken.mockReturnValue('mock-access-token');
      tokenService.generateRefreshToken.mockReturnValue('mock-refresh-token');
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword123');

      await service.register(mockRegisterDto);

      expect(tokenService.generateRefreshToken).toHaveBeenCalledWith(
        mockUser.id,
      );
      expect(tokenService.generateRefreshToken).toHaveBeenCalledTimes(1);
    });

    it('should return correct structure with tokens and user', async () => {
      const accessToken = 'mock-access-token';
      const refreshToken = 'mock-refresh-token';

      usersService.existsByEmail.mockResolvedValue(false);
      usersService.create.mockResolvedValue(mockUser);
      tokenService.generateAccessToken.mockReturnValue(accessToken);
      tokenService.generateRefreshToken.mockReturnValue(refreshToken);
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword123');

      const result = await service.register(mockRegisterDto);

      expect(result).toHaveProperty('accessToken', accessToken);
      expect(result).toHaveProperty('refreshToken', refreshToken);
      expect(result.user).toEqual(mockUser);
    });

    it('should execute registration flow in correct order', async () => {
      const callOrder: string[] = [];

      usersService.existsByEmail.mockImplementation(() => {
        callOrder.push('existsByEmail');
        return Promise.resolve(false);
      });

      (bcrypt.hash as jest.Mock).mockImplementation(() => {
        callOrder.push('hash');
        return Promise.resolve('hashedPassword123');
      });

      usersService.create.mockImplementation(() => {
        callOrder.push('create');
        return Promise.resolve(mockUser);
      });

      tokenService.generateAccessToken.mockImplementation(() => {
        callOrder.push('generateAccessToken');
        return 'mock-access-token';
      });

      tokenService.generateRefreshToken.mockImplementation(() => {
        callOrder.push('generateRefreshToken');
        return 'mock-refresh-token';
      });

      await service.register(mockRegisterDto);

      expect(callOrder).toEqual([
        'existsByEmail',
        'hash',
        'create',
        'generateAccessToken',
        'generateRefreshToken',
      ]);
    });
  });
});
