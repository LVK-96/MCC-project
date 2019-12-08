import React, { useContext, useState, useEffect, setState } from 'react';
import {
	View,
	Text,
	ActivityIndicator,
	ScrollView,
	TouchableOpacity,
	Alert,
	Image,
	FlatList,
} from 'react-native';
import ProjectContext from '../../contexts/ProjectContext';
import PlusIcon from '../PlusIcon';
import colors from '../../values/colors';
import projectService from '../../services/projectService';
import styles from './styles';
import ImagePicker from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import RNFetchBlob from 'rn-fetch-blob';
import fetchCorrectRes from '../../util/fetchCorrectRes';

function ProjectPictures() {
	const { selectedProject, addFile } = useContext(ProjectContext);
	const [pictures, setPictures] = useState([]);
	const [correctUris, setUris] = useState([]);

	// Re-fetch the pictures when the selected project changes
	useEffect(() => {
		console.log('use effect');
		async function fetchImages(id) {
			const images = await projectService.getImagesByProjectId(id);
			setPictures(images);
		}

		if (selectedProject) {
			fetchImages(selectedProject.id);
		}

	}, [selectedProject]);

	useEffect(() => {
		console.log('callback for pictures');
		async function fetchUris(){
			console.log('async part');
			console.log(pictures);
			const uris = await fetchCorrectPictureUri();
			setUris(uris);
		}
		if (pictures){
			fetchUris();
		}
	}, [pictures]);


	const fetchCorrectPictureUri = async () => {
		console.log('fetching correct res');
		let temp = pictures.map(p => fetchCorrectRes(p.source));
		temp = await Promise.all(temp);
		return temp;
	};

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
		try {
			const storageRef = storage().refFromURL(picture.source);
			const url = await storageRef.getDownloadURL();
			const dirs = RNFetchBlob.fs.dirs;
			RNFetchBlob.config({ path: dirs.DocumentDir })
				.fetch('GET', url);
		} catch (exception) {
			Alert.alert('Failed to download file ' + picture.name);
		}
	};

	const getDateString = (dateString) => {
		const date = new Date(dateString);
		const today = new Date();
		const y = date.getFullYear();
		const yt = today.getFullYear();
		const m = date.getMonth();
		const mt = today.getMonth();
		const d = date.getDate();
		const dt = today.getDate();
		if (y === yt && m === mt) {
			if (d === dt) {
				return 'Today';
			} else if (d === dt - 1) {
				return 'Yesterday';
			} else {
				return d + '.' + (m + 1) + '.' + y;
			}
		}
		return d + '.' + (m + 1) + '.' + y;
	};

	const header = (
		<Text style={styles.headerText}>
			Project pictures
  		</Text>
	);

	console.log('test:');
	console.log(pictures);
	console.log('test2:');
	console.log(correctUris);
	//under touchable opacity
	/*<Text style={styles.imageDate}>
			{getDateString(picture.uploaded)}
	</Text>*/

	const contentArea = pictures ? (
		<ScrollView style={styles.contentArea}>
			{header}
			{pictures.length > 0 ?
				<FlatList
					data={correctUris}
					renderItem={ ({ item: picture }) =>
					<View>
						{console.log('this:')}
						{console.log(picture)}
						<TouchableOpacity onPress={() => handlePictureDownload(picture)}>
							<Image source={{uri: picture}}
								style = {{width: 100, height: 100}}
							/>
						</TouchableOpacity>
					</View>}
					keyExtractor={img => img.uid}
				/> :
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
