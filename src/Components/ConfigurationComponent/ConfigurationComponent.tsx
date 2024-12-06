import { useContext, useEffect, useState } from "react";
import ScreenMFRDataContext from "../../Contexts/ScreenMFRDataContext";
import MediaPlayerMFRDataContext from "../../Contexts/MediaPlayerMFRDataContext";
import MountsDataContext from "../../Contexts/MountsDataContext";
import ReceptacleBoxDataContext from "../../Contexts/ReceptacleBoxDataContext";
import SelectedConfigurationContext from "../../Contexts/SelectedConfigurationContext";

const ConfigurationComponent = () => {
  const { screenMFRData } = useContext(ScreenMFRDataContext);
  const { mediaPlayerMFRData } = useContext(MediaPlayerMFRDataContext);
  const { mountsData } = useContext(MountsDataContext);
  const { receptacleBoxData } = useContext(ReceptacleBoxDataContext);
  const { selectedConfiguration, setSelectedConfiguration } = useContext(SelectedConfigurationContext);

  // Default values initialization
  const [selectedValues, setSelectedValues] = useState({
    screenMFR: screenMFRData[0] || null,
    mediaPlayerMFR: mediaPlayerMFRData[0] || null,
    mount: mountsData[0] || null,
    receptacleBox: receptacleBoxData[0] || null,
  });

  useEffect(() => {
    // When context data updates, set the first value as the default
    setSelectedValues({
      screenMFR: screenMFRData[0] || null,
      mediaPlayerMFR: mediaPlayerMFRData[0] || null,
      mount: mountsData[0] || null,
      receptacleBox: receptacleBoxData[0] || null,
    });
  }, [screenMFRData, mediaPlayerMFRData, mountsData, receptacleBoxData]);

  const handleSelectionChange = (field: string, value: string) => {
    // Look up the full object based on the selected value
    let updatedValue = null;
    if (field === "screenMFR") {
      updatedValue = screenMFRData.find(option => option["Screen MFR"] === value) || null;
    } else if (field === "mediaPlayerMFR") {
      updatedValue = mediaPlayerMFRData.find(option => option["MFG. PART"] === value) || null;
    } else if (field === "mount") {
      updatedValue = mountsData.find(option => option["MFG. PART"] === value) || null;
    } else if (field === "receptacleBox") {
      updatedValue = receptacleBoxData.find(option => option["MFG. PART"] === value) || null;
    }

    const updatedValues = { ...selectedValues, [field]: updatedValue };

    // Update selectedConfiguration in context
    setSelectedValues(updatedValues);
    setSelectedConfiguration(updatedValues); // This updates the context with the selected configuration
  };

  console.log("Selected Configuration:", selectedConfiguration);

  return (
    <form className="h-max px-4 py-3 space-y-0 border border-border-color">
      <h4 className="font-semibold text-sm pb-2 text-opacity-5">Configurations</h4>

      <div className="pb-2">
        <label
          htmlFor="screenMFR"
          className="block mb-1 text-xs font-small text-text-color"
        >
          Select Screen MFR
        </label>
        <select
          id="screenMFR"
          value={selectedValues.screenMFR?.["Screen MFR"] || ""}
          onChange={(e) => handleSelectionChange("screenMFR", e.target.value)}
          className="border bg-card-color border-border-color text-card-text-color text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5"
        >
          <option value="">Select Screen MFR</option>
          {screenMFRData.map((option, index) => (
            <option key={index} value={option["Screen MFR"]} className="text-card-text-color">
              {option["Screen MFR"]}
            </option>
          ))}
        </select>
      </div>

      <div className="pb-2">
        <label
          htmlFor="mediaPlayerMFR"
          className="block mb-1 text-xs font-small text-text-color"
        >
          Select Media Player MFR
        </label>
        <select
          id="mediaPlayerMFR"
          value={selectedValues.mediaPlayerMFR?.["MFG. PART"] || ""}
          onChange={(e) => handleSelectionChange("mediaPlayerMFR", e.target.value)}
          className="border bg-card-color border-border-color text-card-text-color text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5"
        >
          <option value="">Select Media Player MFR</option>
          {mediaPlayerMFRData.map((option, index) => (
            <option key={index} value={option["MFG. PART"]} className="text-card-text-color">
              {option["MFG. PART"]}
            </option>
          ))}
        </select>
      </div>

      <div className="pb-2">
        <label
          htmlFor="mount"
          className="block mb-1 text-xs font-small text-text-color"
        >
          Select Mount
        </label>
        <select
          id="mount"
          value={selectedValues.mount?.["MFG. PART"] || ""}
          onChange={(e) => handleSelectionChange("mount", e.target.value)}
          className="border bg-card-color border-border-color text-card-text-color text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5"
        >
          <option value="">Select Mount</option>
          {mountsData.map((option, index) => (
            <option key={index} value={option["MFG. PART"]} className="text-card-text-color">
              {option["MFG. PART"]}
            </option>
          ))}
        </select>
      </div>

      <div className="pb-2">
        <label
          htmlFor="receptacleBox"
          className="block mb-1 text-xs font-small text-text-color"
        >
          Select Receptacle Box
        </label>
        <select
          id="receptacleBox"
          value={selectedValues.receptacleBox?.["MFG. PART"] || ""}
          onChange={(e) => handleSelectionChange("receptacleBox", e.target.value)}
          className="border bg-card-color border-border-color text-card-text-color text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5"
        >
          <option value="">Select Receptacle Box</option>
          {receptacleBoxData.map((option, index) => (
            <option key={index} value={option["MFG. PART"]} className="text-card-text-color">
              {option["MFG. PART"]}
            </option>
          ))}
        </select>
      </div>

      <div className="flex align-center gap-0">
        <button
          type="button"
          className="text-text-color border border-card-color focus:outline-none hover:bg-card-color focus:ring-4 focus:ring-gray-100 font-medium rounded-xs text-sm px-5 py-1.5 text-xs"
        >
          Vertical
        </button>
        <button
          type="button"
          className="text-blue-50 bg-blue-700 border border-blue-700 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-xs text-sm px-5 py-1.5 text-xs"
        >
          Horizontal
        </button>
      </div>
    </form>
  );
};

export default ConfigurationComponent;
