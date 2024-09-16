import { Model, DataTypes } from 'sequelize';
import Topic from './topic';
import User from './user';
import { sequelize } from '../db';

class Comment extends Model {
  public id!: number;
  public content!: string;
  public userId!: number;
  public topicId!: number;
  public reaction: string | null = null;
}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    content: {
      type: new DataTypes.TEXT(),
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    topicId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    // reaction: {
    //   type: new DataTypes.STRING(),
    // },
  },
  {
    sequelize,
    modelName: 'comment',
  }
);

Comment.belongsTo(User, { foreignKey: 'userId' });
Comment.belongsTo(Topic, { foreignKey: 'topicId' });
export default Comment;
