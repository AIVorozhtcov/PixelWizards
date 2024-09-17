import { Model, DataTypes } from 'sequelize';
import User from './user';
import { sequelize } from '../db';

class UserTheme extends Model {
  public id!: number;
  public theme!: string;
  public userId!: number;
}

UserTheme.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    theme: {
      type: new DataTypes.TEXT(),
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'user-theme',
  }
);

UserTheme.belongsTo(User, { foreignKey: 'userId' });
export default UserTheme;
