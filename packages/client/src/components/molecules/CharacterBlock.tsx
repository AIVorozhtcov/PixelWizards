import { arrayOfImagesWithText } from '../../constants/arrayOfImagesWithText';
import ImageWithText from './ImageWithText';

export default function CharacterBlock() {
  return (
    <div className="mx-auto grid items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
      {arrayOfImagesWithText.map(item => (
        <ImageWithText key={item.text} {...item} />
      ))}
    </div>
  );
}
