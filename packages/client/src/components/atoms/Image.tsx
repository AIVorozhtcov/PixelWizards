type ImageProps = Record<string, unknown> &
  React.ImgHTMLAttributes<HTMLImageElement>;

const Image = (props: ImageProps) => {
  return <img {...props} />;
};

export default Image;
