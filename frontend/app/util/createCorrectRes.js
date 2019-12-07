import ImageResizer from 'react-native-image-resizer';

const createCorrectRes = async (originalPath, imageRes) => {
    let respURI = originalPath;
    switch (imageRes) {
        case 'High':
            respURI =  await ImageResizer.createResizedImage(originalPath, 640, 480, 'PNG', 100, 0, null); //is saved to a cache folder
            break;
        case 'Low':
            respURI =  await ImageResizer.createResizedImage(originalPath, 640, 480, 'PNG', 100, 0, null); //is saved to a cache folder
            break;
    }
    return respURI;
};

export default createCorrectRes;
