import { createNavigationContainerRef } from "@react-navigation/native";

export const navigationRef = createNavigationContainerRef();

// Fonction permettant de naviguer entre les pages
export function navigate(name, params) {
    if (navigationRef.isReady()) {
        navigationRef.navigate(name, params);
        //console.log("navigate : " + name + ":" + params);
    }
}
