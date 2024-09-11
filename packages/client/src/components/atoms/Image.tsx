const Image = (
  props: Record<string, unknown> & React.ImgHTMLAttributes<HTMLImageElement>
) => {
  return <img {...props} />;
};

export default Image;
