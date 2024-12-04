import { useEffect, useState } from "react";
import Papa from "papaparse";

interface Database {
  screenMFR: string;
  make: string;
  screenSize: number;
  height: number;
  width: number;
  depth: number;
  weight: number;
}

const ConfigurationComponent = () => {
  const [data, setData] = useState<Database[]>([]);
  const [selectedValues, setSelectedValues] = useState<Partial<Record<keyof Database, string>>>({});

  // Load CSV and parse it
  useEffect(() => {
    Papa.parse<Database>("/database/data.csv", {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        const parsedData: Database[] = result.data.map((row) => ({
          screenMFR: row["Screen MFR"] || "",
          make: row["Make"] || "",
          screenSize: parseFloat(row["Screen Size"] || "0"),
          height: parseFloat(row["Height"] || "0"),
          width: parseFloat(row["Width"] || "0"),
          depth: parseFloat(row["Depth"] || "0"),
          weight: parseFloat(row["Weight (LBS)"] || "0"),
        }));
        setData(parsedData);
      },
      error: (err) => console.error("Error loading CSV:", err),
    });
  }, []);

  // Update selected values
  const handleSelectionChange = (field: keyof Database, value: string) => {
    setSelectedValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Get unique values for a specific field
  const getFieldOptions = (field: keyof Database): string[] => {
    return Array.from(new Set(data.map((row) => String(row[field]))));
  };

  return (
    <form className="  px-4 py-2 space-y-0 border-2">
      <h4 className="font-semibold text-sm pb-2">Configurations</h4>
      {data.length > 0 ? (
        <>
        
          {(Object.keys(data[0]) as (keyof Database)[]).map((field) => (
            <div key={field} className="pb-2">
              <label
                htmlFor={field}
                className="block mb-1 text-xs font-small text-text-color"
              >
                Select {field}
              </label>
              <select
                id={field}
                value={selectedValues[field] || ""}
                onChange={(e) => handleSelectionChange(field, e.target.value)}
                className=" border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value=""> {field}</option>
                {getFieldOptions(field).map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </>
      ) : (
        <p>Loading data...</p>
      )}
    </form>
  );
};

export default ConfigurationComponent;
