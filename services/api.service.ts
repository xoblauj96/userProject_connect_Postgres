import * as jwt from 'jsonwebtoken';
import { UserModel } from '../entities/user.entity';
import { Request } from 'express';




export class APIService {








    static okRes(data: any, message: string = 'OK', status: number = 1) {
        return { status, message, data };
    }







    static errRes(data: any, message: string = 'Error', status: number = 0) {
        return { status, message, data };
    }






    static requestToken(req: Request) {
        return req.headers['authorization'];
    }






    static createToken(data: UserModel) {
        try {
            return jwt.sign({ data }, Keys.jwtKey, { expiresIn: '10000m' });
        } catch (error) {
            console.log(error);
            return '';
        }
        return '';
    }







    static validateToken(k: string) {
        try {

            const data = jwt.verify(k, Keys.jwtKey)['data'] as UserModel;
            const token = APIService.createToken(data);

            if (token) return token;
            else return '';

        } catch (error) {
            console.log(error);
            return '';
        }
    }







    // TOUY  14/09/2020 12:00 added decodeToken
    static getCurrentUser(k: string) {
        try {
            const o = jwt.decode(k);
            console.log(JSON.stringify(o));
            if (o) {
                return o['data'];
            }
        } catch (error) {
            console.log(error);
        }
        return null;
    }









    // TOUY  14/09/2020 12:00 added checkMySelf
    static checkMySelf(k: string, req: Request) {
        try {

            const o = jwt.decode(k);

            if (o) {
                const data = o['data'] as UserModel;
                const user = req['_user'] as unknown as UserModel;
                const id = req.body.id;

                if (user.id === data.id && user.id === Number(id) && user.id && data.id && Number(id)) {
                    return true;
                } else {
                    return false;
                }


            }
            return false;
        } catch (error) {
            console.log(error);
        }
        return false;
    }






    static vatlidateSuperAdmin(k: string) {
        if (k === Keys.superadminkey)
            return true;
        else
            return false;
    }




    static clone(data: any) {
        return JSON.parse(JSON.stringify(data))
    }



}




enum Keys {
    jwtKey = 'Dx4YsbptOGuHmL94qdC2YAPqsUFpzJkc',
    superadminkey = '9F58A83B7628211D6E739976A3E3A'
}