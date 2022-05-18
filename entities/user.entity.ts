

import { BuildOptions, DataTypes, DATE, Model, ModelAttributes, Sequelize } from "sequelize";
import { BaseMemberModel } from "./basemember.model";
import * as bcryptjs from 'bcryptjs';
// Attribute
export interface UserAttributes extends BaseMemberModel {
    role: string;
}
// Model
export interface UserModel extends Model<UserAttributes>, UserAttributes {
    prototype: {
        validPassword: (password: string) => boolean;
        hashPassword: (password: string) => string;
    };
}

// Object

// export class User extends Model<UserModel, UserAttributes> {
//     prototype: {
//         validPassword: (password: string) => boolean;
//         hashPassword: (password: string) => string;
//     } | undefined;
// }




// static Object

export type UserStatic = typeof Model & { new(values?: object, options?: BuildOptions): UserModel; };

// Entity factory
export const UserFactory = (name: string, sequelize: Sequelize): UserStatic => {
    const attributes: ModelAttributes<UserModel> = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            unique: true,
            autoIncrement: true,
            autoIncrementIdentity: true,
            allowNull: false
        },
        userName: {
            type: DataTypes.STRING, allowNull: false, unique: true, validate: { len: { args: [3, 20], msg: 'Must be 3-20 digits' } }
        },
        password: {
            type: DataTypes.TEXT, allowNull: false
        },
        role: {
            type: DataTypes.STRING
        },
        isActive: {
            type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true
        },
        phoneNumber: {
            type: DataTypes.STRING, unique: true, allowNull: false, validate: { len: { args: [11, 13], msg: 'Must be 11-13 digits' } }
        },
    } as ModelAttributes<UserModel>;
 
    let x = sequelize.define(name, attributes, { tableName: name, freezeTableName: true });

    x.prototype.hashPassword = function (password: string): string {
        if (!password) return '';
        return this.password = bcryptjs.hashSync(password, bcryptjs.genSaltSync())
    }

    x.prototype.validPassword = function (password: string): boolean {
        if (bcryptjs.compareSync(password + this.userName + this.phoneNumber, this.password))
            return true;
        return false;
    }

    x.beforeCreate(async (user, options) => {
        if (user.changed('password')) {
            if (user.password && user.userName && user.phoneNumber) {
                const pass = user.password + user.userName + user.phoneNumber;
                return bcryptjs.hash(pass, bcryptjs.genSaltSync())
                    .then(hash => {
                        user.password = hash;
                    })
                    .catch(err => {
                        throw new Error(err);
                    });
            }
        }
    });

    x.beforeUpdate(async (user, options) => {
        if (user.changed('password')) {
            if (user.password && user.userName && user.phoneNumber) {
                return bcryptjs.hash(user.password + user.userName + user.phoneNumber, bcryptjs.genSaltSync())
                    .then(hash => {
                        user.password = hash;
                    })
                    .catch(err => {
                        throw new Error(err);
                    });
            }
        }
    });
    return x;
}
