import { UserRepository } from "../repositories/user.repository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config();
export class UserService {
    private userRepository = new UserRepository();

    async register(data:{
        name:string,
        email:string,
        password:string
    }){
        const existingUser = await this.userRepository.findByEmail(data.email);

        if(existingUser){
            throw new Error("User Already Exists")
        }

        const hashedPassword = await bcrypt.hash(data.password,10);

        const user = await this.userRepository.create({...data,password:hashedPassword});

        return user;
    }
    async login(data:{
        email:string,
        password:string,
    }){
        const user = await this.userRepository.findByEmail(data.email);
         
        if(!user){
            throw new Error("Invalid email or password");
        }
        const isPasswordValid = await bcrypt.compare(data.password,user.password);
        if (!isPasswordValid) {
            throw new Error("Invalid email or password");
        }

        const token = jwt.sign(
            {
                userId:user.id,
                email:user.email,
                role:user.role,
            },
            process.env.JWT_SECRET,
            {
                expiresIn:"7d"
            }
        )
        return {token,user}
    }
    async getProfile(userId:string){
        const user = await this.userRepository.findById(userId);
        if(!user){
            throw new Error("User not found");
        }
        return user;
    }
}