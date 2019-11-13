import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';

// This component is re-used enough to justify being in it's own file.
function PlusIcon(props) {
    return (
        <Icon name="pluscircle"
            size={50}
            color="blue"
            {...props}
            />
    );
}

export default PlusIcon;
