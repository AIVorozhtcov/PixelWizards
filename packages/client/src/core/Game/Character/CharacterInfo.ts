import Dependent from '../DependentClass/Dependent';
import { CharacterState } from './Character';

export default class CharacterInfo extends Dependent<CharacterState> {
  constructor(state: CharacterState) {
    super(state);
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
      String(this.state.resist + this.state.tempResist),
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
      (this.state.hitPoints / this.state.initialHitPoints) * width;
    const redWidth = width - greenBarWidth;

    context.fillStyle = 'green';
    context.fillRect(x, y, greenBarWidth, height);

    context.fillStyle = 'red';
    context.fillRect(x + greenBarWidth, y, redWidth, height);

    context.fillStyle = 'black';
    context.textAlign = 'start';
    context.textBaseline = 'alphabetic';
    context.font = '18px Arial';
    context.fillText(String(this.state.hitPoints), x, y + 16);
  }
}
