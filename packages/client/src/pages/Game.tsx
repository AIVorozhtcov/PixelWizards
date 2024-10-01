import MainSection from '../components/atoms/MainSection';
import GameWrapper from '../templates/Game/GameWrapper';

export default function Game() {
  return (
    <MainSection className="h-[calc(100%-3.5rem)] overflow-hidden">
      <GameWrapper />
    </MainSection>
  );
}
