import React, { useRef, useEffect, useState, useContext } from 'react';
import * as fabric from 'fabric';
import ScreenMFRDataContext from '../../Contexts/ScreenMFRDataContext';
import SelectedConfigurationContext from '../../Contexts/SelectedConfigurationContext';
import AdditionalConfigurationContext from '../../Contexts/AdditionalConfigurationContext';

const FabricCanvas: React.FC = () => {
  const { screenMFRData } = useContext(ScreenMFRDataContext);
  const { selectedConfiguration, setSelectedConfiguration } = useContext(SelectedConfigurationContext);
  const { additionalConfiguration, setAdditionalConfiguration } = useContext(AdditionalConfigurationContext);


  const borderColor = "rgba(0, 0, 0, 0.6)";
  const headingTextColor = "rgba(0, 0, 0, 0.8)";
  const textColor = "rgba(0, 0, 0,0.9)";
  const fillColor = "rgba(0, 0, 0, 0.4)";
  const cardBorderColor = "rgba(0, 0, 0, 0.5)";
  const cardTextColor = "rgba(255, 255, 255,0.8)";
  const highlightFillColor = "rgba(255, 255, 255, 0.5)";

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fabricCanvasRef = useRef<fabric.Canvas | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 450 });
  const [screenDimensionBox, setScreenDimensionBox] = useState<fabric.Group[]>([]);
  const [nicheDimensionBox, setNicheDimensionBox] = useState<fabric.Group[]>([]);

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

  // Define an interface for the rectangle options
  interface RectangleOptions {
    rectX: number;
    rectY: number;
    rectWidth: number;
    rectHeight: number;
    strokeColor?: string;
    strokeWidth?: number;
    isDotted?: boolean;
    text?: string | number;
    textColor?: string;
    isDraggable?: boolean;
    fontWeight?: string | number;
    scaleFactor?: number;
    textOriginX?: string;
    fillColor?: string;
  }

  // Function to create the outer border with text and draggable option
  const createDynamicRectangle = ({
    rectX,
    rectY,
    rectWidth,
    rectHeight,
    strokeColor = 'transparent',
    fillColor = 'transparent',
    strokeWidth = 2,
    isDotted = false,
    text = '',
    textColor = 'transparent',
    isDraggable = true,
    fontWeight = 'normal',
    scaleFactor = 1,
    textOriginX = 'center',
  }: RectangleOptions): fabric.Group => {

    const rect = new fabric.Rect({
      left: rectX,
      top: rectY,
      width: rectWidth,
      height: rectHeight,
      fill: fillColor,
      stroke: strokeColor,
      strokeWidth: strokeWidth,
      strokeDashArray: isDotted ? [5, 5] : [],
    });

    console.log("valueeeeee", textOriginX)
    const textObj = new fabric.Text(String(text), {
      fontSize: Math.min(rectWidth, rectHeight) * 0.2,
      fill: textColor,
      originX: textOriginX,
      originY: 'center',
      left: rectX + rectWidth / 2,
      top: rectY + rectHeight / 2,
      fontWeight: fontWeight,
      scaleX: scaleFactor,
      scaleY: scaleFactor,
      fontFamily: 'Poppins',

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

        screenDimensionBox.forEach((element) => {
          const rectWidth = parentWidth * 0.3;
          const rectHeight = parentHeight * 0.2;
          const rectX = parentWidth * 0.1;
          const rectY = parentHeight * 0.1;

          const rect = element.item(0) as fabric.Rect;
          const text = element.item(1) as fabric.Text;

          rect.set({ width: rectWidth, height: rectHeight, left: rectX, top: rectY });
          text.set({
            left: rectX + rectWidth / 2,
            top: rectY + rectHeight / 2,
            fontSize: Math.min(rectWidth, rectHeight) * 0.2,
          });

          element.set({ left: rectX, top: rectY });

          fabricCanvasRef.current?.requestRenderAll();
        });

        nicheDimensionBox.forEach((element) => {
          const rectWidth = parentWidth * 0.3;
          const rectHeight = parentHeight * 0.2;
          const rectX = parentWidth * 0.1;
          const rectY = parentHeight * 0.1;

          const rect = element.item(0) as fabric.Rect;
          const text = element.item(1) as fabric.Text;

          rect.set({ width: rectWidth, height: rectHeight, left: rectX, top: rectY });
          text.set({
            left: rectX + rectWidth / 2,
            top: rectY + rectHeight / 2,
            fontSize: Math.min(rectWidth, rectHeight) * 0.2,
          });

          element.set({ left: rectX, top: rectY });

          fabricCanvasRef.current?.requestRenderAll();
        });

      }
    }
  };


  const createNicheDimensionBox = () => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;

    const { width, height } = canvasSize;

    const rectWidth = width * 0.19;
    const rectHeight = height * 0.24;
    const rectX = width * 0.595;
    const rectY = height * 0.03;

    const outerBorder = createDynamicRectangle({
      rectX,
      rectY,
      rectWidth,
      rectHeight,
      strokeColor: borderColor,
      strokeWidth: 1,
    });

    const headingText = 'Niche Dimensions:';
    const headingTextContainer = createDynamicRectangle({
      rectX: rectX * 1.013,
      rectY: rectY * 1.2,
      rectWidth: rectWidth * 0.6,
      rectHeight: height * 0.06,
      text: headingText,
      textColor: headingTextColor,
      scaleFactor: 1.95,
      fontWeight: '600',
      textOriginX: 'right',
    });

    const screenHeightText = 'Height';
    const screenHeightTextContainer = createDynamicRectangle({
      rectX: rectX * 1.014,
      rectY: rectY * 3.2,
      rectWidth: rectWidth * 0.452,
      rectHeight: height * 0.04,
      strokeColor: cardBorderColor,
      fillColor: fillColor,
      strokeWidth: 1,
      text: screenHeightText,
      textColor: cardTextColor,
      scaleFactor: 1.9,
    });

    const screenHeightValue = selectedConfigurationValues.screenMFR ? selectedConfigurationValues.screenMFR.Height : '0';
    const screenHeightValueContainer = createDynamicRectangle({
      rectX: rectX * 1.159,
      rectY: rectY * 3.2,
      rectWidth: rectWidth * 0.452,
      rectHeight: height * 0.04,
      strokeColor: cardBorderColor,
      strokeWidth: 1,
      text: screenHeightValue,
      textColor: textColor,
      scaleFactor: 1.9,
    });


    const screenWidthText = 'Width';
    const screenWidthTextContainer = createDynamicRectangle({
      rectX: rectX * 1.014,
      rectY: rectY * 5,
      rectWidth: rectWidth * 0.452,
      rectHeight: height * 0.04,
      strokeColor: cardBorderColor,
      fillColor: fillColor,
      strokeWidth: 1,
      text: screenWidthText,
      textColor: cardTextColor,
      scaleFactor: 1.9,
    });

    const screenWidthValue = selectedConfigurationValues.screenMFR ? selectedConfigurationValues.screenMFR.Width : '0';
    const screenWidthValueContainer = createDynamicRectangle({
      rectX: rectX * 1.159,
      rectY: rectY * 5,
      rectWidth: rectWidth * 0.452,
      rectHeight: height * 0.04,
      strokeColor: cardBorderColor,
      strokeWidth: 1,
      text: screenWidthValue,
      textColor: textColor,
      scaleFactor: 1.9,
    });

    const floorLineText = 'Depth';
    const floorLineTextContainer = createDynamicRectangle({
      rectX: rectX * 1.014,
      rectY: rectY * 6.8,
      rectWidth: rectWidth * 0.452,
      rectHeight: height * 0.04,
      strokeColor: cardBorderColor,
      fillColor: fillColor,
      strokeWidth: 1,
      text: floorLineText,
      textColor: cardTextColor,
      scaleFactor: 1.9,
      fontWeight: 'normal'
    });

    const floorLineValue = additionalConfiguration.distanceFromFloor ? additionalConfiguration.distanceFromFloor : '0';
    const floorLineValueContainer = createDynamicRectangle({
      rectX: rectX * 1.159,
      rectY: rectY * 6.8,
      rectWidth: rectWidth * 0.452,
      rectHeight: height * 0.04,
      strokeColor: cardBorderColor,
      strokeWidth: 1,
      text: floorLineValue,
      textColor: textColor,
      scaleFactor: 1.9,
      fontWeight: 'normal'
    });


    canvas.add(outerBorder);
    canvas.add(headingTextContainer);
    canvas.add(screenHeightTextContainer);
    canvas.add(screenHeightValueContainer);
    canvas.add(screenWidthTextContainer);
    canvas.add(screenWidthValueContainer);
    canvas.add(floorLineTextContainer);
    canvas.add(floorLineValueContainer);

    setNicheDimensionBox([outerBorder, headingTextContainer, screenHeightTextContainer]);
  };


  const createScreenDimensionBox = () => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;

    const { width, height } = canvasSize;

    const rectWidth = width * 0.19;
    const rectHeight = height * 0.24;
    const rectX = width * 0.795;
    const rectY = height * 0.03;

    const outerBorder = createDynamicRectangle({
      rectX,
      rectY,
      rectWidth,
      rectHeight,
      strokeColor: borderColor,
      strokeWidth: 1,
    });

    const headingText = 'Screen Dimensions:';
    const headingTextContainer = createDynamicRectangle({
      rectX: rectX * 1.01,
      rectY: rectY * 1.2,
      rectWidth: rectWidth * 0.6,
      rectHeight: height * 0.06,
      text: headingText,
      textColor: headingTextColor,
      scaleFactor: 1.95,
      fontWeight: '600',
      textOriginX: 'right',
    });

    const screenHeightText = 'Height';
    const screenHeightTextContainer = createDynamicRectangle({
      rectX: rectX * 1.011,
      rectY: rectY * 3.2,
      rectWidth: rectWidth * 0.452,
      rectHeight: height * 0.04,
      strokeColor: cardBorderColor,
      fillColor: fillColor,
      strokeWidth: 1,
      text: screenHeightText,
      textColor: cardTextColor,
      scaleFactor: 1.9,
    });

    const screenHeightValue = selectedConfigurationValues.screenMFR ? selectedConfigurationValues.screenMFR.Height : '0';
    const screenHeightValueContainer = createDynamicRectangle({
      rectX: rectX * 1.12,
      rectY: rectY * 3.2,
      rectWidth: rectWidth * 0.452,
      rectHeight: height * 0.04,
      strokeColor: cardBorderColor,
      strokeWidth: 1,
      text: screenHeightValue,
      textColor: textColor,
      scaleFactor: 1.9,
    });


    const screenWidthText = 'Width';
    const screenWidthTextContainer = createDynamicRectangle({
      rectX: rectX * 1.011,
      rectY: rectY * 5,
      rectWidth: rectWidth * 0.452,
      rectHeight: height * 0.04,
      strokeColor: cardBorderColor,
      fillColor: fillColor,
      strokeWidth: 1,
      text: screenWidthText,
      textColor: cardTextColor,
      scaleFactor: 1.9,
    });

    const screenWidthValue = selectedConfigurationValues.screenMFR ? selectedConfigurationValues.screenMFR.Width : '0';
    const screenWidthValueContainer = createDynamicRectangle({
      rectX: rectX * 1.12,
      rectY: rectY * 5,
      rectWidth: rectWidth * 0.452,
      rectHeight: height * 0.04,
      strokeColor: cardBorderColor,
      strokeWidth: 1,
      text: screenWidthValue,
      textColor: textColor,
      scaleFactor: 1.9,
    });

    const floorLineText = 'Floor Line';
    const floorLineTextContainer = createDynamicRectangle({
      rectX: rectX * 1.011,
      rectY: rectY * 6.8,
      rectWidth: rectWidth * 0.452,
      rectHeight: height * 0.04,
      strokeColor: cardBorderColor,
      fillColor: fillColor,
      strokeWidth: 1,
      text: floorLineText,
      textColor: cardTextColor,
      scaleFactor: 1.9,
      fontWeight: 'normal'
    });

    const floorLineValue = additionalConfiguration.distanceFromFloor ? additionalConfiguration.distanceFromFloor : '0';
    const floorLineValueContainer = createDynamicRectangle({
      rectX: rectX * 1.12,
      rectY: rectY * 6.8,
      rectWidth: rectWidth * 0.45,
      rectHeight: height * 0.04,
      strokeColor: cardBorderColor,
      strokeWidth: 1,
      text: floorLineValue,
      textColor: textColor,
      scaleFactor: 1.9,
      fontWeight: 'normal'
    });


    canvas.add(outerBorder);
    canvas.add(headingTextContainer);
    canvas.add(screenHeightTextContainer);
    canvas.add(screenHeightValueContainer);
    canvas.add(screenWidthTextContainer);
    canvas.add(screenWidthValueContainer);
    canvas.add(floorLineTextContainer);
    canvas.add(floorLineValueContainer);

    setScreenDimensionBox([outerBorder, headingTextContainer, screenHeightTextContainer]);
  };

  useEffect(() => {
    // Initialize Fabric.js canvas
    if (canvasRef.current && !fabricCanvasRef.current) {
      fabricCanvasRef.current = new fabric.Canvas(canvasRef.current);

      // Set Poppins as the default font for all Fabric.js text elements
      fabric.Text.prototype.fontFamily = 'Poppins';

      createScreenDimensionBox();
      createNicheDimensionBox();
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
  }, [canvasSize]);

  return (
    <div ref={containerRef} className='h-full w-full'>
      <canvas
        ref={canvasRef}
        width={canvasSize.width}
        height={canvasSize.height}
        className='border border-border-color h-full w-full'
      />
    </div>
  );
};

export default FabricCanvas;
