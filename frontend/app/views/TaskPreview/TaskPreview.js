import React, { useContext } from 'react';
import {
	Text,
	TouchableOpacity,
	Alert
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import styles from './styles';
import TasksContext from '../../contexts/TasksContext';

/*Offers a preview of a task in a list of tasks. Contains only essential
  information, as the goal is to keep the preview small enough to be usable
  within a list of tasks.*/
function TaskPreview({
	task,
	onPress,
}) {
	const { updateStatus } = useContext(TasksContext);

	// TODO: This needs spec.
	const onStatusChange = (value) => {
		let status = value ? 'COMPLETED' : 'PENDING';
		const result = updateStatus(task, status);
		if (!result) {
			Alert.alert(
				'Setting project status failed',
				'Try another time.',
				[{ text: 'OK', onPress: () => {}}],
			);
		}
	};

	return (
		<TouchableOpacity
			style={styles.container}
			onPress={onPress}
		>
			<CheckBox value={task.status === 'COMPLETED'}
				onValueChange={onStatusChange}/>
			<Text style={styles.description}>
				{task.description}
			</Text>
		</TouchableOpacity>
	);
}

export default TaskPreview;
