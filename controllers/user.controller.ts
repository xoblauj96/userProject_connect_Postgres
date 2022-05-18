import { Request, Response, NextFunction, response } from 'express';
import { UserEntity, dbConnection } from '../entities';
import { UserModel } from '../entities/user.entity';
import { APIService } from '../services/api.service';
import { Json } from 'sequelize/types/lib/utils';
export interface ILogin {
    userName: string;
    password: string;
}
export interface IChangePassword {
    userName: string;
    password: string;
    oldPassword: string;
}
export class UserController {
    constructor() { }
    // CRUD
    // TOUY 14/09/2020 finished 
    static GetUserList(req: Request, res: Response) {
        try {
            let id = req.query.limit as string;
            console.log("idid===> ",req.query);

            const limit = req.query.limit ? Number(req.query.limit) : 5;
            const skip = req.query.skip ? Number(req.query.skip) : 0;
            console.log("limit ===>> ", limit, " skip ", skip);
            UserEntity.findAll({ limit, offset: skip * limit }).then(r => {
               
                const users = r.map((v) => { // i, a                    
                    const u = APIService.clone(v);                    
                    delete u.role;
                    delete u.password;
                    return u as UserModel;
                })
                
                // const token = APIService.requestToken(req);
                res.send(APIService.okRes(users));
            }).catch(e => {
                res.send(APIService.errRes(e));
            })
        } catch (error) {
            console.log(error);
            res.send(APIService.errRes(error))

        }

    }
    // TOUY 14/09/2020 finished 
    static GetUserDetails(req: Request, res: Response) {
        try {
            const id: number = req.body.id;
            UserEntity.findByPk(id).then(r => {
                if (r) {
                    const u = APIService.clone(r);
                    delete u.role;
                    delete u.password;
                    return res.send(APIService.okRes(u));
                } else {
                    res.send(APIService.errRes({}));
                }
                // const token = APIService.requestToken(req);
            }).catch(e => {
                res.send(APIService.errRes(e));
            })
        } catch (error) {
            console.log(error);
            res.send(APIService.errRes(error))

        }
    }
    static async CreateUser(req: Request, res: Response) {
        try {
            const user = req.body as UserModel;
            delete user.id;

            dbConnection.transaction().then(transaction => {
                // check exist user
                UserEntity.findOne({ where: { userName: user.userName, phoneNumber: user.phoneNumber }, transaction }).then(async r => {
                    if (r) {
                        await transaction.rollback();
                        res.send(APIService.errRes('User exist'));
                    } else {
                        UserEntity.create(user).then(r => {
                            res.send(APIService.okRes(r, 'created ok'));
                        }).catch(e => {
                            res.send(APIService.errRes(e));
                        })
                    }
                })
            });

        } catch (error) {
            res.send(APIService.errRes(error));
        }

        // const transaction = await dbConnection.transaction();

    }
    static DeleteUser(req: Request, res: Response) {
        let id = req.query.id + "";
        UserEntity.findByPk(id).then(r => {
            let x = r?.destroy();
            res.send(APIService.okRes(x))
        }).catch(e => {
            res.send(APIService.errRes(e))
        })
    }
    static UpdateUser(req: Request, res: Response) {
        let id = req.query.id + "";
        let userUpdate = UserEntity.build(req.body) as unknown as UserModel;
        UserEntity.findByPk(id).then(async r => {
            r["phoneNumber"] = userUpdate.phoneNumber;
            let x = await r?.save();
            res.send(APIService.okRes(x, "updated Ok....!"));
        })

    }
    // // TOUY 14/09/2020 adde ResetPassword
    static ResetPassword(req: Request, res: Response) {
        const login = req.body as ILogin;
        if (login.userName && login.password) {
            UserEntity.findOne({ where: { userName: login.userName } }).then(r => {
                if (r) { 
                    r.password = login.password;
                    r.save();
                    res.send(APIService.okRes('Reset password ok'));
                }
                else {
                    res.send(APIService.errRes('user not found'));
                }
            }).catch(e => {
                console.log('error login ', e);
                res.send(APIService.errRes(e, 'Error Reset password'));
            })
        } else {
            res.send(APIService.errRes('Empty username or password'));
        }
    }
    // TOUY 14/09/2020 adde changepassword
    static ChangePassword(req: Request, res: Response) {
        const login = req.body as IChangePassword;
        console.log('CCCCCCCCCCCCCC', req['_user']);
        const _user = req['_user'] as UserModel;
        console.log('_User', _user);
        console.log("login", login);
        
        if (login.userName === _user.userName && login.password && login.password.length > 5 && login.password.length < 51 && login.oldPassword) {
            UserEntity.findOne({ where: { userName: login.userName } }).then(r => {
                if (r) {
                    if (r.validPassword(login.oldPassword)) {
                        r.password = login.password;
                        r.save();
                        res.send(APIService.okRes('change password ok'));
                    }
                    else {
                        res.send(APIService.errRes('wrong password'));
                    }
                }
                else {
                    res.send(APIService.errRes('user not found'));
                }
            }).catch(e => {
                console.log('error login ', e);
                res.send(APIService.errRes(e, 'Error Reset password'));
            })
        } else {
            res.send(APIService.errRes('Empty username or password'));
        }
    }
    // POST
    // TOUY 14/09/2020 edited Login 
    static Login(req: Request, res: Response) {
        const login = req.body as ILogin;
        // let userName = login.userName
        console.log("loging===> ", login);
        if (login.userName && login.password) {
            UserEntity.findOne({ where: { userName: login.userName } }).then(r => {
                console.log('login r', r);
                if (r) {
                    console.log("password:===> ", login.password);
                    if (r.validPassword(login.password)) {
                        console.log("if of r", r);
                        const user = APIService.clone(r);// JSON.parse(JSON.stringify(r))
                        delete user.role;
                        delete user.password;
                        delete user.phoneNumber;
                        // delete user.id;
                        // UserController.setHeaderToken()
                        const token = APIService.createToken(r);
                        if (!token) {
                            return res.send(APIService.errRes('Failed setting a token'));
                        }
                        res.setHeader('authorization', token);
                        res.send(APIService.okRes({ user, token }, 'Login OK'));
                    }
                    else {
                        console.log("xxxxx==> ", r.validPassword(login.password));
                        res.send(APIService.errRes('Incorrect password no'));
                    }
                } else {
                    res.send(APIService.errRes('Username not found'));
                }
            }).catch(e => {
                console.log('error login ', e);

                res.send(APIService.errRes(e, 'Error login'));
            })
        } else {
            res.send(APIService.errRes('Empty username or password'));
        }
    }
    static CheckAdminAuthorization(req: Request, res: Response, next: NextFunction) {
        const login = req.body as ILogin;
        if (login.userName && login.password) {
            if (login.userName === 'super-admin' && login.password === '55F^fFS`},srzWc[b[]e{2F~/.#SQw') {
                return next();
            }
        }
        res.status(402).send('You have no an authorization!')
    }
    // authorization
    static checkAuthorize(req: Request, res: Response, next: NextFunction) {
        
        const token = req.headers['authorization'] + '';

        // const _user = 
        /// refreshing
        console.log("token ----> ", token);
        const newToken = APIService.validateToken(token);
        console.log("newToken ### ", newToken);
        console.log("newToken ----> ", newToken);
        // req.headers['authorization'] = newToken;
        // res.setHeader('authorization', newToken);
        if (newToken) {
            req.headers['authorization'] = newToken;
            res.setHeader('authorization', newToken);
            req['_user'] = APIService.getCurrentUser(newToken);
            console.log(' MMMMMMMMMMMMMMMMMMMMMMMM ', req['_user']);
            next();
        }
        else {
            res.status(402).send('You have no an authorization! hhh')
            // next();
        }
    }
    // TOUY  14/09/2020 12:00 added checkIsYourSelf
    static checkIsYourSelf(req: Request, res: Response, next: NextFunction) {
        if (APIService.checkMySelf(req.headers['authorization'] + '', req)) {
            next();
        } else {
            res.status(402).send('You have no an authorization! to check yourself')
        }
    }

    static CheckAdminAuthorizeToken(req: Request, res: Response, next: NextFunction) {
        const token = req.headers['super-admin-authorization'] + '';
        console.log(token);
        
        if (APIService.vatlidateSuperAdmin(token)) {
            return next();
        }
        // else {
        res.status(402).send('You have no an authorization!')
        // }
    }

    // static setHeaderToken(token:string,res:Response){
    //     res.setHeader('authorization', token);
    // }
    //static refreshToken(user:UserModel,res:Response){
    //const token = APIService.createToken(user);
    // res.setHeader('authorization', token);
    // return token;
    //}
}