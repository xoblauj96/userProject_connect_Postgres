

import { BuildOptions, DataTypes, DATE, Model, ModelAttributes, Sequelize } from "sequelize";
import { BaseModel } from "./base.model";
import * as bcryptjs from 'bcryptjs';
// Attribute
export interface MessageAttributes extends BaseModel {
    message:string;
    sender:number;
    receiver:number;
}
// Model
export interface MessageModel extends Model<MessageAttributes>, MessageAttributes {
    prototype: {
        validPassword: (password: string) => boolean;
        hashPassword: (password: string) => string;
    };
}
// Object
export class Message extends Model<MessageModel, MessageAttributes> {
    prototype: {
        validPassword: (password: string) => boolean;
        hashPassword: (password: string) => string;
    } | undefined;
}
// static Object
export type MessageStatic = typeof Model & {
    new(values?: object, options?: BuildOptions): MessageModel;
};
// Entity factory
export const MessageFactory = (name: string, sequelize: Sequelize): MessageStatic => {
    const attributes: ModelAttributes<MessageModel> = {
        id:{
            type: DataTypes.INTEGER,
            primaryKey:  true,
            unique: true,
            autoIncrement: true,
            autoIncrementIdentity: true,
            allowNull:false
        },
        isActive: {type:DataTypes.BOOLEAN,allowNull:false,defaultValue:true},
        message:{type:DataTypes.TEXT,allowNull:false},
        sender:{type:DataTypes.INTEGER,allowNull:false},
        receiver:{type:DataTypes.INTEGER,allowNull:false}
    } as ModelAttributes<MessageModel>;
    let x = sequelize.define(name, attributes, { tableName: name, freezeTableName: true });
    return x;
}
