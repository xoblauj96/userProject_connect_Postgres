import  * as express from 'express';
import { Request, Response, Application } from 'express';
// cors , body-parser
import * as cors from 'cors';
import * as bodyParser from 'body-parser';

import { DataTypes, Sequelize } from 'sequelize';
import { INTEGER } from 'sequelize';
import { ProductypeEntity, UserEntity, dbConnection, ProductEntity } from './entities';
import { UserController } from './controllers/user.controller';
import { ProductController} from './controllers/product.controller';
import { Product_type_Controller} from './controllers/product_type.controller';
import * as path from 'path'

let app: Application = express();
app.use(cors());
// app.use(express.json());
// app.use(express.json());
app.use(express.json({ 
    limit: '50mb'
  }));
  
  app.use(express.urlencoded({
    limit: '50mb',
    extended: true 
  }));

// app.use(bodyParser.json({limit: '50mb'}));
// app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

// app.use(express.static('public')); 

app.use('/img', express.static(path.join(__dirname, '/img')));
app.use(express.static(path.join(__dirname, '../myApp1/dist/myApp1')));
app.get('/*',(req:Request,res:Response) => res.sendFile(path.join(__dirname)))
console.log(path.join(__dirname));

// app.use(express.static('uploads'));

// app.use(express.static('public')); 
// app.use('/img', express.static('img'));


// test connection
dbConnection.authenticate().then(r => {
    console.log('connection to mysql ', r);
    // sync
    UserEntity.sync();
    ProductEntity.sync();
    ProductypeEntity.sync();




    // CRUD USER
    app.get('/userlist', UserController.checkAuthorize, UserController.GetUserList);
    app.post('/login', UserController.Login)
    app.post('/get-user-details', UserController.checkAuthorize, UserController.checkIsYourSelf, UserController.GetUserDetails);
    app.put('/admin/createUser', UserController.CheckAdminAuthorizeToken, UserController.CreateUser);
    app.patch('/reset-password', UserController.ResetPassword);
    app.post('/change-password', UserController.checkAuthorize, UserController.ChangePassword);
    app.delete("/delete", UserController.DeleteUser);
    app.patch("/UpdateUser", UserController.UpdateUser);



    // CRUD PRODUCT
    app.post("/product/list", UserController.checkAuthorize, ProductController.list);
    app.post("/product/listjoin2", ProductController.listjoin2);
    app.post("/product/create", ProductController.create);
    app.post("/product/save", ProductController.save);
    app.post("/product/update", ProductController.update);
    app.post("/product/delete", ProductController.delete);
    app.post("/product/detail", ProductController.Details);


 
    // CRUD PRODUCT
    app.post("/product_type/list", Product_type_Controller.list);
    app.post("/product_type/create", Product_type_Controller.create);
    app.post("/product_type/update", Product_type_Controller.update);
    app.post("/product_type/delete", Product_type_Controller.delete);
    app.post("/product_type/detail", Product_type_Controller.Details);


    app.post("/product_type/selectTypeid", ProductController.selectTypeid);
 

console.log("===> ",app);
 
    // start server   
    app.listen(8888, '0.0.0.0', () => {
        console.log('server start 0.0.0.0 port 8888')
    });
}).catch(e => {
    console.log('connetion error', e);

})