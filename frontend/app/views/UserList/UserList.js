
import React, { useMemo, useState, useEffect } from 'react';
import {
    Text,
    View,
} from 'react-native';
import userService from '../../services/userService';

// Users are stored as IDs, but we want their
// names (and possibly other data) to be displayed.
// This component performs the conversion from and ID list to
// the displayed users.
function UserList({ displayUsers }) {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function fetchUsers() {
            const fetched = await userService.getAll();
            setUsers(fetched);
        }

        fetchUsers();
    }, []);

    const rendered = useMemo(() => {
        if (!users || !users.length) {
            return [];
        }
        if (!displayUsers || !displayUsers.length) {
            return [];
        }
        return displayUsers.map(id => users.find(usr => usr.id === id));
    }, [users, displayUsers]);

    return (
        <View>
            {rendered.map(user =>
                <Text key={user.id}>{user.name}</Text>
            )}
        </View>
    );
}

export default UserList;
