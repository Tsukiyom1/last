import {
	BadRequestException,
	Injectable,
	UnauthorizedException,
} from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { RegisterDto } from "./dto/register.dto";
import * as bcrypt from "bcrypt";
import { randomUUID } from "crypto";
import { SigninDto } from "./dto/sign-in.dto";
@Injectable()
export class AuthService {
	constructor(private readonly prisma: PrismaService) {}

	async register(dto: RegisterDto) {
		const existing = await this.prisma.user.findUnique({
			where: { username: dto.username },
		});

		if (existing) {
			throw new BadRequestException("user already exists");
		}

		const hashed = await bcrypt.hash(dto.password, 10);

		const token = randomUUID();
		const user = await this.prisma.user.create({
			data: {
				username: dto.username,
				displayName: dto.displayName,
				password: hashed,
				token: token,
			},
		});
		const { password, ...rest } = user;
		return rest;
	}

	async login(dto: SigninDto) {
		const user = await this.prisma.user.findUnique({
			where: { username: dto.username },
		});

		if (!user) {
			throw new UnauthorizedException("user doesnt exist");
		}

		const isMatch = await bcrypt.compare(dto.password, user.password);
		if (!isMatch) {
			throw new UnauthorizedException("login or password is wrong");
		}

		const token = randomUUID();

		const updated = await this.prisma.user.update({
			where: { id: user.id },
			data: { token },
		});

		const { password, ...rest } = updated;
		return rest;
	}

	async logout(token: string) {
		const user = await this.prisma.user.findFirst({ where: { token } });
		if (!user) return;

		await this.prisma.user.update({
			where: { id: user.id },
			data: { token: randomUUID() },
		});
	}

	async getUserByToken(token: string) {
		if (!token) return null;
		return await this.prisma.user.findFirst({ where: { token } });
	}
}
