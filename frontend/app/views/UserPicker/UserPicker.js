import React, { useState, useEffect } from 'react';
import {
    Picker,
    ActivityIndicator,
    Text,
} from 'react-native';
import projectService from '../../services/projectService';
import styles from './styles';

// A wrapper component for user picker. This is to isolate
// the user fetching logic into its own component.
function UserPicker({
    selectedUser,
    onSelectCallback,
    defaultLabel,
    projectId,
}) {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchUsers() {
            setLoading(true);
            const fetched = await projectService.getMembersByProjectId(projectId);
            if (fetched) {
                setUsers(fetched);
            }
            setLoading(false);
        }

        fetchUsers();
    }, [projectId]);

    return (
        loading ?
        <ActivityIndicator /> :
        (users.length > 0
        ? <Picker
                selectedValue={selectedUser}
                onValueChange={(id) => {
                    // Don't select the default label.
                    if (id !== -1) {
                        onSelectCallback(id);
                    }
                }}
            >
                {defaultLabel &&
                    <Picker.Item
                        value={-1}
                        label={defaultLabel}/>}
                {users.map(user =>
                    <Picker.Item
                        key={user.id}
                        label={'  \u2022  ' + user.name}
                        value={user.id}/>
                )}
            </Picker>
        : <Text style={styles.noMembers}>
            Failed to fetch project members
        </Text>)
    );
}

export default UserPicker;
