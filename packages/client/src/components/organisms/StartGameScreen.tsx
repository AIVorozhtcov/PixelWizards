import Button from '../atoms/Button';

export default function StartGameScreen({
  startGame,
}: {
  startGame: () => void;
}) {
  return (
    <div className="p-3 min-h-dvh flex flex-col items-center justify-center gap-2 text-white">
      <h2 className="text-3xl font-bold">Начало игры</h2>
      <hr className="w-full lg:w-1/3" />
      <h3 className="text-xl font-semibold">История</h3>
      <p className="text-justify lg:w-1/3">
        На планете под названием Капибария живет высокоразвитая цивилизация
        Капибар. Но случилось несчастье: главный ресурс апельсины заканчиваются,
        а без апельсинов все технологии капибар сломаются.
        <img
          className="float-right size-1/3 lg:size-1/2 m-3 rounded-lg"
          src="/battles.webp"
        />
        Для решения этой проблемы была отправлена экспедиция в поисках
        апельсинов в других краях галактики. По ходу поиска экспедиция находит
        огромный астероид в форме апельсина. С помощью специальных сканеров
        капибары обнаруживают внутри астероида сеть из туннелей, которые ведут к
        центру самого астероида, который состоит из квинтиллионов апельсинов.
        <img
          className="float-left size-1/4 lg:size-1/3 m-3 rounded-lg"
          src="/sneakEnemy.webp "
        />
        Экспедиция приземляется на астероид, находят вход в сеть туннелей и
        начинают свое исследование. По ходу прохождения туннелей капибары
        сталкиваются с их главными врагами - змеями. Героически сражаясь с ними,
        экспедиция доходит до ядра астероида и сталкивается с боссом -
        мать-Пито́ниха. Побеждая её, герои-капибары забирают с собой все
        апельсины и возвращаются домой.
      </p>
      <Button
        className="w-full lg:w-1/3"
        variant="contained"
        onClick={startGame}>
        Старт
      </Button>
    </div>
  );
}
