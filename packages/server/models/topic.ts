import { sequelize } from '../db';
import { Model, DataTypes } from 'sequelize';
import User from './user';

class Topic extends Model {
  public id!: number;
  public title!: string;
  public content!: string;
  public createdAt!: Date;
  public userId!: number;
}

Topic.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    content: {
      type: new DataTypes.TEXT(),
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'topic',
  }
);

Topic.belongsTo(User, { foreignKey: 'userId' });
export default Topic;
