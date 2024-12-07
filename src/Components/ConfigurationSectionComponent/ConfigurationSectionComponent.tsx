import { AiOutlineDownload } from 'react-icons/ai';
import ConfigurationComponent from "../ConfigurationComponent/ConfigurationComponent";
import DescriptionConfigComponent from "../DescriptionConfigComponent/DescriptionConfigComponent";

const ConfigurationSectionComponent = () => {
  return (
    <div className="flex flex-col gap-4 max-h-full overflow-y-auto ">
      <div className="flex flex-col gap-4 max-h-full overflow-y-auto border-border-color border-b border-opacity-50">
        <ConfigurationComponent />
        <DescriptionConfigComponent />

      </div>
      <div className="flex ">
        <button className="w-full py-2 text-xs bg-blue-700 text-blue-50 text-blue-50 border border-border-color focus:outline-none hover:bg-card-color flex items-center justify-between gap-2">
          <span className="flex-1 text-center">Download</span>
          <div className="border-l border-blue-50 border-opacity-50 px-2 flex items-center">
            <AiOutlineDownload size={18} />
          </div>
        </button>
      </div>
    </div>

  );
};

export default ConfigurationSectionComponent;
