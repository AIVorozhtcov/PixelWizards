import Character from './Character';

export default class CharacterInfo {
  character: Character;
  constructor(character: Character) {
    this.character = character;
  }

  drawShield(
    context: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number
  ) {
    context.beginPath();
    context.moveTo(x + width / 2, y + height);
    context.lineTo(x + width, y + height * 0.6);
    context.lineTo(x + width, y);
    context.lineTo(x, y);
    context.lineTo(x, y + height * 0.6);
    context.closePath();

    context.fillStyle = '#709CCB';
    context.fill();

    context.lineWidth = 2;
    context.strokeStyle = '#003366';
    context.stroke();

    const fontSize = 24;
    context.font = `bold ${fontSize}px Arial`;
    context.fillStyle = '#ffffff';
    context.textAlign = 'center';
    context.textBaseline = 'middle';

    const textX = x + width / 2;
    const textY = y + (height * 0.6 + height * 0.4) / 2;

    context.fillText(
      String(this.character.resist + this.character.tempResist),
      textX,
      textY
    );
  }

  drawHealthBar(
    context: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number
  ) {
    context.clearRect(x, y, width, height);

    const greenBarWidth =
      (this.character.hitPoints / this.character.initialHitPoints) * width;
    const redWidth = width - greenBarWidth;

    context.fillStyle = 'green';
    context.fillRect(x, y, greenBarWidth, height);

    context.fillStyle = 'red';
    context.fillRect(x + greenBarWidth, y, redWidth, height);

    context.fillStyle = 'black';
    context.textAlign = 'start';
    context.textBaseline = 'alphabetic';
    context.font = '18px Arial';
    context.fillText(String(this.character.hitPoints), x, y + 16);
  }
}
