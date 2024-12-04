import { useState } from "react";
import CanvusComponent from "../CanvusComponent/CanvusComponent";
import ConfigurationComponent from "../ConfigurationComponent/ConfigurationComponent";

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
    <>
      <div className="flex flex-col aspect-video ">
        <CanvusComponent testArray={testArray} />
      </div>
      <ConfigurationComponent />
    </>
  );
};

export default DrawingToolComponent;
