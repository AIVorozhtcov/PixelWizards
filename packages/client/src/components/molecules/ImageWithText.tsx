import { VariantProps, cva } from 'class-variance-authority';
import InfoBox from './InfoBox';
import { cn } from './../../lib/utils';
import { ImageWithTextPropsCustom } from '../../types';

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

interface ImageWithTextProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    ImageWithTextPropsCustom,
    VariantProps<typeof imageWithTextVariants> {}

export default function ImageWithText({
  imgSrc,
  subtitle,
  text,
  imgAlt,
  variant,
  className,
}: ImageWithTextProps) {
  return (
    <div className={cn(imageWithTextVariants({ variant }), className)}>
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
