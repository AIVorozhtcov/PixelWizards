import { toast } from 'sonner';
import forumApi from '../../api/fetchTransport/forumApi';
import Emoji from '../atoms/Emoji';

function EmojiList({
  abailableEmoji,
  setEmoji,
  id,
  handleShowAbailableEmoji,
}: {
  abailableEmoji: string[];
  id: number;
  setEmoji: React.Dispatch<React.SetStateAction<string>>;
  handleShowAbailableEmoji: () => void;
}) {
  const handleChangeCurrentEmoji = async (event: React.MouseEvent) => {
    if (
      event.target instanceof HTMLParagraphElement &&
      event.target.textContent
    ) {
      try {
        await forumApi.updateReaction({
          topicId: id,
          reaction: event.target.textContent,
        });

        setEmoji(event.target.textContent);
        handleShowAbailableEmoji();
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        }
      }
    }
  };

  return (
    <div
      className="cursor-pointer absolute bottom-0 -right-7 bg-yellow rounded bg-white border border-black"
      onClick={handleChangeCurrentEmoji}>
      {abailableEmoji.map(emoji => (
        <Emoji key={emoji} emoji={emoji} />
      ))}
    </div>
  );
}

export default EmojiList;
