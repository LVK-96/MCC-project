import storage from '@react-native-firebase/storage';
import AuthenticationContext from '../contexts/AuthenticationContext';

export const applyResSetting = (url) => {
    var ref = storage().refFromURL(url);
    switch (AuthenticationContext.imageRes) {
        case 'low':
            const tmpLow = ref.fullPath.split('.');
            const lowPath = tmpLow[0] + '_640x480' + tmpLow[1];
            const lowRef = storage().ref(lowPath);
            return lowRef.getDownloadURL();
        
        case 'high':
            const tmpHigh = ref.fullPath.split('.');
            const highPath = tmpHigh[0] + '_1280x960' + tmpHigh[1];
            const highRef = storage().ref(highPath);
            return highRef.getDownloadURL();
        
        case 'full':
            return url;
        
        default:
            return url;
    }
};
