import ImageResizer from 'react-native-image-resizer';

const createCorrectRes = async (originalPath, imageRes) => {
    let respURI = originalPath;
    switch (imageRes) {
        case 'high':
            respURI =  await ImageResizer.createResizedImage(originalPath, 1280, 960, 'PNG', 100, 0, null); //is saved to a cache folder
            respURI = respURI.path;
            break;
        case 'low':
            respURI =  await ImageResizer.createResizedImage(originalPath, 640, 480, 'PNG', 100, 0, null); //is saved to a cache folder
            respURI = respURI.path;
            break;
    }
    return respURI;
};

export default createCorrectRes;
