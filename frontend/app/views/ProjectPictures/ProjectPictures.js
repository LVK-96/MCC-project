import React, { useContext, useState, useEffect } from 'react';
import {
	View,
	Text,
	ActivityIndicator,
	ScrollView,
	TouchableOpacity,
	Alert,
	Image,
} from 'react-native';
import ProjectContext from '../../contexts/ProjectContext';
import PlusIcon from '../PlusIcon';
import colors from '../../values/colors';
import projectService from '../../services/projectService';
import styles from './styles';
import ImagePicker from 'react-native-image-picker';

function ProjectPictures() {

	const { selectedProject, addFile } = useContext(ProjectContext);
	const [pictures, setPictures] = useState(null);

	// Re-fetch the pictures when the selected project changes
	useEffect(() => {

		async function fetchImages(id) {
			const images = await projectService.getImagesByProjectId(id);
			setPictures(images);
		}

		if (selectedProject) {
			fetchImages(selectedProject.id);
		}

	}, [selectedProject]);

	const handlePictureUpload = async () => {
		const options = {
			title: 'Select profile picture',
			storageOptions: {
				skipBackup: true,
				path: 'images',
			},
		};

		ImagePicker.launchImageLibrary(options, async (res) => {
			if (res.didCancel || res.error) {
				return;
			}

			const image = {
				name: res.fileName,
				path: res.path,
			};

			try {
				const picture = await addFile(selectedProject, image);
				if (picture !== null) {
					setPictures(prev => [...prev, picture]);
				} else {
					Alert.alert('Failed to upload image');
				}
			} catch (error) {
				Alert.alert('Failed to upload image');
			}
		});
	};

	const handlePictureDownload = async (picture) => {
		//TODO: Fill this in (see ProjectFiles for guidance)
	};

	const header = (
		<Text style={styles.headerText}>
			Project pictures
  		</Text>
	);

	const contentArea = pictures ? (
		<ScrollView style={styles.contentArea}>
			{header}
			{pictures.length > 0 ?
				pictures.map((picture, index) =>
					/*TODO: Replace with actual key, index is not sufficient*/
					<View key={index}>
						<TouchableOpacity onPress={() => handlePictureDownload(picture)}>
							<Image source={picture.source} />
						</TouchableOpacity>
					</View>
				) :
				<Text styles={styles.noPictures}>
					This project has no attached pictures
  			</Text>}
			{<View style={styles.picturesBottom} />}
		</ScrollView>
	) : (<View >
		<ActivityIndicator size="large" color={colors.corporateBlue} />
	</View>);

	return (
		<View style={styles.container}>
			{contentArea}
			<TouchableOpacity onPress={handlePictureUpload}
				style={styles.buttonContainer}>
				<PlusIcon />
			</TouchableOpacity>
		</View>
	);
}

export default ProjectPictures;
