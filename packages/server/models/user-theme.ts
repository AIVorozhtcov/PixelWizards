import { sequelize } from '../db';
import { Model, DataTypes } from 'sequelize';
import User from './user';
import Theme from './theme';

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
    themeName: {
      type: new DataTypes.TEXT(),
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

UserTheme.belongsTo(Theme, { foreignKey: 'themeName', targetKey: 'theme' });
UserTheme.belongsTo(User, { foreignKey: 'userId' });

export default UserTheme;
