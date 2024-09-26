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

export const seedThemes = async () => {
  try {
    const lightTheme = await Theme.findOne({ where: { theme: 'light' } });
    const darkTheme = await Theme.findOne({ where: { theme: 'dark' } });

    if (!lightTheme) {
      await Theme.create({ theme: 'light', description: 'Light theme' });
      console.log('Light theme created');
    }

    if (!darkTheme) {
      await Theme.create({ theme: 'dark', description: 'Dark theme' });
      console.log('Dark theme created');
    }
  } catch (err) {
    console.error('Error seeding themes:', err);
  }
};

export default Theme;
