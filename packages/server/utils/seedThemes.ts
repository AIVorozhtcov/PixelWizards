import Theme from '../models/theme';

export const seedThemes = async () => {
  try {
    const lightTheme = await Theme.findOne({ where: { theme: 'light' } });
    const darkTheme = await Theme.findOne({ where: { theme: 'dark' } });

    if (!lightTheme) {
      await Theme.create({ theme: 'light', description: 'Light theme' });
    }

    if (!darkTheme) {
      await Theme.create({ theme: 'dark', description: 'Dark theme' });
    }
  } catch (err) {
    console.error('Error seeding themes:', err);
  }
};
