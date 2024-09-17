// models/Reply.ts
import { sequelize } from '../db';
import { Model, DataTypes } from 'sequelize';
import User from './user';
import Comment from './comment';

class Reply extends Model {
  public id!: number;
  public content!: string;
  public userId!: number;
  public commentId!: number;
  public parentId?: number;
}

Reply.init(
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
    commentId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    parentId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'reply',
  }
);

Reply.belongsTo(User, { foreignKey: 'userId' });
Reply.belongsTo(Comment, { foreignKey: 'commentId' });
export default Reply;
