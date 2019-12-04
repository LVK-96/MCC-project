import React, { useContext } from 'react';
import {
	Text,
	TouchableOpacity,
	CheckBox,
	Alert
} from 'react-native';
import styles from './styles';
import TasksContext from '../../contexts/TasksContext';

/*Offers a preview of a project in a project list. Contains only essential
  information, as the goal is to keep the preview small enough to be usable
  within a list of projects.*/
function TaskPreview({
	task,
	onPress,
}) {
	const { updateTask } = useContext(TasksContext);

	// TODO: This needs spec.
	const onStatusChange = (value) => {
		if (value) {
			task.status = 'COMPLETED';
		} else {
			task.status = 'PENDING';
		}
		const result = updateTask(task.id, task);
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
