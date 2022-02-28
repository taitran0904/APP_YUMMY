import { useState, useEffect } from "react";
import { Dimensions } from "react-native";
// import DeviceInfo from "react-native-device-info";

const useOrientation = () => {
  const WIDTH_NEED_CHANGE = 700;
  // const isTablet = DeviceInfo.isTablet();

  const [screenInfo, setScreenInfo] = useState(Dimensions.get("window"));

  useEffect(() => {
    const onChange = (result: any) => {
      setScreenInfo(result.window);
    };

    const subscribe = Dimensions.addEventListener("change", onChange);

    return () => subscribe.remove();
  }, []);

  return {
    ...screenInfo,
    windowWidth: screenInfo.width,
    windowHeight: screenInfo.height,
    IPAD: screenInfo.width > WIDTH_NEED_CHANGE,
    // isTabletUI: isTablet && screenInfo.width > screenInfo.height,
  };
};

export default useOrientation;
