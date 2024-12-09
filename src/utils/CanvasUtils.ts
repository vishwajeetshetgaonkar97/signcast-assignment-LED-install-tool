
const getScreenHeightDimension = (selectedConfigurationValues: any) => {
    if (!selectedConfigurationValues.screenMFR) return 0;
    return parseFloat(selectedConfigurationValues.screenMFR?.Height || 0);
}

const getScreenWidthDimension = (selectedConfigurationValues: any) => {
    if (!selectedConfigurationValues.screenMFR) return 0;
    return parseFloat(selectedConfigurationValues.screenMFR.Width || 0)
}

const getScreenDistanceFromFloorLine = (additionalConfiguration: any) => {
    if (!additionalConfiguration.distanceFromFloor) return 0;
    return parseFloat( additionalConfiguration.distanceFromFloor || 0)
}

const getNicheHeight = (selectedConfigurationValues: any, additionalConfiguration: any) => {
    const screenHeightDimension = getScreenHeightDimension(selectedConfigurationValues); 
     const nicheVr =  parseFloat(additionalConfiguration.nicheVr || 0); 
     const nicheHeight = screenHeightDimension + nicheVr; 
     return nicheHeight;
    
}

const getDescriptionContainerTitle = (descriptionConfiguration: any) => {

    if (descriptionConfiguration && descriptionConfiguration.title) {
        return descriptionConfiguration.title;
    }

    return "-";
}

const getDrawerName = (descriptionConfiguration: any) => {

    if (descriptionConfiguration && descriptionConfiguration.drawer) {
        return descriptionConfiguration.drawer;
    }

    return "-";
}

const getDate = (descriptionConfiguration: any) => {

    if (descriptionConfiguration && descriptionConfiguration.date) {
        return descriptionConfiguration.date;
    }

    return "-";
}

const getScreenSizeText = (descriptionConfiguration: any) => {

    if (descriptionConfiguration && descriptionConfiguration.screenSize) {
        return descriptionConfiguration.screenSize;
    }

    return "-";
}

const getDepartmentText = (descriptionConfiguration: any) => {

    if (descriptionConfiguration && descriptionConfiguration.department) {
        return descriptionConfiguration.department;
    }

    return "-";
}

const getRBoxHeight = (additionalConfiguration: any) => {

    if (additionalConfiguration && additionalConfiguration.rBoxHeight) {
        return additionalConfiguration.rBoxHeight;
    }

    return "-";
}

const getRBoxWidth = (additionalConfiguration: any) => {

    if (additionalConfiguration && additionalConfiguration.rBoxWidth) {
        return additionalConfiguration.rBoxWidth;
    }

    return "-";
}

const getRBoxDepth = (additionalConfiguration: any) => {

    if (additionalConfiguration && additionalConfiguration.rBoxDepth) {
        return additionalConfiguration.rBoxDepth;
    }

    return "-";
}

export default getDescriptionContainerTitle
export { getDescriptionContainerTitle, getDrawerName, getDate, 
    getScreenSizeText, getDepartmentText, getRBoxHeight, getRBoxWidth, getRBoxDepth, 
    getScreenHeightDimension,getScreenWidthDimension ,getScreenDistanceFromFloorLine, getNicheHeight
}