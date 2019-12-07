import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';

function SettingsIcon(props) {
    return (
        <Icon name="setting"
            size={50}
            color="gray"
            {...props}
            />
    );
}

export default SettingsIcon;
