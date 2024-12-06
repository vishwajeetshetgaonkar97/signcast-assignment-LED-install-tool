import React, { useState, useEffect, useMemo } from "react";
import FabricCanvas from "../FabricCanvas/FabricCanvas";
import ConfigurationComponent from "../ConfigurationComponent/ConfigurationComponent";
import { fetchGoogleSheetData } from "./../../api/fetchGoogleSheetData"; 
import { ScreenMFR, MediaPlayerMFR, Mounts, ReceptacleBox } from "../../types/GoogleSheetDataTypes";
import ScreenMFRDataContext from "../../Contexts/ScreenMFRDataContext";


const DrawingToolComponent = () => {
  const [screenMFRData, setScreenMFRData] = useState<ScreenMFR[]>([]);
  const [mediaPlayerMFRData, setMediaPlayerMFRData] = useState<MediaPlayerMFR[]>([]);
  const [mountsData, setMountsData] = useState<Mounts[]>([]);
  const [receptacleBoxData, setReceptacleBoxData] = useState<ReceptacleBox[]>([]);

  const fetchDatabaseData = async () => {
    try {
      const data = await fetchGoogleSheetData(); 
      setScreenMFRData(data.screenMFRData); 
      setMediaPlayerMFRData(data.mediaPlayerMFRData);
      setMountsData(data.mountsData);
      setReceptacleBoxData(data.receptacleBoxData);

      console.log("Fetched Data:", data);
    } catch (error) {
      console.error("Error fetching data from Google Apps Script:", error);
    }
  };

  useEffect(()  => {
    fetchDatabaseData(); 
  }, []); 

  const ScreenMFRDataContextValue = useMemo(
    () => ({ screenMFRData, setScreenMFRData }),
    [screenMFRData, setScreenMFRData],
  );

  return (
    <>
    <ScreenMFRDataContext.Provider value={ScreenMFRDataContextValue}>
    <div className="flex h-full pb-2 align-center justify-center w-full gap-4">
      <FabricCanvas />
      <ConfigurationComponent />
    </div>
    </ScreenMFRDataContext.Provider>
    </>
  );
};

export default DrawingToolComponent;
