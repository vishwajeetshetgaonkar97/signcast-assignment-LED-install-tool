import React, { useRef, useEffect, useState, useContext } from 'react';
import * as fabric from 'fabric';
import ScreenMFRDataContext from '../../Contexts/ScreenMFRDataContext';
import SelectedConfigurationContext from '../../Contexts/SelectedConfigurationContext';
import AdditionalConfigurationContext from '../../Contexts/AdditionalConfigurationContext';
import {getDate, getDepartmentText, getDescriptionContainerTitle, getDrawerName, getScreenSizeText} from '../../utils/CanvasUtils'
import DescripotionDataContext from '../../Contexts/DescripotionDataContext';

const FabricCanvas: React.FC = () => {
  const { screenMFRData } = useContext(ScreenMFRDataContext);
  const { selectedConfiguration, setSelectedConfiguration } = useContext(SelectedConfigurationContext);
  const { additionalConfiguration, setAdditionalConfiguration } = useContext(AdditionalConfigurationContext);
const { descriptionConfiguration } = useContext(DescripotionDataContext);

  const borderColor = "rgba(0, 0, 0, 0.6)";
  const headingTextColor = "rgba(0, 0, 0, 0.8)";
  const textColor = "rgba(0, 0, 0,0.9)";
  const fillColor = "rgba(0, 0, 0, 0.4)";
  const cardBorderColor = "rgba(0, 0, 0, 0.5)";
  const cardTextColor = "rgba(255, 255, 255,0.8)";
  const highlightFillColor = "rgba(255, 125, 25, 0.4)";

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fabricCanvasRef = useRef<fabric.Canvas | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 450 });
  const [screenDimensionBox, setScreenDimensionBox] = useState<fabric.Group[]>([]);
  const [nicheDimensionBox, setNicheDimensionBox] = useState<fabric.Group[]>([]);
  const [descriptionBox, setDescriptionBox] = useState<fabric.Group[]>([]);

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

  const createDynamicImage = async ({
    imageX,
    imageY,
    imageWidth,
    imageHeight,
    imageUrl,
    isDraggable = true,
  }: {
    imageX: number;
    imageY: number;
    imageWidth: number;
    imageHeight: number;
    imageUrl: string;
    isDraggable?: boolean;
  }): Promise<fabric.Image> => {
    // Load the image
    return new Promise((resolve, reject) => {
      fabric.Image.fromURL(
        imageUrl,
        (img) => {
          // Set image properties
          img.set({
            left: imageX,
            top: imageY,
            width: imageWidth,
            height: imageHeight,
            scaleX: imageWidth / img.width!,
            scaleY: imageHeight / img.height!,
            selectable: isDraggable,
            lockMovementX: !isDraggable,
            lockMovementY: !isDraggable,
            hasControls: isDraggable,
          });
  
          resolve(img);
        },
        {
          crossOrigin: 'Anonymous', // For cross-origin images
        }
      );
    });
  };

  
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
    isMultiline = false, // Add a flag to switch between Text and Textbox
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
  
    let textObj;
  
    if (isMultiline) {
      // Use fabric.Textbox for multiline text
      textObj = new fabric.Textbox(String(text), {
        width: rectWidth, // Set the width for wrapping
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
        textAlign: textOriginX, // Align text based on the originX property
      });
    } else {
      // Use fabric.Text for single-line text
      textObj = new fabric.Text(String(text), {
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
    }
  
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


        descriptionBox.forEach((element) => {
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


  const createDescriptionBox = () => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;

    const { width, height } = canvasSize;

    const rectWidth = width * 0.39;
    const rectHeight = height * 0.28 ;
    const rectX = width * 0.595;
    const rectY = height * 0.69;

    const outerBorder = createDynamicRectangle({
      rectX,
      rectY,
      rectWidth,
      rectHeight,
      strokeColor: cardBorderColor,
      strokeWidth: 1,
    });

    const logoImage = createDynamicImage({
      imageX: rectX * 1.01,
      imageY: rectY * 1.2,
      imageWidth: rectWidth * 0.6,
      imageHeight: height * 0.06,
      imageUrl: "./logo.png",
    });



    const addressText = "361 Steelcase RD. W, #1, MARKHAM. ONTARIO Phone: (416) 900-2233";
    const addressTextContainer = createDynamicRectangle({
      rectX: rectX * 1.14,
      rectY: rectY * 1.0,
      rectWidth: rectWidth * 0.36,
      rectHeight: height * 0.1,
      text: addressText,
      textColor: headingTextColor,
      scaleFactor: 0.76,
      fontWeight: '300',
      textOriginX: 'left',
      isMultiline: true
    });


    const descriptionTitleText = "Description";
    const descriptionTitleTextContainer = createDynamicRectangle({
      rectX: rectX * 1.33,
      rectY: rectY * 0.983,
      rectWidth: rectWidth * 0.36,
      rectHeight: height * 0.1,
      text: descriptionTitleText,
      textColor: headingTextColor,
      scaleFactor: 0.8,
      fontWeight: '400',
      textOriginX: 'left',
    });

    const descriptionText = getDescriptionContainerTitle(descriptionConfiguration);
    const descriptionTextContainer = createDynamicRectangle({
      rectX: rectX * 1.285,
      rectY: rectY * 1.02,
      rectWidth: rectWidth * 0.5,
      rectHeight: height * 0.1,
      text: descriptionText,
      textColor: headingTextColor,
      scaleFactor: 0.83,
      fontWeight: '500',
      textOriginX: 'left',
    });

    const topRowPositionY = rectY * 1.14;

    const secondRowPositionY = rectY * 1.185;
    const secondaRowPositionX = rectX * 1.158;
    const thirdRowPositionX = rectX * 1.302;
    const fourthRowPositionX = rectX * 1.446;

    const thirdRowPositionY = rectY * 1.245;
    const forthColumnPositiony = rectY * 1.29;

    const column1height = height * 0.04
    const columnwidth = rectWidth * 0.22;
    const column4width = rectWidth * 0.29;




    

    const drawnText = 'Drawn';
    const drawnTextContainer = createDynamicRectangle({
      rectX: rectX * 1.015,
      rectY: topRowPositionY,
      rectWidth: columnwidth,
      rectHeight: height * 0.03,
      strokeColor: cardBorderColor,
      fillColor: highlightFillColor,
      strokeWidth: 1,
      text: drawnText,
      textColor: textColor,
      scaleFactor: 2.4,
      fontWeight: '500',
    });

    const drawerNameText = getDrawerName(descriptionConfiguration);
    const drawnNameContainer = createDynamicRectangle({
      rectX: rectX * 1.015,
      rectY: secondRowPositionY,
      rectWidth: columnwidth,
      rectHeight: column1height,
      strokeColor: cardBorderColor,
      strokeWidth: 1,
      text: drawerNameText,
      textColor: textColor,
      scaleFactor: 1.5,
    });

    const dimensionsTitleText = 'Dimension in inches';
    const dimensionsTitleTextContainer = createDynamicRectangle({
      rectX: secondaRowPositionX,
      rectY: topRowPositionY,
      rectWidth: columnwidth,
      rectHeight: height * 0.072,
      strokeColor: cardBorderColor,
      fillColor: highlightFillColor,
      strokeWidth: 1,
      text: dimensionsTitleText,
      textColor: textColor,
      scaleFactor: 0.6,
      // isMultiline : true
      fontWeight: '500',
    });

    const dateTextContainer = createDynamicRectangle({
      rectX: rectX * 1.015,
      rectY: thirdRowPositionY,
      rectWidth: columnwidth,
      rectHeight: height * 0.03,
      strokeColor: cardBorderColor,
      fillColor: highlightFillColor,
      strokeWidth: 1,
      text: "Date",
      textColor: textColor,
      scaleFactor: 2.4,
      fontWeight: '500',

    });

    const dateContainer = createDynamicRectangle({
      rectX: rectX * 1.015,
      rectY: forthColumnPositiony,
      rectWidth: columnwidth,
      rectHeight: column1height,
      strokeColor: cardBorderColor,
      strokeWidth: 1,
      text: getDate(descriptionConfiguration),
      textColor: textColor,
      scaleFactor: 1.8,
      fontWeight: '500',

    });

    const sheetTextContainer = createDynamicRectangle({
      rectX: secondaRowPositionX,
      rectY: thirdRowPositionY,
      rectWidth: columnwidth,
      rectHeight: height * 0.03,
      strokeColor: cardBorderColor,
      fillColor: highlightFillColor,
      strokeWidth: 1,
      text: "Sheet",
      textColor: textColor,
      scaleFactor: 2.4,
      fontWeight: '500',

    });

    const sheetContainer = createDynamicRectangle({
      rectX: secondaRowPositionX,
      rectY: forthColumnPositiony,
      rectWidth: columnwidth,
      rectHeight: column1height,
      strokeColor: cardBorderColor,
      strokeWidth: 1,
      text: "1 of 1",
      textColor: textColor,
      scaleFactor: 1.8,
      fontWeight: '500',

    });

    const revisonTextContainer = createDynamicRectangle({
      rectX: thirdRowPositionX,
      rectY: thirdRowPositionY,
      rectWidth: columnwidth,
      rectHeight: height * 0.03,
      strokeColor: cardBorderColor,
      fillColor: highlightFillColor,
      strokeWidth: 1,
      text: "Revision",
      textColor: textColor,
      scaleFactor: 2.4,
      fontWeight: '500',

    });

    const revisionContainer = createDynamicRectangle({
      rectX: thirdRowPositionX,
      rectY: forthColumnPositiony,
      rectWidth: columnwidth,
      rectHeight: column1height,
      strokeColor: cardBorderColor,
      strokeWidth: 1,
      text: "00",
      textColor: textColor,
      scaleFactor: 1.8,
      fontWeight: '500',

    });

    const screenSizeTextContainer = createDynamicRectangle({
      rectX: fourthRowPositionX,
      rectY: topRowPositionY,
      rectWidth: column4width,
      rectHeight: height * 0.03,
      strokeColor: cardBorderColor,
      fillColor: highlightFillColor,
      strokeWidth: 1,
      text: "Screen Size",
      textColor: textColor,
      scaleFactor: 2.4,
      fontWeight: '500',
    });

    const screenSizeText = getScreenSizeText(descriptionConfiguration);
    const screenSizeContainer = createDynamicRectangle({
      rectX: fourthRowPositionX,
      rectY: secondRowPositionY,
      rectWidth: column4width,
      rectHeight: column1height,
      strokeColor: cardBorderColor,
      strokeWidth: 1,
      text: screenSizeText,
      textColor: textColor,
      scaleFactor: 1.5,
    });


    const departmentTextContainer = createDynamicRectangle({
      rectX: fourthRowPositionX,
      rectY: thirdRowPositionY,
      rectWidth: column4width,
      rectHeight: height * 0.03,
      strokeColor: cardBorderColor,
      fillColor: highlightFillColor,
      strokeWidth: 1,
      text: "Department",
      textColor: textColor,
      scaleFactor: 2.4,
      fontWeight: '500',

    });

    const departmentContainer = createDynamicRectangle({
      rectX: fourthRowPositionX,
      rectY: forthColumnPositiony,
      rectWidth: column4width,
      rectHeight: column1height,
      strokeColor: cardBorderColor,
      strokeWidth: 1,
      text: getDepartmentText(descriptionConfiguration),
      textColor: textColor,
      scaleFactor: 1.8,
      fontWeight: '500',

    });


    canvas.add(outerBorder);
    // canvas.add(logoImage);
    canvas.add(descriptionTitleTextContainer);
    canvas.add(addressTextContainer);
    canvas.add(descriptionTextContainer);
    canvas.add(drawnTextContainer);
    canvas.add(drawnNameContainer);
    canvas.add(dimensionsTitleTextContainer);
   canvas.add(dateTextContainer);
    canvas.add(dateContainer);
    canvas.add(sheetTextContainer);
    canvas.add(sheetContainer);
    canvas.add(revisonTextContainer);
    canvas.add(revisionContainer);
    canvas.add(screenSizeTextContainer);
    canvas.add(screenSizeContainer);
    canvas.add(departmentTextContainer);
    canvas.add(departmentContainer);

    setScreenDimensionBox([outerBorder, addressTextContainer]);
  };




  useEffect(() => {
    // Initialize Fabric.js canvas
    if (canvasRef.current && !fabricCanvasRef.current) {
      fabricCanvasRef.current = new fabric.Canvas(canvasRef.current);

      // Set Poppins as the default font for all Fabric.js text elements
      fabric.Text.prototype.fontFamily = 'Poppins';

      createScreenDimensionBox();
      createNicheDimensionBox();
      createDescriptionBox();
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
