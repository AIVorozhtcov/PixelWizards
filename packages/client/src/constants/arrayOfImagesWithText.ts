import { ImageWithTextProps } from '../components/molecules/ImageWithText';
import CapitanCapibara from '../../public/capCapibara.webp';
import Sneak from '../../public/sneakEnemy.webp';
import Mechanic from '../../public/mechanicCapibara.webp';

export const arrayOfImagesWithText: ImageWithTextProps[] = [
  {
    imgSrc: CapitanCapibara,
    imgAlt: 'Capybara Character',
    subtitle: 'Captain Capybara',
    text: 'The fearless leader of the Capybara Crusaders, skilled in both combat and strategy.',
  },
  {
    imgSrc: Sneak,
    imgAlt: 'Snake Character',
    subtitle: 'Slithering Serpent',
    text: 'The cunning and devious leader of the Snake Syndicate, always plotting their next move.',
  },
  {
    imgSrc: Mechanic,
    imgAlt: 'Mechanic Character',
    subtitle: 'Gadget Guru',
    text: 'The brilliant mechanic who keeps the Capybara Crusaders ships and weapons in top shape.',
  },
];
