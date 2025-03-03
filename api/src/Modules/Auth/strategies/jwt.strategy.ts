import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { AuthRepository } from "../Repository/auth.repository";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authRepository: AuthRepository) {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
        throw new UnauthorizedException('JWT_SECRET is not defined');
    }
    super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration: false,
        secretOrKey: jwtSecret,
    });
}

  async validate(payload: any) {
    const user = await this.authRepository.findByEmail(payload.email);
    if (!user) {
        throw new UnauthorizedException({
            message: 'Token has expired',
            status: false
        });
    }
    return {
        id: payload.sub,
        email: payload.email,
        role: payload.role
    };
  }

}
