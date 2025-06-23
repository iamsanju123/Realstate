import jwt from 'jsonwebtoken'
import { IUser } from '../models/user.model.js';
import dotenv from "dotenv";

dotenv.config({
  path: "./../.env"
});
const SECURE_TOKEN = "DHJJSSDSAJDKJBASXASBXASSFGfgfdgsbhffbgfs"
export const createToken = (user:IUser) =>{
    try {
        const token = jwt.sign({ id: user.id, username: user.username }, SECURE_TOKEN, {
        expiresIn: '7h'
    });
     return token
    } catch (error) {
        
    }
}