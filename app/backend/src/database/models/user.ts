import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

class User extends Model {
  public id!: number;
  public username!: string;
  public role!: string;
  public email!: string;
  public password!: string;
}

User.init({
  id: {
    type: INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  username: STRING,
  role: STRING,
  email: STRING,
  password: STRING,
}, {
  sequelize: db,
  underscored: true,
  modelName: 'users',
  timestamps: false,
});

export default User;
