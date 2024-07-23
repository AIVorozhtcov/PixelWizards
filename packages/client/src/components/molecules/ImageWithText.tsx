import InfoBox from './InfoBox';

export interface ImageWithTextProps {
  imgSrc: string;
  imgAlt: string;
  subtitle: string;
  text: string;
}

export default function ImageWithText({
  imgSrc,
  subtitle,
  text,
  imgAlt,
}: ImageWithTextProps) {
  return (
    <div className="grid gap-1">
      <img
        src={imgSrc}
        width="300"
        height="300"
        alt={imgAlt}
        className="mx-auto aspect-square overflow-hidden rounded-xl object-cover"
      />
      <InfoBox text={text} subtitle={subtitle} />
    </div>
  );
}
