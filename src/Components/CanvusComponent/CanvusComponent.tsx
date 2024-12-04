import React, { useEffect, useState } from "react";
import * as fabric from "fabric";
import { FabricJSCanvas, useFabricJSEditor } from "../../lib";
import { PDFDocument, rgb } from "pdf-lib"; // Import pdf-lib

interface TestArrayItem {
  name: string;
  age: number;
  height: number;
}

interface CanvusComponentProps {
  testArray: TestArrayItem[];
}

const CanvusComponent: React.FC<CanvusComponentProps> = ({ testArray }) => {
  const { selectedObjects, editor, onReady } = useFabricJSEditor({
    defaultStrokeColor: "red",
  });

  // Initialize the editor once it's ready
  useEffect(() => {
    if (editor) {
      console.log("Editor initialized:", editor);
    }
  }, [editor]);

  // Add rectangles and text from the testArray to the canvas
  useEffect(() => {
    if (editor && Array.isArray(testArray)) {
      console.log("Adding rectangles to canvas:", testArray);

      // Loop through the testArray to add rectangles and text
      testArray.forEach((item) => {
        // Add a rectangle based on age and height
        const rectangle = new fabric.Rect({
          left: 50 + item.age * 5,
          top: 50 + item.height,
          width: 100,
          height: 30,
          fill: "blue",
          selectable: true,
        });

        editor.canvas.add(rectangle);

        // Add a text element for the name
        const text = new fabric.Text(item.name, {
          left: 50 + item.age * 5,
          top: 50 + item.height + 40,
          fontSize: 16,
          fill: "black",
          selectable: true,
        });

        editor.canvas.add(text);
      });
    }
  }, [editor, testArray]);

  const [text, setText] = useState("");
  const [strokeColor, setStrokeColor] = useState("");
  const [fillColor, setFillColor] = useState("");

  // Function to download the canvas as a PDF
  const onDownloadCanvasAsPDF = async () => {
    if (editor) {
      // Create a new PDF document using pdf-lib
      const pdfDoc = await PDFDocument.create();

      // Add a page to the PDF
      const page = pdfDoc.addPage([editor.canvas.width, editor.canvas.height]);

      // Loop through canvas objects to extract text and draw it on the PDF
      const canvasObjects = editor.canvas.getObjects();

      // Add each text element as selectable text in the PDF
      for (const obj of canvasObjects) {
        if (obj instanceof fabric.Text) {
          page.drawText(obj.text, {
            x: obj.left!,
            y: page.getHeight() - obj.top! - 20, // Adjust y position for PDF (PDF's y-axis is inverted)
            size: obj.fontSize as number,
            color: rgb(0, 0, 0), // Black color for the text
          });
        } else if (obj instanceof fabric.Rect) {
          // Draw the rectangle (if needed)
          page.drawRectangle({
            x: obj.left!,
            y: page.getHeight() - obj.top! - obj.height!,
            width: obj.width!,
            height: obj.height!,
            color: rgb(0, 0, 1), // Blue color for rectangle
          });
        }
      }

      // Save the PDF document
      const pdfBytes = await pdfDoc.save();

      // Create a Blob from the PDF bytes and generate a download link
      const pdfBlob = new Blob([pdfBytes], { type: "application/pdf" });
      const pdfUrl = URL.createObjectURL(pdfBlob);
      const link = document.createElement("a");
      link.href = pdfUrl;
      link.download = "canvas.pdf"; // Name of the PDF file
      link.click();
    }
  };

  return (
    <>
      {editor ? (
        <div>
          <button onClick={onDownloadCanvasAsPDF}>Download as PDF</button>
          <button onClick={() => editor?.zoomIn()}>Zoom In</button>
          <button onClick={() => editor?.zoomOut()}>Zoom Out</button>
          <button onClick={() => editor?.addCircle()}>Add Circle</button>
          <button onClick={() => editor?.addRectangle()}>Add Rectangle</button>
          <button onClick={() => editor?.addLine()}>Add Line</button>
          <button onClick={() => editor?.deleteAll()}>Delete All</button>
          <button onClick={() => editor?.deleteSelected()}>Delete Selected</button>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button onClick={() => editor?.addText(text)}>Add Text</button>
          <input
            type="text"
            value={strokeColor || editor.strokeColor}
            onChange={(e) => setStrokeColor(e.target.value)}
          />
          <button onClick={() => editor?.setStrokeColor(strokeColor)}>
            Set Stroke Color
          </button>
          <input
            type="text"
            value={fillColor || editor.fillColor}
            onChange={(e) => setFillColor(e.target.value)}
          />
          <button onClick={() => editor?.setFillColor(fillColor)}>
            Set Fill Color
          </button>
          <pre>
            fillColor: {editor.fillColor}, strokeColor: {editor.strokeColor}
          </pre>
          <pre>{JSON.stringify(selectedObjects)}</pre>
        </div>
      ) : (
        <>Loading...</>
      )}

      <FabricJSCanvas className="sample-canvas border-2 aspect-video" onReady={onReady} />
    </>
  );
};

export default CanvusComponent;
