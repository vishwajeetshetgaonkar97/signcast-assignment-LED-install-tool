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
    
    
export default getDescriptionContainerTitle
export { getDescriptionContainerTitle ,getDrawerName,getDate,getScreenSizeText,getDepartmentText}