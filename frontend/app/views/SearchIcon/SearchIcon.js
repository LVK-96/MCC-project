import React from 'react';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

function SearchIcon(props) {
    return (
        <Icon name="search1"
            size={20}
            {...props}
            />
    );
}

export default SearchIcon;
