interface EmojiProps {
  emoji: string;
}

function Emoji({ emoji }: EmojiProps) {
  return <p>{emoji}</p>;
}

export default Emoji;
