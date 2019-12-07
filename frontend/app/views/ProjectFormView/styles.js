import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    outerContainer: {
        flex: 1,
    },
    container: {
        flexDirection: 'column',
        padding: 20,
    },
    keyword: {
        marginRight: 10,
        backgroundColor: 'purple',
        borderRadius: 20,
        padding: 15,
        color: 'white',
    },
    keywordsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 5,
    },
    icon: {
        width: 100,
        height: 100,
        marginTop: 5,
        marginBottom: 15,
    },
    label: {
        fontWeight: 'bold',
    },
});
