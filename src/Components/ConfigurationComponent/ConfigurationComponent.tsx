import React, { useEffect, useState } from "react";
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
  const [selectedValues, setSelectedValues] = useState<Record<string, string>>({});

  // Load CSV and parse it
  useEffect(() => {
    Papa.parse("/database/data.csv", {
      download: true,
      header: true,
      complete: (result) => {
        const parsedData = result.data.map((row: any) => ({
          screenMFR: row["Screen MFR"],
          make: row["Make"],
          screenSize: parseFloat(row["Screen Size"]),
          height: parseFloat(row["Height"]),
          width: parseFloat(row["Width"]),
          depth: parseFloat(row["Depth"]),
          weight: parseFloat(row["Weight (LBS)"]),
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
  const getFieldOptions = (field: keyof Database) => {
    return Array.from(new Set(data.map((row) => String(row[field]))));
  };

  console.log("dataaaaaaaaa",data)
  
  return (
    <form className="max-w-md mx-auto space-y-4">
      {data.length > 0 ? (
        <>
          {Object.keys(data[0]).map((field) => (
            <div key={field}>
              <label
                htmlFor={field}
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Select {field}
              </label>
              <select
                id={field}
                value={selectedValues[field] || ""}
                onChange={(e) => handleSelectionChange(field as keyof Database, e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="">Select {field}</option>
                {getFieldOptions(field as keyof Database).map((option, index) => (
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
