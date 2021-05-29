import Constants from "expo-constants";
import * as Permissions from "expo-permissions";

export const getCameraPermission = async () => {
  if (Constants.platform.ios) {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    if (status != "granted") {
      alert("we need permission");
    }
  }
};
