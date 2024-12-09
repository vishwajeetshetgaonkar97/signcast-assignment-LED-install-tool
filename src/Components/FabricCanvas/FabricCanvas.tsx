import React, { useRef, useEffect, useState, useContext } from 'react';
import * as fabric from 'fabric';
import SelectedConfigurationContext from '../../Contexts/SelectedConfigurationContext';
import AdditionalConfigurationContext from '../../Contexts/AdditionalConfigurationContext';
import DescripotionDataContext from '../../Contexts/DescripotionDataContext';
import { createDescriptionBox, createDimensionBoxDiagram, createNicheDimensionBox, createNotesBox, createScreenDimensionBox } from '../../utils/CanvasDrawingsUtils';

interface CanvusProps {
  fabricCanvasRef: React.MutableRefObject<fabric.Canvas>;
}

const FabricCanvas: React.FC<CanvusProps> = ({ fabricCanvasRef }) => {
  const { selectedConfiguration } = useContext(SelectedConfigurationContext);
  const { additionalConfiguration } = useContext(AdditionalConfigurationContext);
  const { descriptionConfiguration } = useContext(DescripotionDataContext);

  const borderColor = "rgba(0, 0, 0, 0.6)";
  const infoContainerBorderColor = "rgba(0, 0, 0, 0.2)";
  const headingTextColor = "rgba(0, 0, 0, 0.8)";
  const textColor = "rgba(0, 0, 0,0.9)";
  const fillColor = "rgba(0, 0, 0, 0.4)";
  const cardBorderColor = "rgba(0, 0, 0, 0.5)";
  const cardTextColor = "rgba(255, 255, 255,0.8)";
  const highlightFillColor = "rgba(248, 230, 186, 1)";

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);


  const [selectedConfigurationValues, setSelectedConfigurationValues] = useState({
    mediaPlayerMFR: selectedConfiguration.mediaPlayerMFR || null,
    mount: selectedConfiguration.mount || null,
    receptacleBox: selectedConfiguration.receptacleBox || null,
    screenMFR: selectedConfiguration.screenMFR || null,
  });


  useEffect(() => {
    if (
      selectedConfiguration.mediaPlayerMFR !== selectedConfigurationValues.mediaPlayerMFR ||
      selectedConfiguration.mount !== selectedConfigurationValues.mount ||
      selectedConfiguration.receptacleBox !== selectedConfigurationValues.receptacleBox ||
      selectedConfiguration.screenMFR !== selectedConfigurationValues.screenMFR
    ) {
      setSelectedConfigurationValues({
        mediaPlayerMFR: selectedConfiguration.mediaPlayerMFR || null,
        mount: selectedConfiguration.mount || null,
        receptacleBox: selectedConfiguration.receptacleBox || null,
        screenMFR: selectedConfiguration.screenMFR || null,
      });
    }
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
    isMultiline?: boolean;
  }

  interface LineOptions {
    length?: number;
    color?: string;
    strokeWidth?: number;
    isDotted?: boolean;
    arrowStart?: boolean;
    arrowEnd?: boolean;
    canvas: fabric.Canvas | null;
    x?: number;
    y?: number;
    orientation?: 'horizontal' | 'vertical'; 
  }
  const addLineToCanvas = ({
    length = 100,
    color = 'black',
    strokeWidth = 2,
    isDotted = false,
    arrowStart = false,
    arrowEnd = false,
    canvas,
    x = 0,
    y = 0,
    orientation = 'horizontal', 
  }: LineOptions) => {
    if (!canvas) return;
  
    console.log("Line Called:");
  
    // Define line points based on orientation
    const points =
      orientation === 'horizontal'
        ? [0, 0, length, 0] 
        : [0, 0, 0, length]; 
  
    const line = new fabric.Line(points, {
      stroke: color,
      strokeWidth: strokeWidth,
      strokeDashArray: isDotted ? [7, 7] : undefined,
      left: x,
      top: y,
    });
  
    canvas.add(line);
  
    const arrowSize = strokeWidth * 4;
    const arrowWidth = strokeWidth * 3;
    const arrowHeight = arrowSize;
  
    if (arrowStart) {
      const startArrow = new fabric.Triangle({
        fill: color,
        width: arrowWidth,
        height: arrowHeight,
        angle: orientation === 'horizontal' ? 270 : 0,
        left:
          orientation === 'horizontal'
            ? x * 0.5
            : x - (arrowHeight / 2.5), 
        top:
          orientation === 'horizontal'
            ? y * 1.2
            : y * 0.99, 
      });
  
      canvas.add(startArrow);
    }
  
    if (arrowEnd) {
      const endArrow = new fabric.Triangle({
        fill: color,
        width: arrowWidth,
        height: arrowHeight,
        angle: orientation === 'horizontal' ? 90 : 180, 
        left:
          orientation === 'horizontal'
            ? x + length * 1.016
            : x + (arrowHeight / 1.5 ), 
        top:
          orientation === 'horizontal'
            ? y * 0.855
            : y + length * 1.02 , 
      });
  
      canvas.add(endArrow);
    }
  
    canvas.renderAll();
  };
  


  const addImageToCanvas = ({
    imageUrl,
    imageX = 0,
    imageY = 0,
    scaleFactor = 1,
    imageLeft = 0,
    imageTop = 0,
    canvas,
  }) => {
    if (!canvas) return;

    const imgElement = new Image();
    imgElement.onload = () => {
      const imgInstance = new fabric.Image(imgElement, {
        left: imageX + imageLeft,
        top: imageY + imageTop,
        scaleX: scaleFactor,
        scaleY: scaleFactor,
      });
      canvas.add(imgInstance);
      canvas.renderAll();
    };
    imgElement.src = imageUrl;
  };


  // Function to create customized rectangles based on the provided options
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
    isDraggable = false,
    fontWeight = 'normal',
    scaleFactor = 1,
    textOriginX = 'center',
    isMultiline = false,
  }: RectangleOptions): fabric.Group => {

    const rect = new fabric.Rect({
      left: rectX,
      top: rectY,
      width: rectWidth,
      height: rectHeight,
      fill: fillColor,
      stroke: strokeColor,
      strokeWidth: strokeWidth,
      strokeDashArray: isDotted ? [9, 9] : [],
    });

    const textOptions = {
      fontSize: Math.min(rectWidth, rectHeight) * 0.2,
      fill: textColor,
      originX: textOriginX as 'left' | 'center' | 'right',
      originY: 'center' as fabric.TOriginY,
      left: rectX + rectWidth / 2,
      top: rectY + rectHeight / 2,
      fontWeight: fontWeight,
      scaleX: scaleFactor,
      scaleY: scaleFactor,
      fontFamily: 'Poppins',
    };

    const textObj = isMultiline
      ? new fabric.Textbox(String(text).replace(/\\n/g, '\n'), { ...textOptions, width: rectWidth, textAlign: textOriginX })
      : new fabric.Text(String(text), textOptions);

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
    if (containerRef.current && fabricCanvasRef.current) {

      const containerWidth = containerRef.current.offsetWidth;
      const newHeight = (containerWidth * 9) / 16;

      const canvas = fabricCanvasRef.current;

      const prevWidth = canvas.width || 1;
      const prevHeight = canvas.height || 1;

      canvas.setWidth(containerWidth);
      canvas.setHeight(newHeight);

      const scaleX = containerWidth / prevWidth;
      const scaleY = newHeight / prevHeight;

      canvas.getObjects().forEach((obj) => {
        obj.scaleX = (obj.scaleX || 1) * scaleX;
        obj.scaleY = (obj.scaleY || 1) * scaleY;
        obj.left = (obj.left || 0) * scaleX;
        obj.top = (obj.top || 0) * scaleY;
        obj.setCoords();
      });

    }
  };


  useEffect(() => {
    if (canvasRef.current && !fabricCanvasRef.current) {
      // Initialize Fabric.js canvas
      fabricCanvasRef.current = new fabric.Canvas(canvasRef.current, {
        preserveObjectStacking: true,
        selection: true,
        backgroundColor: 'white',
      });

      fabric.Text.prototype.fontFamily = 'Poppins';
      createScreenDimensionBox({
        fabricCanvasRef,
        borderColor,
        headingTextColor,
        cardBorderColor,
        fillColor,
        cardTextColor,
        textColor,
        selectedConfigurationValues,
        additionalConfiguration,
        createDynamicRectangle,
      })

      {
        additionalConfiguration && additionalConfiguration.nicheType === "niche" && createNicheDimensionBox({
          fabricCanvasRef,
          borderColor,
          headingTextColor,
          cardBorderColor,
          fillColor,
          cardTextColor,
          textColor,
          selectedConfigurationValues,
          additionalConfiguration,
          createDynamicRectangle,
        });
      }
      createDescriptionBox({
        fabricCanvasRef,
        borderColor: infoContainerBorderColor,
        headingTextColor,
        highlightFillColor,
        textColor,
        descriptionConfiguration,
        createDynamicRectangle,
        addImageToCanvas,
      });

      createNotesBox({
        fabricCanvasRef,
        borderColor,
        headingTextColor,
        cardBorderColor,
        fillColor,
        cardTextColor,
        textColor,
        additionalConfiguration,
        createDynamicRectangle,
      });
    }

    createDimensionBoxDiagram({
      fabricCanvasRef,
      borderColor: infoContainerBorderColor,
      headingTextColor,
      highlightFillColor,
      textColor,
      descriptionConfiguration,
      createDynamicRectangle,
      addImageToCanvas,
      addLineToCanvas,
      selectedConfigurationValues,
      additionalConfiguration,
    })

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
  }, [selectedConfigurationValues, additionalConfiguration, descriptionConfiguration]);


  return (
    <div ref={containerRef} className='h-full w-full'
    >
      <canvas
        ref={canvasRef}
        className='border border-border-color h-full w-full'
      />

    </div>
  );
};

export default FabricCanvas;


