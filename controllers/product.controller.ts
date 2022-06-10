import { Request, Response, NextFunction, response } from 'express';
import { dbConnection, ProductEntity, ProductypeEntity, UserEntity } from '../entities';
import { APIService } from '../services/api.service';
import { Json } from 'sequelize/types/lib/utils';
import { ProductModel } from '../entities/product.entity';
// import fs from 'fs';
import * as fs from 'fs';
import * as path from 'path'
import { b } from '../ss'


export class ProductController {

    static paths: string = path.join(__dirname, "../img/");
    constructor() {
        ProductController.paths = path.join(__dirname, "../img/");

    }





    static list(req: Request, res: Response) {
        // console.log("req::: => ", req.);

        try {
            const limit = req.query.limit ? Number(req.query.limit) : 5;
            const skip = req.query.skip ? Number(req.query.skip) : 0;
            ProductEntity.findAll({ limit, offset: skip * limit }).then(r => {

                const users = r.map((v) => {
                    const u = APIService.clone(v);
                    return u as ProductModel;
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




    static async listjoin2(req: Request, res: Response) {
        try {
            const limit = req.query.limit ? Number(req.query.limit) : 5;
            const skip = req.query.skip ? Number(req.query.skip) : 0;

            console.log('limit: ' + limit + ' skip: ' + skip);
            
            ProductypeEntity.hasMany(ProductEntity);
            ProductEntity.belongsTo(ProductypeEntity);

            UserEntity.hasMany(ProductEntity);
            ProductEntity.belongsTo(UserEntity);
            ProductEntity.findAndCountAll({ include: [ProductypeEntity, UserEntity], order: [['id', 'DESC']], limit: limit, offset: skip * limit}).then(r => {
                const x = r.rows.map((v) => {
                    const u = APIService.clone(v);
                    delete u['UserXYZ']?.password;
                    // u['image'] = ProductController.paths+u['image'];
                    return u as ProductModel;
                })


                res.send(APIService.okRes(x, '' + r.count));
            }).catch(e => {
                res.send(APIService.errRes("catch: ", e));
            })


            // ProductypeEntity.hasMany(ProductEntity);
            // ProductEntity.belongsTo(ProductypeEntity);
            // const users = await ProductEntity.findAndCountAll({include: ProductypeEntity});


            // ProductEntity.hasMany(ProductypeEntity);
            // ProductypeEntity.belongsTo(ProductEntity);
            // const users = await ProductEntity.findAll({include: ProductypeEntity});

            // console.log(JSON.stringify(users, null, 2));
            // res.send(APIService.okRes(users));



            // const [results, metadata] = await dbConnection.query("Select * from  public.tbproduct RIGHT OUTER JOIN  public.tbproducttype ON public.tbproduct.tbproducttypeId = public.tbproducttype.id");

            //   console.log(JSON.stringify(results, null, 2));
            // res.send(APIService.okRes(results));

        } catch (error) {
            console.log(error);
            res.send(APIService.errRes(error))

        }

    }




    static async selectTypeid(req: Request, res: Response) {
        try {


            ProductypeEntity.hasMany(ProductEntity);
            ProductEntity.belongsTo(ProductypeEntity);

            // UserEntity.hasMany(ProductEntity);
            // ProductEntity.belongsTo(UserEntity);

            // ProductEntity.findByPk(1).then(r => {

            //     res.send(APIService.okRes(r));
            // }).catch(e => {
            //     res.send(APIService.errRes("catch: ",e));
            // })
            const productType = await ProductypeEntity.findByPk(1);
            const product = await productType.getTbproducts();
            res.send(APIService.okRes(product));
            console.log(productType);

            // console.log(JSON.stringify(product, null, 2));

        } catch (error) {
            console.log(error);
            res.send(APIService.errRes(error))

        }

    }


    static Details(req: Request, res: Response) {
        try {
            const id: number = req.body.id;
            ProductypeEntity.hasMany(ProductEntity);
            ProductEntity.belongsTo(ProductypeEntity);

            ProductEntity.findByPk(id, { include: [ProductypeEntity] }).then(r => {
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


    static baseToBimg(base: string, id: string) {
        const imgSur = base.split("/")[1].split(";")[0];
        var base64Data = base.split("base64,")[1];
        //  this.paths = path.join(__dirname, "../img/");
        // const name =Math.random()+"."+imgSur;
        const name = "B" + id + "." + imgSur;

        // fs.writeFile(paths+name,base64Data,'base64',function(err: any){
        //   console.log(err);
        // });
        fs.writeFile(this.paths + name, base64Data, 'base64', (err) => {
            console.log('::==> ', err);

        })
        return name;
    }



    static async create(req: Request, res: Response) {

        try {
            const product = req.body as ProductModel;

            if (product) {


                dbConnection.transaction().then(transaction => {
                    // check exist product
                    ProductEntity.findOne({ where: { product_name: product.product_name }, transaction }).then(async r => {
                        if (r) {
                            await transaction.rollback();
                            res.send(APIService.errRes(`Product Name ${product.product_name} exist`));
                        } else {
                            ProductEntity.create(product).then(r => {
                                res.send(APIService.okRes(r, `created Product Name \'${product.product_name}\' Ok...!`));
                            }).catch(e => {
                                res.send(APIService.errRes(e));
                            })
                        }
                    })
                });
            } else {
                res.send(APIService.errRes('Paramater Empty'));
            }


        } catch (error) {
            res.send(APIService.errRes(error));
        }

    }


    static save(req: Request, res: Response) {

        let product = ProductEntity.build(req.body);
        delete product.id;



        dbConnection.transaction().then(transaction => {
            // check exist product
            ProductEntity.findOne({ where: { product_name: product.product_name.trim() }, transaction }).then(async r => {
                if (r) {
                    await transaction.rollback();
                    res.send(APIService.errRes(`Product Name ${product.product_name} exist`));
                } else {
                    product.image = ProductController.baseToBimg(product.image, Math.random().toString());
                    product.save().then(r => {
                        res.send({ status: 1, data: r });
                    }).catch(e => {
                        res.send({ status: 0, data: e });
                    });
                }
            })
        });

        // productEntity.create(product).then(r => {
        //     res.send({ status: 0, data: r });
        // }).catch(e => {
        //     res.send({ status: 0, data: e });
        // });
    }







    static delete(req: Request, res: Response) {
        let id = req.query.id + "";
        ProductEntity.findByPk(id).then(r => {

            try {

                fs.unlinkSync(ProductController.paths + r['image']);
                console.log("Successfully deleted the file.")
                let x = r?.destroy();
                res.send(APIService.okRes(x))
            } catch (err) {
                throw err
            }

        }).catch(e => {
            res.send(APIService.errRes(e))
        })
    }




    static update(req: Request, res: Response) {
        let id = req.query.id + "";
        let productUpdate = ProductEntity.build(req.body) as unknown as ProductModel;
        ProductEntity.findByPk(id).then(async r => {

            try {

                if (fs.existsSync(ProductController.paths + r['image'])) {
                    fs.unlinkSync(ProductController.paths + r['image']);
                    console.log("image:: proname: ", r.image, r.product_name);
                    console.log("Successfully deleted the file.")
                }

                r["product_name"] = productUpdate.product_name;
                r["price"] = productUpdate.price;
                r["qty"] = productUpdate.qty;
                r["image"] = ProductController.baseToBimg(productUpdate.image, Math.random().toString());
                r["tbproducttypeId"] = productUpdate.tbproducttypeId;
                r["UserXYZId"] = productUpdate.UserXYZId;
                r["updatedAt"] = new Date();
                let x = await r?.save();
                res.send(APIService.okRes(x, "updated Ok....!"));
            } catch (err) {
                console.log(err);
                res.send(APIService.errRes(err));

            }

        })

    }




}