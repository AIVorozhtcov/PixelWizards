import { sequelize } from '../db';
import { Model, DataTypes } from 'sequelize';

class Theme extends Model {
  public id!: number;
  public theme!: string;
  public description!: string;
}

Theme.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    theme: {
      type: new DataTypes.TEXT(),
      allowNull: false,
      unique: true,
    },
    description: {
      type: new DataTypes.TEXT(),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'theme',
  }
);

export default Theme;
