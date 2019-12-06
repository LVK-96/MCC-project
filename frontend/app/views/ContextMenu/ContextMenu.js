import React from 'react';
import {
  Menu,
  MenuTrigger,
  MenuOptions,
  MenuOption,
} from 'react-native-popup-menu';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

/*A component that displays a small contextual menu triggered by a menu icon.*/
function ContextMenu({
  options,
}) {
  return (
    <Menu onSelect={index => options[index].onSelect()}>
      <MenuTrigger>
        <Icon name="options-vertical" size={22}/>
      </MenuTrigger>
      <MenuOptions>
        {
          options.map((option, index) =>
            <MenuOption key={index} value={index} text={option.text}/>
          )
        }
      </MenuOptions>
    </Menu>
  );
}

export default ContextMenu;
