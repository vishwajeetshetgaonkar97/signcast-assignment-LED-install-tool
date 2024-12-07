import React, { useState, useEffect, useMemo } from "react";
import FabricCanvas from "../FabricCanvas/FabricCanvas";
import ConfigurationSectionComponent from "../ConfigurationSectionComponent/ConfigurationSectionComponent";
import { fetchGoogleSheetData } from "./../../api/fetchGoogleSheetData";
import {
  ScreenMFR,
  MediaPlayerMFR,
  Mounts,
  ReceptacleBox,
  AdditionalConfiguration,
  DescriptionConfig,
} from "../../types/GoogleSheetDataTypes";
import ScreenMFRDataContext from "../../Contexts/ScreenMFRDataContext";
import MediaPlayerMFRDataContext from "../../Contexts//MediaPlayerMFRDataContext";
import MountsDataContext from "../../Contexts/MountsDataContext";
import ReceptacleBoxDataContext from "../../Contexts/ReceptacleBoxDataContext";
import SelectedConfigurationContext from "../../Contexts/SelectedConfigurationContext";
import AdditionalConfigurationContext from "../../Contexts/AdditionalConfigurationContext";
import DescripotionDataContext from "../../Contexts/DescripotionDataContext";

const DrawingToolComponent = () => {
  const [screenMFRData, setScreenMFRData] = useState<ScreenMFR[]>([]);
  const [mediaPlayerMFRData, setMediaPlayerMFRData] = useState<MediaPlayerMFR[]>([]);
  const [mountsData, setMountsData] = useState<Mounts[]>([]);
  const [receptacleBoxData, setReceptacleBoxData] = useState<ReceptacleBox[]>([]);

  const [selectedConfiguration, setSelectedConfiguration] = useState<{
    screenMFR?: ScreenMFR;
    mediaPlayerMFR?: MediaPlayerMFR;
    mount?: Mounts;
    receptacleBox?: ReceptacleBox;
  }>({});

  const [additionalConfiguration, setAdditionalConfiguration] = useState<AdditionalConfiguration>({
    orientation: "vertical",
    nicheType: "flat wall",
    distanceFromFloor: 0,
    nicheDepth: 0,
    rBoxHeight: 6.6,
    rBoxWidth: 6.012,
    rBoxDepth: 3.75,
  });

  const [descriptionConfiguration, setDescriptionConfiguration] = useState<DescriptionConfig>({
    title: "",
    drawer: "",
    department: "",
    screenSize: "",
    date: new Date().toISOString().split('T')[0],
  });


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

  useEffect(() => {
    fetchDatabaseData();
  }, []);

  const ScreenMFRDataContextValue = useMemo(
    () => ({ screenMFRData, setScreenMFRData }),
    [screenMFRData, setScreenMFRData]
  );

  const MediaPlayerMFRDataContextValue = useMemo(
    () => ({ mediaPlayerMFRData, setMediaPlayerMFRData }),
    [mediaPlayerMFRData, setMediaPlayerMFRData]
  );

  const MountsDataContextValue = useMemo(
    () => ({ mountsData, setMountsData }),
    [mountsData, setMountsData]
  );

  const ReceptacleBoxDataContextValue = useMemo(
    () => ({ receptacleBoxData, setReceptacleBoxData }),
    [receptacleBoxData, setReceptacleBoxData]
  );

  const SelectedConfigurationContextValue = useMemo(
    () => ({ selectedConfiguration, setSelectedConfiguration }),
    [selectedConfiguration, setSelectedConfiguration]
  );

  const AdditionalConfigurationContextValue = useMemo(
    () => ({ additionalConfiguration, setAdditionalConfiguration }),
    [additionalConfiguration, setAdditionalConfiguration]
  );

  const DescriptionConfigurationContextValue = useMemo(
    () => ({ descriptionConfiguration, setDescriptionConfiguration }),
    [descriptionConfiguration, setDescriptionConfiguration]
  );

  return (
    <>
      <ScreenMFRDataContext.Provider value={ScreenMFRDataContextValue}>
        <MediaPlayerMFRDataContext.Provider value={MediaPlayerMFRDataContextValue}>
          <MountsDataContext.Provider value={MountsDataContextValue}>
            <ReceptacleBoxDataContext.Provider value={ReceptacleBoxDataContextValue}>
              <SelectedConfigurationContext.Provider value={SelectedConfigurationContextValue}>
                <AdditionalConfigurationContext.Provider value={AdditionalConfigurationContextValue}>
                  <DescripotionDataContext.Provider value={DescriptionConfigurationContextValue}>

                    <div className="flex h-full pb-2 align-center justify-center w-full gap-4">
                      <FabricCanvas />
                      <ConfigurationSectionComponent />
                    </div>

                  </DescripotionDataContext.Provider>
                </AdditionalConfigurationContext.Provider>
              </SelectedConfigurationContext.Provider>
            </ReceptacleBoxDataContext.Provider>
          </MountsDataContext.Provider>
        </MediaPlayerMFRDataContext.Provider>
      </ScreenMFRDataContext.Provider>
    </>
  );
};

export default DrawingToolComponent;
