import { VariantProps, cva } from 'class-variance-authority';
import InfoBox from './InfoBox';

const imageWithTextVariants = cva('flex gap-1', {
  variants: {
    variant: {
      default: 'flex-col',
      textTop: 'flex-col-reverse',
      textLeft: 'flex-row',
      textRight: 'flex-row-reverse',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export interface ImageWithTextPropsCustom {
  imgSrc: string;
  imgAlt: string;
  subtitle: string;
  text: string;
}

interface ImageWithTextProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    ImageWithTextPropsCustom,
    VariantProps<typeof imageWithTextVariants> {
  children: React.ReactNode;
}

export default function ImageWithText({
  imgSrc,
  subtitle,
  text,
  imgAlt,
  variant,
  className,
}: ImageWithTextProps) {
  return (
    <div className={imageWithTextVariants({ variant, className })}>
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
