import { useCallback, useState } from 'react';
import { ITopicMessages } from '../../types';
import Emoji from '../atoms/Emoji';
import EmojiList from './EmojiList';

function Message({ id, text, reactions }: ITopicMessages) {
  const [emoji, setEmoji] = useState(reactions.current ?? '➕');
  const [showAvailableEmoji, setShowAvailableEmoji] = useState(false);

  const handleShowAbailableEmoji = useCallback(() => {
    setShowAvailableEmoji(prev => !prev);
  }, []);

  return (
    <div className="relative w-fit flex p-2 bg-[#42AAFF] rounded-xl text-white">
      <p>{text}</p>
      <div
        className="w-[20px] h-[20px] leading-none text-xs flex items-center justify-center absolute border border-black rounded-xl bg-white text-black -right-1 -bottom-2 cursor-pointer"
        onClick={handleShowAbailableEmoji}>
        <Emoji emoji={emoji} />
      </div>
      {showAvailableEmoji && (
        <EmojiList
          abailableEmoji={reactions.available}
          setEmoji={setEmoji}
          id={id}
          handleShowAbailableEmoji={handleShowAbailableEmoji}
        />
      )}
    </div>
  );
}

export default Message;
