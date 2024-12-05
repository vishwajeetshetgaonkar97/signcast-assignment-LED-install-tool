import { useState } from "react";
import CanvasComponent from "../CanvasComponent/CanvasComponent";
import ConfigurationComponent from "../ConfigurationComponent/ConfigurationComponent";
import FabricCanvas from "../FabricCanvas/FabricCanvas";

interface TestArrayItem {
  name: string;
  age: number;
  height: number;
}

const DrawingToolComponent = () => {
  const [testArray, setTestArray] = useState<TestArrayItem[]>([
    { name: "saadcv", age: 23, height: 12.5 },
    { name: "saawfedcv", age: 253, height: 152.5 },
  ]);

  return (
    <div className="flex h-full pb-2 align-center justify-center w-full gap-4">
      
      <FabricCanvas/>
    
      <ConfigurationComponent />
    </div>
  );
};

export default DrawingToolComponent;
