import Span from '../atoms/Span';

type ProfileListItemProps = {
  title: string;
  data: string;
} & React.HTMLAttributes<HTMLDivElement>;

const ProfileListItem = ({ title, data }: ProfileListItemProps) => {
  return (
    <div className="flex flex-row justify-between border-b pt-1 pb-1 pr-2">
      <Span>{title}</Span>
      <Span>{data}</Span>
    </div>
  );
};

export default ProfileListItem;
