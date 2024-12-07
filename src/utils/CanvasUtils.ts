import * as fabric from 'fabric';

export interface RectangleOptions {
  widthPercentage: number; // Percentage of canvas width
  heightPercentage: number; // Percentage of canvas height
  leftPercentage: number; // Percentage of canvas width for x position
  topPercentage: number; // Percentage of canvas height for y position
  fillColor?: string;
  strokeColor?: string;
  strokeWidth?: number;
  opacity?: number;
  isDraggable?: boolean;
  text?: string; // Optional text to display in the center
  textColor?: string;
}

export const createRectangle = (
  fabricCanvas: fabric.Canvas,
  canvasWidth: number,
  canvasHeight: number,
  options: RectangleOptions
) => {
  const rectWidth = canvasWidth * options.widthPercentage;
  const rectHeight = canvasHeight * options.heightPercentage;
  const rectLeft = canvasWidth * options.leftPercentage;
  const rectTop = canvasHeight * options.topPercentage;

  // Create rectangle
  const rect = new fabric.Rect({
    left: rectLeft,
    top: rectTop,
    width: rectWidth,
    height: rectHeight,
    fill: options.fillColor || 'transparent',
    stroke: options.strokeColor || 'black',
    strokeWidth: options.strokeWidth || 2,
    opacity: options.opacity || 1,
    selectable: options.isDraggable || false,
  });

  // Create text if provided
  if (options.text) {
    const textObj = new fabric.Text(options.text, {
      left: rectLeft + rectWidth / 2,
      top: rectTop + rectHeight / 2,
      fontSize: 20,
      fill: options.textColor || 'black',
      originX: 'center',
      originY: 'center',
    });

    const group = new fabric.Group([rect, textObj], {
      left: rectLeft,
      top: rectTop,
    });

    fabricCanvas.add(group);
  } else {
    fabricCanvas.add(rect);
  }
};
