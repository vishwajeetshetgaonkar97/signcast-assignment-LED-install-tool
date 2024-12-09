import { scale } from "pdf-lib";
import getDescriptionContainerTitle, { getDate, getDepartmentText, getDrawerName, getNicheDepth, getNicheHeight, getNicheWidth, getRBoxDepth, getRBoxHeight, getRBoxWidth, getScreenDistanceFromFloorLine, getScreenHeightDimension, getScreenSizeText, getScreenWidthDimension } from "./CanvasUtils";

const createScreenDimensionBox = ({
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

  }) => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;
  
    const width = canvas.getWidth();
    const height = canvas.getHeight();
  
    const rectWidth = width * 0.19;
    const rectHeight = height * 0.24;
    const rectX = width * 0.795;
    const rectY = height * 0.03;
  
    const elements = [
      {
        rectX,
        rectY,
        rectWidth,
        rectHeight,
        strokeColor: borderColor,
        strokeWidth: 1,
      },
      {
        rectX: rectX * 1.01,
        rectY: rectY * 1.2,
        rectWidth: rectWidth * 0.6,
        rectHeight: height * 0.06,
        text: 'Screen Dimensions:',
        textColor: headingTextColor,
        scaleFactor: 1.95,
        fontWeight: '600',
        textOriginX: 'right',
      },
      {
        rectX: rectX * 1.011,
        rectY: rectY * 3.2,
        rectWidth: rectWidth * 0.452,
        rectHeight: height * 0.04,
        strokeColor: cardBorderColor,
        fillColor: fillColor,
        strokeWidth: 1,
        text: 'Height',
        textColor: cardTextColor,
        scaleFactor: 1.9,
      },
      {
        rectX: rectX * 1.12,
        rectY: rectY * 3.2,
        rectWidth: rectWidth * 0.452,
        rectHeight: height * 0.04,
        strokeColor: cardBorderColor,
        strokeWidth: 1,
        text: getScreenHeightDimension(selectedConfigurationValues),
        textColor: textColor,
        scaleFactor: 1.9,
      },
      {
        rectX: rectX * 1.011,
        rectY: rectY * 5,
        rectWidth: rectWidth * 0.452,
        rectHeight: height * 0.04,
        strokeColor: cardBorderColor,
        fillColor: fillColor,
        strokeWidth: 1,
        text: 'Width',
        textColor: cardTextColor,
        scaleFactor: 1.9,
      },
      {
        rectX: rectX * 1.12,
        rectY: rectY * 5,
        rectWidth: rectWidth * 0.452,
        rectHeight: height * 0.04,
        strokeColor: cardBorderColor,
        strokeWidth: 1,
        text: getScreenWidthDimension(selectedConfigurationValues),
        textColor: textColor,
        scaleFactor: 1.9,
      },
      {
        rectX: rectX * 1.011,
        rectY: rectY * 6.8,
        rectWidth: rectWidth * 0.452,
        rectHeight: height * 0.04,
        strokeColor: cardBorderColor,
        fillColor: fillColor,
        strokeWidth: 1,
        text: 'Floor Line',
        textColor: cardTextColor,
        scaleFactor: 1.9,
        fontWeight: 'normal'
      },
      {
        rectX: rectX * 1.12,
        rectY: rectY * 6.8,
        rectWidth: rectWidth * 0.45,
        rectHeight: height * 0.04,
        strokeColor: cardBorderColor,
        strokeWidth: 1,
        text: additionalConfiguration.distanceFromFloor ? additionalConfiguration.distanceFromFloor : '0',
        textColor: textColor,
        scaleFactor: 1.9,
        fontWeight: 'normal'
      }
    ];
  
    elements.forEach(element => canvas.add(createDynamicRectangle(element)));
  };


  const createNicheDimensionBox = ({
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
  }) => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;
  
    const width = canvas.getWidth();
    const height = canvas.getHeight();
    const rectWidth = width * 0.19;
    const rectHeight = height * 0.24;
    const rectX = width * 0.595;
    const rectY = height * 0.03;
  
    const elements = [
      {
        rectX,
        rectY,
        rectWidth,
        rectHeight,
        strokeColor: borderColor,
        strokeWidth: 1,
      },
      {
        rectX: rectX * 1.013,
        rectY: rectY * 1.2,
        rectWidth: rectWidth * 0.6,
        rectHeight: height * 0.06,
        text: 'Niche Dimensions:',
        textColor: headingTextColor,
        scaleFactor: 1.95,
        fontWeight: '600',
        textOriginX: 'right',
      },
      {
        rectX: rectX * 1.014,
        rectY: rectY * 3.2,
        rectWidth: rectWidth * 0.452,
        rectHeight: height * 0.04,
        strokeColor: cardBorderColor,
        fillColor: fillColor,
        strokeWidth: 1,
        text: 'Height',
        textColor: cardTextColor,
        scaleFactor: 1.9,
      },
      {
        rectX: rectX * 1.159,
        rectY: rectY * 3.2,
        rectWidth: rectWidth * 0.452,
        rectHeight: height * 0.04,
        strokeColor: cardBorderColor,
        strokeWidth: 1,
        text: getNicheHeight(selectedConfigurationValues, additionalConfiguration),
        textColor: textColor,
        scaleFactor: 1.9,
      },
      {
        rectX: rectX * 1.014,
        rectY: rectY * 5,
        rectWidth: rectWidth * 0.452,
        rectHeight: height * 0.04,
        strokeColor: cardBorderColor,
        fillColor: fillColor,
        strokeWidth: 1,
        text: 'Width',
        textColor: cardTextColor,
        scaleFactor: 1.9,
      },
      {
        rectX: rectX * 1.159,
        rectY: rectY * 5,
        rectWidth: rectWidth * 0.452,
        rectHeight: height * 0.04,
        strokeColor: cardBorderColor,
        strokeWidth: 1,
        text: getNicheWidth(selectedConfigurationValues, additionalConfiguration),
        textColor: textColor,
        scaleFactor: 1.9,
      },
      {
        rectX: rectX * 1.014,
        rectY: rectY * 6.8,
        rectWidth: rectWidth * 0.452,
        rectHeight: height * 0.04,
        strokeColor: cardBorderColor,
        fillColor: fillColor,
        strokeWidth: 1,
        text: 'Depth',
        textColor: cardTextColor,
        scaleFactor: 1.9,
        fontWeight: 'normal',
      },
      {
        rectX: rectX * 1.159,
        rectY: rectY * 6.8,
        rectWidth: rectWidth * 0.452,
        rectHeight: height * 0.04,
        strokeColor: cardBorderColor,
        strokeWidth: 1,
        text: getNicheDepth(selectedConfigurationValues, additionalConfiguration ),
        textColor: textColor,
        scaleFactor: 1.9,
        fontWeight: 'normal',
      },
    ];
  
    elements.forEach(element => canvas.add(createDynamicRectangle(element)));
  };
  
  const createNotesBox = ({
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
  }) => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;
  
    const width = canvas.getWidth();
    const height = canvas.getHeight();
    
    const rectWidth = width * 0.39;
    const rectHeight = height * 0.2;
    const rectX = width * 0.595;
    const rectY = height * 0.47;
  
    const elements = [
      {
        rectX,
        rectY,
        rectWidth,
        rectHeight,
        strokeColor: borderColor,
        strokeWidth: 1,
      },
      {
        rectX: rectX * 1.016,
        rectY: rectY * 1.02,
        rectWidth: rectWidth * 0.1,
        rectHeight: height * 0.06,
        text: 'Notes',
        textColor: headingTextColor,
        scaleFactor: 1.95,
        fontWeight: '600',
        textOriginX: 'right',
      },
      {
        rectX: rectX * 1.016,
        rectY: rectY * 1.095,
        rectWidth: rectWidth * 0.1,
        rectHeight: height * 0.06,
        text: 'Install recessed receptacle box with:',
        textColor: textColor,
        scaleFactor: 1.4,
        fontWeight: '300',
        textOriginX: 'right',
      },
      {
        rectX: rectX * 1.016,
        rectY: rectY * 1.155,
        rectWidth: rectWidth * 0.1,
        rectHeight: height * 0.06,
        text: '2x Terminated Power Outlets',
        textColor: textColor,
        scaleFactor: 1.4,
        fontWeight: '300',
        textOriginX: 'right',
      },
      {
        rectX: rectX * 1.016,
        rectY: rectY * 1.21,
        rectWidth: rectWidth * 0.1,
        rectHeight: height * 0.06,
        text: '1x Terminated Data CAT5 Ethernet Outlet',
        textColor: textColor,
        scaleFactor: 1.4,
        fontWeight: '300',
        textOriginX: 'right',
      },
      {
        rectX: rectX * 1.355,
        rectY: rectY * 1.06,
        rectWidth: rectWidth * 0.218,
        rectHeight: height * 0.04,
        strokeColor: cardBorderColor,
        fillColor: fillColor,
        strokeWidth: 1,
        text: 'Height',
        textColor: cardTextColor,
        scaleFactor: 1.9,
      },
      {
        rectX: rectX * 1.499,
        rectY: rectY * 1.06,
        rectWidth: rectWidth * 0.218,
        rectHeight: height * 0.04,
        strokeColor: cardBorderColor,
        strokeWidth: 1,
        text: getRBoxHeight(additionalConfiguration),
        textColor: textColor,
        scaleFactor: 1.9,
      },
      {
        rectX: rectX * 1.355,
        rectY: rectY * 1.175,
        rectWidth: rectWidth * 0.218,
        rectHeight: height * 0.04,
        strokeColor: cardBorderColor,
        fillColor: fillColor,
        strokeWidth: 1,
        text: 'Width',
        textColor: cardTextColor,
        scaleFactor: 1.9,
      },
      {
        rectX: rectX * 1.499,
        rectY: rectY * 1.175,
        rectWidth: rectWidth * 0.218,
        rectHeight: height * 0.04,
        strokeColor: cardBorderColor,
        strokeWidth: 1,
        text: getRBoxWidth(additionalConfiguration),
        textColor: textColor,
        scaleFactor: 1.9,
      },
      {
        rectX: rectX * 1.355,
        rectY: rectY * 1.29,
        rectWidth: rectWidth * 0.218,
        rectHeight: height * 0.04,
        strokeColor: cardBorderColor,
        fillColor: fillColor,
        strokeWidth: 1,
        text: 'Depth',
        textColor: cardTextColor,
        scaleFactor: 1.9,
      },
      {
        rectX: rectX * 1.499,
        rectY: rectY * 1.29,
        rectWidth: rectWidth * 0.218,
        rectHeight: height * 0.04,
        strokeColor: cardBorderColor,
        strokeWidth: 1,
        text: getRBoxDepth(additionalConfiguration),
        textColor: textColor,
        scaleFactor: 1.9,
      },
    ];
  
    elements.forEach(element => canvas.add(createDynamicRectangle(element)));
  };
  
  const createDescriptionBox = ({
    fabricCanvasRef,
    borderColor,
    headingTextColor,
    highlightFillColor,
    textColor,
    descriptionConfiguration,
    createDynamicRectangle,
    addImageToCanvas,
  }) => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;
  
    const width = canvas.getWidth();
    const height = canvas.getHeight();
  
    const rectWidth = width * 0.39;
    const rectHeight = height * 0.28;
    const rectX = width * 0.595;
    const rectY = height * 0.69;
  
    const elements = [
      {
        rectX,
        rectY,
        rectWidth,
        rectHeight,
        strokeColor: borderColor,
        strokeWidth: 1,
      },
      {
        rectX: rectX * 1.01,
        rectY: rectY * 1.2,
        imageUrl: "./logo.png",
        isImage: true,
        scaleFactor: 0.45,
      },
      {
        rectX: rectX * 1.12,
        rectY: rectY * 1.0,
        rectWidth: rectWidth * 0.36,
        rectHeight: height * 0.1,
        text: "361 Steelcase RD. W, #1, MARKHAM. ONTARIO Phone: (416) 900-2233",
        textColor: headingTextColor,
        scaleFactor: 0.73,
        fontWeight: '300',
        textOriginX: 'left',
        isMultiline: true,
      },
      {
        rectX: rectX * 1.33,
        rectY: rectY * 0.983,
        rectWidth: rectWidth * 0.36,
        rectHeight: height * 0.1,
        text: "Description",
        textColor: headingTextColor,
        scaleFactor: 0.8,
        fontWeight: '400',
        textOriginX: 'left',
      },
      {
        rectX: rectX * 1.285,
        rectY: rectY * 1.02,
        rectWidth: rectWidth * 0.5,
        rectHeight: height * 0.1,
        text: getDescriptionContainerTitle(descriptionConfiguration),
        textColor: headingTextColor,
        scaleFactor: 0.83,
        fontWeight: '500',
        textOriginX: 'left',
      },
      {
        rectX: rectX * 1.015,
        rectY: rectY * 1.14,
        rectWidth: rectWidth * 0.22,
        rectHeight: height * 0.03,
        strokeColor: borderColor,
        fillColor: highlightFillColor,
        strokeWidth: 1,
        text: 'Drawn',
        textColor: textColor,
        scaleFactor: 2.4,
        fontWeight: '500',
      },
      {
        rectX: rectX * 1.015,
        rectY: rectY * 1.185,
        rectWidth: rectWidth * 0.22,
        rectHeight: height * 0.04,
        strokeColor: borderColor,
        strokeWidth: 1,
        text: getDrawerName(descriptionConfiguration),
        textColor: textColor,
        scaleFactor: 1.5,
      },
      {
        rectX: rectX * 1.158,
        rectY: rectY * 1.14,
        rectWidth: rectWidth * 0.22,
        rectHeight: height * 0.072,
        strokeColor: borderColor,
        fillColor: highlightFillColor,
        strokeWidth: 1,
        text: 'Dimensions in inches',
        textColor: textColor,
        scaleFactor: 1,
        fontWeight: '500',
        isMultiline: true,
        textOriginX: 'center',
      },
      {
        rectX: rectX * 1.302,
        rectY: rectY * 1.14,
        rectWidth: rectWidth * 0.22,
        rectHeight: height * 0.072,
        strokeColor: borderColor,
        strokeWidth: 1,
        textColor: textColor,
        scaleFactor: 1.8,
        fontWeight: '500',
      },
      {
        rectX: rectX * 1.3,
        rectY: rectY * 1.32,
        imageUrl: "./distance.png",
        isImage: true,
        scaleFactor: 0.45,
      },
      {
        rectX: rectX * 1.015,
        rectY: rectY * 1.245,
        rectWidth: rectWidth * 0.22,
        rectHeight: height * 0.03,
        strokeColor: borderColor,
        fillColor: highlightFillColor,
        strokeWidth: 1,
        text: "Date",
        textColor: textColor,
        scaleFactor: 2.4,
        fontWeight: '500',
      },
      {
        rectX: rectX * 1.015,
        rectY: rectY * 1.29,
        rectWidth: rectWidth * 0.22,
        rectHeight: height * 0.04,
        strokeColor: borderColor,
        strokeWidth: 1,
        text: getDate(descriptionConfiguration),
        textColor: textColor,
        scaleFactor: 1.8,
        fontWeight: '500',
      },
      {
        rectX: rectX * 1.158,
        rectY: rectY * 1.245,
        rectWidth: rectWidth * 0.22,
        rectHeight: height * 0.03,
        strokeColor: borderColor,
        fillColor: highlightFillColor,
        strokeWidth: 1,
        text: "Sheet",
        textColor: textColor,
        scaleFactor: 2.4,
        fontWeight: '500',
      },
      {
        rectX: rectX * 1.158,
        rectY: rectY * 1.29,
        rectWidth: rectWidth * 0.22,
        rectHeight: height * 0.04,
        strokeColor: borderColor,
        strokeWidth: 1,
        text: "1 of 1",
        textColor: textColor,
        scaleFactor: 1.8,
        fontWeight: '500',
      },
      {
        rectX: rectX * 1.302,
        rectY: rectY * 1.245,
        rectWidth: rectWidth * 0.22,
        rectHeight: height * 0.03,
        strokeColor: borderColor,
        fillColor: highlightFillColor,
        strokeWidth: 1,
        text: "Revision",
        textColor: textColor,
        scaleFactor: 2.4,
        fontWeight: '500',
      },
      {
        rectX: rectX * 1.302,
        rectY: rectY * 1.29,
        rectWidth: rectWidth * 0.22,
        rectHeight: height * 0.04,
        strokeColor: borderColor,
        strokeWidth: 1,
        text: "00",
        textColor: textColor,
        scaleFactor: 1.8,
        fontWeight: '500',
      },
      {
        rectX: rectX * 1.446,
        rectY: rectY * 1.14,
        rectWidth: rectWidth * 0.29,
        rectHeight: height * 0.03,
        strokeColor: borderColor,
        fillColor: highlightFillColor,
        strokeWidth: 1,
        text: "Screen Size",
        textColor: textColor,
        scaleFactor: 2.4,
        fontWeight: '500',
      },
      {
        rectX: rectX * 1.446,
        rectY: rectY * 1.185,
        rectWidth: rectWidth * 0.29,
        rectHeight: height * 0.04,
        strokeColor: borderColor,
        strokeWidth: 1,
        text: getScreenSizeText(descriptionConfiguration),
        textColor: textColor,
        scaleFactor: 1.5,
      },
      {
        rectX: rectX * 1.446,
        rectY: rectY * 1.245,
        rectWidth: rectWidth * 0.29,
        rectHeight: height * 0.03,
        strokeColor: borderColor,
        fillColor: highlightFillColor,
        strokeWidth: 1,
        text: "Department",
        textColor: textColor,
        scaleFactor: 2.4,
        fontWeight: '500',
      },
      {
        rectX: rectX * 1.446,
        rectY: rectY * 1.29,
        rectWidth: rectWidth * 0.29,
        rectHeight: height * 0.04,
        strokeColor: borderColor,
        strokeWidth: 1,
        text: getDepartmentText(descriptionConfiguration),
        textColor: textColor,
        scaleFactor: 1.8,
        fontWeight: '500',
      },
    ];
  
    elements.forEach(element => {
      if (element.isImage) {
        addImageToCanvas({
          imageUrl: element.imageUrl,
          scaleFactor: element.scaleFactor || 1,
          canvas: canvas,
          imageLeft: element.rectX * 1.02,
          imageTop: element.rectY * 0.865,
        });
      } else {
        canvas.add(createDynamicRectangle(element, canvas));
      }
    });
  };

  
  export { createScreenDimensionBox ,createNicheDimensionBox,createNotesBox,createDescriptionBox};