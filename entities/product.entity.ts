

import { BuildOptions, DataTypes, DATE, Model, ModelAttributes, Sequelize } from "sequelize";
import { BaseMemberModel } from "./basemember.model";
import * as bcryptjs from 'bcryptjs';
import { BaseModel } from "./base.model";
// Attribute
export interface ProductAttributes extends BaseModel {
    product_name:string;
    price:number;
    qty:number;
    image:string;
    tbproducttypeId: number;
    UserXYZId:number;
}
// Model
export interface ProductModel extends Model<ProductAttributes>, ProductAttributes {
  
}



// static Object

export type ProductStatic = typeof Model & { new(values?: object, options?: BuildOptions): ProductModel; };

// Entity factory
export const ProductFactory = (name: string, sequelize: Sequelize): ProductStatic => {
    const attributes: ModelAttributes<ProductModel> = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            unique: true,
            autoIncrement: true,
            autoIncrementIdentity: true,
            allowNull: false
        },
        product_name: {
            type: DataTypes.STRING, allowNull: false, unique: true
        },
        price: {
            type: DataTypes.INTEGER, allowNull: false
        },
        qty: {
            type: DataTypes.INTEGER
        },
        image: {
            type: DataTypes.TEXT, allowNull: false
        },
        tbproducttypeId: {
            type: DataTypes.INTEGER
        },
        UserXYZId:{ type: DataTypes.INTEGER }
        
    } as ModelAttributes<ProductModel>;
 
    let tbproduct = sequelize.define(name, attributes, { tableName: name, freezeTableName: true });

    
    return tbproduct;
}
