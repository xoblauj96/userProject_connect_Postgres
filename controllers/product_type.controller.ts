import { Request, Response, NextFunction, response } from 'express';
import {  dbConnection, ProductypeEntity } from '../entities';
import { APIService } from '../services/api.service';
import { Json } from 'sequelize/types/lib/utils';
import { ProtyModel } from '../entities/product_type.entity';


export class Product_type_Controller {
    
    
    constructor() { }





    static list(req: Request, res: Response) {
        try {
            const limit = req.query.limit ? Number(req.query.limit) : 5;
            const skip = req.query.skip ? Number(req.query.skip) : 0;
            ProductypeEntity.findAll({ limit, offset: skip * limit }).then(r => {

                const users = r.map((v) => {
                    const u = APIService.clone(v);
                    return u as ProtyModel;
                })

                res.send(APIService.okRes(users));
            }).catch(e => {
                res.send(APIService.errRes(e));
            })
        } catch (error) {
            console.log(error);
            res.send(APIService.errRes(error))

        }

    }






    
    static Details(req: Request, res: Response) {
        try {
            const id: number = req.body.id;
            ProductypeEntity.findByPk(id).then(r => {
                if (r) {
                    const u = APIService.clone(r);
                    return res.send(APIService.okRes(u));
                } else {
                    res.send(APIService.errRes({}));
                }
            }).catch(e => {
                res.send(APIService.errRes(e));
            })
        } catch (error) {
            console.log(error);
            res.send(APIService.errRes(error))

        }
    }









    static async create(req: Request, res: Response) {

        try {
            const product = req.body as ProtyModel;
            
            if(product){
                

                dbConnection.transaction().then(transaction => {
                    // check exist product
                    ProductypeEntity.findOne({ where: { proty_name: product.proty_name }, transaction }).then(async r => {
                        if (r) {
                            await transaction.rollback();
                            res.send(APIService.errRes(`Product type  ${product.proty_name} exist`));
                        } else {
                            ProductypeEntity.create(product).then(r => {
                                res.send(APIService.okRes(r, `created Product type  \'${product.proty_name}\' Ok...!`));
                            }).catch(e => {
                                res.send(APIService.errRes(e));
                            })
                        }
                    })
                });
            }else{
                res.send(APIService.errRes('Paramater Empty'));
            }
            

        } catch (error) {
            res.send(APIService.errRes(error));
        }

    }






    static delete(req: Request, res: Response) {
        let id = req.query.id + "";
        ProductypeEntity.findByPk(id).then(r => {
            let x = r?.destroy();
            res.send(APIService.okRes(x))
        }).catch(e => {
            res.send(APIService.errRes(e))
        })
    }




    static update(req: Request, res: Response) {
        let id = req.query.id + "";
        let Update = ProductypeEntity.build(req.body) as unknown as ProtyModel;
        ProductypeEntity.findByPk(id).then(async r => {
            r["proty_name"] = Update.proty_name;
            r["updatedAt"] = new Date();
            let x = await r?.save();
            res.send(APIService.okRes(x, "updated Ok....!"));
        })

    }




}