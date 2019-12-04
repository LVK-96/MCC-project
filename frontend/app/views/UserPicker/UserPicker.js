import React, { useState, useEffect } from 'react';
import {
    Picker,
} from 'react-native';
import userService from '../../services/userService';

// A wrapper component for user picker. This is to isolate
// the user fetching logic into its own component.
function UserPicker({
    selectedUser,
    onSelectCallback,
    defaultLabel,
}) {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function fetchUsers() {
            const fetched = await userService.getAll();
            setUsers(fetched);
        }

        fetchUsers();
    }, []);

    return (
        <Picker
            selectedValue={selectedUser}
            onValueChange={(id) => {
                // Don't select the default label.
                if (id !== -1) {
                    onSelectCallback(id);
                }
            }}
        >
            {defaultLabel &&
                <Picker.Item value={-1}
                    label={defaultLabel}/>}
            {users.map(user =>
                <Picker.Item
                    key={user.id}
                    label={user.name}
                    value={user.id}/>
            )}
        </Picker>
    );
}

export default UserPicker;
