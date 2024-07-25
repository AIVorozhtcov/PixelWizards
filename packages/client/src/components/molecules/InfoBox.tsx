import Subtitle from '../atoms/Subtitle';
import Text from '../atoms/Text';
import { ImageWithTextProps } from './ImageWithText';

export type InfoBoxProps = Pick<ImageWithTextProps, 'subtitle' | 'text'>;

export default function InfoBox({ subtitle, text }: InfoBoxProps) {
  return (
    <div className="grid gap-1">
      <Subtitle variant="h3" as="h3">
        {subtitle}
      </Subtitle>
      <Text>{text}</Text>
    </div>
  );
}
