import React, { useContext, useState, useEffect } from 'react';
import {
	View,
	Text,
	ActivityIndicator,
	ScrollView,
	TouchableOpacity,
	Alert,
} from 'react-native';
import ProjectContext from '../../contexts/ProjectContext';
import PlusIcon from '../PlusIcon';
import colors from '../../values/colors';
import projectService from '../../services/projectService';
import styles from './styles';
import FilePickerManager from 'react-native-file-picker';
import storage from '@react-native-firebase/storage';
import RNFetchBlob from 'rn-fetch-blob';

const supportedTypes = ['pdf', 'mp3', 'txt', 'jpg', 'png'];
function ProjectFiles() {
	const { selectedProject, addFile } = useContext(ProjectContext);
	const [files, setFiles] = useState(null);

	// Re-fetch the files when the selected project changes.
	useEffect(() => {

		async function fetchFiles(id) {
			const fetched = await projectService.getFilesByProjectId(id);
			setFiles(fetched);
		}

		if (selectedProject) {
			fetchFiles(selectedProject.id);
		}

	}, [selectedProject]);

	const handleFileUpload = async () => {
		FilePickerManager.showFilePicker(null, async res => {
			if (res.didCancel || res.error) {
				console.log('Failed to pick file');
				return;
			}

			const file = {
				name: res.name,
				path: res.path,
			};

			try {
				const format = res.path.split('.').reverse()[0];
				if (!supportedTypes.includes(format)) {
					return;
				}
				const ret = await addFile(selectedProject, file);
				setFiles(prev => [...prev, ret]);
			} catch (e) {
				Alert.alert('Failed to upload file');
			}
		});
	};

	const handleFileDownload = async (file) => {
		try {
			const storageRef = storage().refFromURL(file.source);
			const url = await storageRef.getDownloadURL();
			const dirs = RNFetchBlob.fs.dirs;
			RNFetchBlob.config({ path: dirs.DocumentDir })
				.fetch('GET', url);
		} catch (exception) {
			Alert.alert('Failed to download file ' + file.name);
		}
	};

	const header = (
		<Text style={styles.headerText}>
			Project files
		</Text>
	);

	const contentArea = files ? (
		<ScrollView style={styles.contentArea}>
			{header}
			{files.length > 0 ?
			files.map(file =>
				// TODO: Only use uuid as key.
				<View key={file.uid}>
					<TouchableOpacity onPress={() => handleFileDownload(file)}>
						<Text>{file.name}</Text>
					</TouchableOpacity>
				</View>
			) :
			<Text styles={styles.noFiles}>
				This project has no attached files
			</Text>}
			{<View style={styles.filesBottom}/>}
		</ScrollView>
	) : (<View >
			<ActivityIndicator size="large" color={colors.corporateBlue} />
		</View>);

	return (
		<View style={styles.container}>
			{contentArea}
			<TouchableOpacity onPress={handleFileUpload}
				style={styles.buttonContainer}>
				<PlusIcon />
			</TouchableOpacity>
		</View>
	);
}

export default ProjectFiles;
