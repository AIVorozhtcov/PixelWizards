import { Dispatch, SetStateAction } from 'react';
import Button from '../atoms/Button';
import Image from '../atoms/Image';
import Subtitle from '../atoms/Subtitle';
import Text from '../atoms/Text';

export default function StartGameScreen({
  setIsMapOpen,
}: {
  setIsMapOpen: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div className="p-3 h-full flex flex-col items-center justify-center gap-2 text-white">
      <Subtitle as="h2" className="text-3xl font-bold" variant="h2">
        Начало игры
      </Subtitle>
      <hr className="w-full lg:w-1/3" />
      <Subtitle as="h3" className="text-xl font-semibold" variant="h3">
        История
      </Subtitle>
      <Text className="text-justify lg:w-1/3">
        На планете под названием Капибария живет высокоразвитая цивилизация
        Капибар. Но случилось несчастье: главный ресурс апельсины заканчиваются,
        а без апельсинов все технологии капибар сломаются.
        <Image
          className="float-right size-1/3 lg:size-1/2 m-3 rounded-lg"
          src="/battles.webp"
        />
        Для решения этой проблемы была отправлена экспедиция в поисках
        апельсинов в других краях галактики. По ходу поиска экспедиция находит
        огромный астероид в форме апельсина. С помощью специальных сканеров
        капибары обнаруживают внутри астероида сеть из туннелей, которые ведут к
        центру самого астероида, который состоит из квинтиллионов апельсинов.
        <Image
          className="float-left size-1/4 lg:size-1/3 m-3 rounded-lg"
          src="/sneakEnemy.webp "
        />
        Экспедиция приземляется на астероид, находят вход в сеть туннелей и
        начинают свое исследование. По ходу прохождения туннелей капибары
        сталкиваются с их главными врагами - змеями. Героически сражаясь с ними,
        экспедиция доходит до ядра астероида и сталкивается с боссом -
        мать-Пито́ниха. Побеждая её, герои-капибары забирают с собой все
        апельсины и возвращаются домой.
      </Text>
      <Button
        className="w-full lg:w-1/3"
        variant="contained"
        onClick={() => setIsMapOpen(true)}>
        Старт
      </Button>
    </div>
  );
}
