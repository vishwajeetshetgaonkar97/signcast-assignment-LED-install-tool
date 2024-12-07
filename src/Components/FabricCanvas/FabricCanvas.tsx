import React, { useRef, useEffect, useState, useContext } from 'react';
import * as fabric from 'fabric';
import ScreenMFRDataContext from '../../Contexts/ScreenMFRDataContext';
import SelectedConfigurationContext from '../../Contexts/SelectedConfigurationContext';

const ScalableRectangleCanvas: React.FC = () => {
  const { screenMFRData } = useContext(ScreenMFRDataContext);
  const { selectedConfiguration, setSelectedConfiguration } = useContext(SelectedConfigurationContext);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fabricCanvasRef = useRef<fabric.Canvas | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 450 });
  const [rectangles, setRectangles] = useState<fabric.Group[]>([]);

  const [selectedConfigurationValues, setSelectedConfigurationValues] = useState({
    mediaPlayerMFR: selectedConfiguration.mediaPlayerMFR || null,
    mount: selectedConfiguration.mount || null,
    receptacleBox: selectedConfiguration.receptacleBox || null,
    screenMFR: selectedConfiguration.screenMFR || null,
  });

  useEffect(() => {
    setSelectedConfigurationValues({
      mediaPlayerMFR: selectedConfiguration.mediaPlayerMFR || null,
      mount: selectedConfiguration.mount || null,
      receptacleBox: selectedConfiguration.receptacleBox || null,
      screenMFR: selectedConfiguration.screenMFR || null,
    });
  }, [selectedConfiguration]);

  // Function to create the outer border with text and draggable option
  const createOutterBorder = (
    rectX: number, 
    rectY: number, 
    rectWidth: number, 
    rectHeight: number, 
    strokeColor: string = 'black', 
    strokeWidth: number = 2,
    isDotted: boolean = false, 
    text: string | number = '', 
    textColor: string = 'black', 
    isDraggable: boolean = true
  ): fabric.Group => {
    const rect = new fabric.Rect({
      left: rectX,
      top: rectY,
      width: rectWidth,
      height: rectHeight,
      fill: 'transparent',
      stroke: strokeColor,
      strokeWidth: strokeWidth,
      strokeDashArray: isDotted ? [5, 5] : [],
    });

    const textObj = new fabric.Text(String(text), { // Convert text to string
      fontSize: Math.min(rectWidth, rectHeight) * 0.2,
      fill: textColor,
      originX: 'center',
      originY: 'center',
      left: rectX + rectWidth / 2,
      top: rectY + rectHeight / 2,
    });
    
    const group = new fabric.Group([rect, textObj], {
      left: rectX,
      top: rectY,
      selectable: true,
      hasControls: isDraggable,
      lockMovementX: !isDraggable,
      lockMovementY: !isDraggable,
    });

    return group;
  };

  // Update canvas size dynamically
  const updateCanvasSize = () => {
    if (containerRef.current) {
      const parentWidth = containerRef.current.offsetWidth;
      const parentHeight = (parentWidth * 9) / 16; // Maintain 16:9 aspect ratio
      setCanvasSize({ width: parentWidth, height: parentHeight });

      if (fabricCanvasRef.current) {
        fabricCanvasRef.current.setWidth(parentWidth);
        fabricCanvasRef.current.setHeight(parentHeight);

        // Rescale the rectangles when the canvas resizes
        rectangles.forEach((rectangle) => {
          const rectWidth = parentWidth * 0.3; // 30% of canvas width
          const rectHeight = parentHeight * 0.2; // 20% of canvas height
          const rectX = parentWidth * 0.1; // 10% of canvas width
          const rectY = parentHeight * 0.1; // 10% of canvas height

          const rect = rectangle.item(0) as fabric.Rect;
          const text = rectangle.item(1) as fabric.Text;

          rect.set({ width: rectWidth, height: rectHeight, left: rectX, top: rectY });
          text.set({
            left: rectX + rectWidth / 2,
            top: rectY + rectHeight / 2,
            fontSize: Math.min(rectWidth, rectHeight) * 0.2,
          });

          rectangle.set({ left: rectX, top: rectY });

          fabricCanvasRef.current?.requestRenderAll();
        });
      }
    }
  };

  const createRectangles = () => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;

    const { width, height } = canvasSize;

    const rectWidth = width * 0.3; // 30% of canvas width
    const rectHeight = height * 0.2; // 20% of canvas height
    const rectX = width * 0.1; // 10% of canvas width
    const rectY = height * 0.1; // 10% of canvas height

    // Create rectangles with different options
    const rect1 = createOutterBorder(
      rectX, rectY, rectWidth, rectHeight, 'blue', 3, false, 'Rectangle 1', 'white', true
    );

    // For rect2, display the Height of selectedConfigurationValues.screenMFR
    const rect2Text = selectedConfigurationValues.screenMFR?.Height || 'No Height Data';
    const rect2 = createOutterBorder(
      rectX + rectWidth + 20, rectY + 100, rectWidth, rectHeight, 'green', 2, true, rect2Text, 'yellow', false
    );

    // Add them to the canvas
    canvas.add(rect1);
    canvas.add(rect2);

    setRectangles([rect1, rect2]);
  };

  useEffect(() => {
    // Initialize Fabric.js canvas
    if (canvasRef.current && !fabricCanvasRef.current) {
      fabricCanvasRef.current = new fabric.Canvas(canvasRef.current);
      createRectangles();
    }

    // Handle resizing
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      if (fabricCanvasRef.current) {
        fabricCanvasRef.current.dispose();
        fabricCanvasRef.current = null;
      }
    };
  }, [canvasSize, selectedConfigurationValues]);

  return (
    <div ref={containerRef} style={{ width: '100%', height: 'auto' }}>
      <canvas
        ref={canvasRef}
        width={canvasSize.width}
        height={canvasSize.height}
        style={{ border: '1px solid black', width: '100%' }}
      />
    </div>
  );
};

export default ScalableRectangleCanvas;
