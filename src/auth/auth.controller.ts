import { Body, Controller, ParseIntPipe, Post} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto/auth.dto";

@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService){

    }
    @Post("signup")
   signup(@Body() dto: AuthDto){
    console.log({
        dto,
    });
    return this.authService.signup(dto);
   }

    @Post("signin")
    signin(@Body() dto: AuthDto) {
        console.log({
            dto,
        });
        return this.authService.signin(dto);
    }

    @Post("forgot-password")
  async forgotPassword(@Body() dto: { email: string }) {
    console.log(dto);
    return this.authService.sendPasswordResetEmail(dto.email);
  }

}