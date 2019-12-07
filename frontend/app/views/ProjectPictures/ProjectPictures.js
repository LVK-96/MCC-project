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

function ProjectPictures() {

  	const { selectedProject, addFile } = useContext(ProjectContext);
  	const [pictures, setPictures] = useState(null);

  	//TODO: Re-fetch the pictures when the selected project changes
    //(see ProjectFiles for guidance)

  	const handlePictureUpload = async () => {
  		//TODO: Fill this in (see ProjectFiles for guidance)
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
  						<Image source={picture.source}/>
  					</TouchableOpacity>
  				</View>
  			) :
  			<Text styles={styles.noPictures}>
  				This project has no attached pictures
  			</Text>}
  			{<View style={styles.picturesBottom}/>}
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
