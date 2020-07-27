import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User, LoginInput, SignupInput } from "./auth.type";
import { hash, compare } from "bcrypt";

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  users = [
    { id: "1", name: "test1", password: "$2b$10$0k8cQtONiBm7T20KD9QMgeX/7lzAwBVMyrhziIGDkHNvfuiqXmafO", role: "user" }, //111111
    { id: "2", name: "test2", password: "$2b$10$0k8cQtONiBm7T20KD9QMgeX/7lzAwBVMyrhziIGDkHNvfuiqXmafO", role: "user" },
  ];

  async validateUser({ userId }: { userId: string }): Promise<User> {
    return this.findUserById(userId);
  }

  async getUserFromToken(token: string): Promise<User> {
    const id = this.jwtService.decode(token)["sub"];
    return this.findUserById(id);
  }

  async signup(payload: SignupInput) {
    const hashPassoword = await this.hashPassword(payload.password);
    const id = String(this.users.length + 1);
    this.users.push({ id, name: `test${id}`, password: hashPassoword, role: "user" });
    const user = await this.findUserById(id);
    return {
      user,
      token: this.generateToken(user),
    };
  }

  async login({ username, password }: LoginInput) {
    const user = await this.findUserById(username);

    if (!user) {
      throw new NotFoundException(`No user found for username: ${username}`);
    }
    const passwordValid = await this.validatePassword(password, user.password);
    if (!passwordValid) {
      throw new BadRequestException("Invalid password");
    }

    return {
      user,
      token: this.generateToken(user),
    };
  }

  async findUserById(username: string) {
    return this.users.find((i) => i.id == username);
  }

  generateToken(user: User) {
    return this.jwtService.sign({ sub: user.id });
  }

  validatePassword(password: string, hashedPassword: string): Promise<boolean> {
    return compare(password, hashedPassword);
  }

  hashPassword(password: string): Promise<string> {
    return hash(password, 10);
  }
}
