import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto/auth.dto";
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";

@Injectable()
export class AuthService{
constructor (private prisma: PrismaService){}
   async signup(dto: AuthDto){
    //genarate the password hash
    const hash = await argon.hash(dto.password);
    //save new user to db
    try{
    const user = await this.prisma.user.create({
        data: {
            email: dto.email,
            hash,
        }
    });
    console.log(user);
    delete user.hash;

    return user.hash;   
   } catch(error){
    if (error instanceof PrismaClientKnownRequestError){
        if (error.code === "P2002"){
            throw new ForbiddenException(
                'Credentials taken',
                
            );
            console.log(error.code);
        }  
    }
   //throw error;
   } 
}
  async signin(dto: AuthDto) {

    const user = await this.prisma.user.findUnique({
        where: {
            email: dto.email,

        },
    });

    if(!user) throw new ForbiddenException("Credentials incorrect");

    const pwMatches = await argon.verify(user.hash, dto.password);

    if(!pwMatches) throw new ForbiddenException("Credentials incorrect");

    delete user.hash;
    return user;
        
    }

}