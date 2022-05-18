

import { BuildOptions, DataTypes, DATE, Model, ModelAttributes, Sequelize } from "sequelize";
import { BaseMemberModel } from "./basemember.model";
import * as bcryptjs from 'bcryptjs';
import { BaseModel } from "./base.model";




// Attribute
export interface ProtyAttributes extends BaseModel {
    proty_name:string;
    proty_id: number;
}



// Model
export interface ProtyModel extends Model<ProtyAttributes>, ProtyAttributes {
    [x: string]: any;
  
}




// static Object
export type ProtyStatic = typeof Model & { new(values?: object, options?: BuildOptions): ProtyModel; };





// Entity factory
export const ProductypeFactory = (name: string, sequelize: Sequelize): ProtyStatic => {
    const attributes: ModelAttributes<ProtyModel> = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            unique: true,
            autoIncrement: true,
            autoIncrementIdentity: true,
            allowNull: false
        },
        proty_name: {
            type: DataTypes.STRING, allowNull: false, unique: true
        }
       
        
    } as ModelAttributes<ProtyModel>;
 


    let tbproduct_type = sequelize.define(name, attributes, { tableName: name, freezeTableName: true });
    return tbproduct_type;


}
