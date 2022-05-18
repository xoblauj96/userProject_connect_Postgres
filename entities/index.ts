import { UserFactory } from './user.entity';
import {ProductypeFactory} from './product_type.entity';
import { ProductFactory} from './product.entity'
import { DataTypes, Sequelize } from 'sequelize';


// connection object
// export const dbConnection = new Sequelize('test2', 'root', '', {
//     host: 'localhost',
//     dialect: 'mysql'
// });

export enum EDB {
    dbhost = 'localhost',
    dbname = 'tbusermanager',
    dbuser = 'postgres',
    dbpass = '5martH67',
    dbdialect = 'postgres',
    dbport = '',
    timezone = '+07:00'
}



export const dbConnection = new Sequelize(
    EDB.dbname,
     EDB.dbuser,
     EDB.dbpass,
    {
        host: EDB.dbhost,
        port: 5432,
        dialect: EDB.dbdialect,
        timezone: EDB.timezone,
        logging: false
    });



export enum EntityPrifix {
    Users = 'UserXYZ',
    Messages = 'Message1234',
    Products="tbproduct",
    product_type="tbproducttype"
}
export const queryInterface = dbConnection.getQueryInterface();
// queryInterface.renameColumn(EntityPrifix.Products,'proty_id','tbproducttypeId')
// queryInterface.removeColumn(EntityPrifix.product_type, 'proty_id', { /* query options */ });
// queryInterface.addColumn(EntityPrifix.Products, 'UserXYZId', { type: DataTypes.INTEGER });

// fix entities
export const UserEntity = UserFactory(EntityPrifix.Users, dbConnection);
export const ProductEntity = ProductFactory(EntityPrifix.Products, dbConnection);
export const ProductypeEntity = ProductypeFactory(EntityPrifix.product_type, dbConnection);

// UserEntity.sync();



