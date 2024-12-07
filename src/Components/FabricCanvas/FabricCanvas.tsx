import React, { useRef, useState, useLayoutEffect } from 'react';
import * as fabric from 'fabric';

interface CanvasSize {
  width: number;
  height: number;
}

const FabricCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [canvasSize, setCanvasSize] = useState<CanvasSize>({ width: 0, height: 0 });

  const fabricCanvasRef = useRef<fabric.Canvas | null>(null);

  const updateCanvasSize = () => {
    const parentWidth = containerRef.current?.offsetWidth || 0;
    const parentHeight = (parentWidth * 9) / 16; // Maintaining 16:9 aspect ratio
    setCanvasSize({ width: parentWidth, height: parentHeight });

    // Resize fabric canvas dynamically
    if (fabricCanvasRef.current) {
      fabricCanvasRef.current.setWidth(parentWidth);
      fabricCanvasRef.current.setHeight(parentHeight);
    }

    // Scale the rectangle based on new canvas size
    scaleRectangle(parentWidth, parentHeight);
  };

  const scaleRectangle = (canvasWidth: number, canvasHeight: number) => {
    if (fabricCanvasRef.current) {
      const rect = fabricCanvasRef.current.item(0); // Get the first object (rectangle)

      if (rect) {
        const rectWidthPercentage = 0.15; // 15% of the canvas width
        const rectHeightPercentage = 0.1; // 10% of the canvas height
        const rectPositionXPercentage = 0.1; // 10% of the canvas width from left
        const rectPositionYPercentage = 0.1; // 10% of the canvas height from top

        // Update rectangle size and position
        rect.set({
          width: canvasWidth * rectWidthPercentage,
          height: canvasHeight * rectHeightPercentage,
          left: canvasWidth * rectPositionXPercentage,
          top: canvasHeight * rectPositionYPercentage,
        });

        fabricCanvasRef.current.renderAll(); // Re-render canvas to apply changes
      }
    }
  };

  const createRectangle = (width: number, height: number, left: number, top: number, fillColor?: string, strokeColor?: string, strokeWidth?: number, opacity?: number, isDashed?: boolean, isdraggable?: boolean) => {
    if (fabricCanvasRef.current) {
      const rect = new fabric.Rect({
        left: left,
        top: top,
        fill: fillColor || 'transparent',
        width: width,
        height: height,
        stroke: strokeColor || 'black',
        strokeWidth: strokeWidth || 2,
        opacity: opacity || 1,
        isDashed: isDashed || false,
        isdraggable: isdraggable || false,
      });
      fabricCanvasRef.current.add(rect);
    }
  };

  const createRectangleWithText = (
    width: number,
    height: number,
    left: number,
    top: number,
    fillColor?: string,
    strokeColor?: string,
    strokeWidth?: number,
    text?: string,
    textColor?: string
  ) => {
    if (fabricCanvasRef.current) {
      // Create the rectangle
      const rect = new fabric.Rect({
        left: left,
        top: top,
        fill: fillColor || 'transparent',
        width: width,
        height: height,
        stroke: strokeColor || 'black',
        strokeWidth: strokeWidth || 2,
      });
  
      // Create the text
      const textObj = new fabric.Text(text || 'Default Text', {
        left: left + width / 2,
        top: top + height / 2,
        fontSize: 20,
        fill: textColor || 'black',
        originX: 'center', // Align text center horizontally
        originY: 'center', // Align text center vertically
      });
  
      // Group the rectangle and text together
      const group = new fabric.Group([rect, textObj], {
        left: left,
        top: top,
      });
  
      fabricCanvasRef.current.add(group);
    }
  };

  
  useLayoutEffect(() => {
    if (canvasRef.current && !fabricCanvasRef.current) {
      const canvas = new fabric.Canvas(canvasRef.current);
      fabricCanvasRef.current = canvas;

      createRectangle(150, 100, 100, 100);
      createRectangleWithText(150, 100, 100, 100);
    }

    updateCanvasSize();

    window.addEventListener('resize', updateCanvasSize);
    const resizeObserver = new ResizeObserver(updateCanvasSize);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      if (containerRef.current) {
        resizeObserver.disconnect();
      }
      if (fabricCanvasRef.current) {
        fabricCanvasRef.current.dispose();
        fabricCanvasRef.current = null;
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="w-[82%] h-full">
      <canvas
        ref={canvasRef}
        width={canvasSize.width}
        height={canvasSize.height}
        className="w-full h-full border border-border-color aspect-video"
      ></canvas>
    </div>
  );
};

export default FabricCanvas;
