import React, { useState, useContext } from 'react';
import {
    View,
    Text,
    TextInput,
    DatePickerAndroid,
    TouchableOpacity,
    Image,
    Alert,
    ScrollView,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import {
    Header,
} from 'react-native-elements';
import {
    withNavigation,
} from 'react-navigation';
import styles from './styles';
import ProjectContext from '../../contexts/ProjectContext';
import SettingsContext from '../../contexts/SettingsContext';
import formValidators from '../../util/formValidators';
import AuthenticationContext from '../../contexts/AuthenticationContext';

// Component that renders the project form for creating a new project.
function ProjectFormView({ navigation }) {
    // State.
    const [iconSource, setIconSource] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [deadline, setDeadline] = useState('Press to select deadline date.');
    const [keywordInput, setKeywordInput] = useState('');
    const [keywords, setKeywords] = useState([]);

    // We create the project through the project provider.
    const context = useContext(ProjectContext);
    const settingsContext = useContext(SettingsContext);
    const authContext = useContext(AuthenticationContext);

    const handleDateSelection = async () => {
        try {
            // Get user inputted date from Android datepicker.
            const { action, year, month, day } = await DatePickerAndroid.open();
            if (action !== DatePickerAndroid.dismissedAction) {
                const date = new Date();
                date.setFullYear(year);
                date.setMonth(month);
                date.setDate(day);
                setDeadline(date.toString());
            }
        } catch (error) {
            console.log('Error selecting deadline date', error);
        }
    };

    const handleKeywordAdding = async () => {
        if (keywordInput.length > 0 && keywords.length < 3) {
            setKeywords(prevState => [keywordInput, ...prevState]);
        }
        setKeywordInput('');
    };

    const handleIconPress = () => {
        const options = {
            title: 'Select project icon',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };

        ImagePicker.launchImageLibrary(options, response => {
            if (!response.didCancel && !response.error) {
                setIconSource(response.uri);
            } else {
                console.log('Image picking failed: ', response);
            }
        });
    };

    const handleSavePress = async () => {
        const project = {
            iconSource,
            name,
            description,
            deadline,
            keywords,
        };

        // Project information is valid.
        if (formValidators.projectIsValid(project)) {
            const creationSuccessful = await context.createProject(project, settingsContext.imageRes);
            // If project was created succesfully, go back to projects view.
            if (creationSuccessful) {
                navigation.navigate('ProjectList');
            } else {
                Alert.alert(
                    'Project creation failed', ''
                );
            }
        }
    };

    return (
        <ScrollView style={styles.outerContainer}>
            <Header
                leftComponent={{ text: 'X', style: { color: '#fff' } }}
                centerComponent={{ text: 'New project', style: { color: '#fff', left: 0 } }}
                rightComponent={
                    <TouchableOpacity onPress={handleSavePress}>
                        <Text>SAVE</Text>
                    </TouchableOpacity>
                }
            />
            <View style={styles.container}>
                <View>
                    <Text style={styles.label}>Icon</Text>
                    <TouchableOpacity onPress={handleIconPress}>
                        <Image
                            style={styles.icon}
                            source={{
                                uri: iconSource ? iconSource :
                                    'https://reactnativecode.com/wp-content/uploads/2018/02/Default_Image_Thumbnail.png'
                            }} />
                    </TouchableOpacity>
                </View>
                <View>
                    <Text style={styles.label}>Name</Text>
                    <TextInput
                        value={name}
                        placeholder="Name here..."
                        onChangeText={text => setName(text)} />
                </View>
                <View>
                    <Text style={styles.label}>Description</Text>
                    <TextInput
                        value={description}
                        placeholder="Description here..."
                        onChangeText={text => setDescription(text)} />
                </View>
                <View>
                    <Text style={styles.label}>Deadline</Text>
                    <TouchableOpacity onPress={handleDateSelection}>
                        <View pointerEvents={'none'}>
                            <TextInput
                                editable={false}
                                value={deadline} />
                        </View>
                    </TouchableOpacity>
                </View>
                <View>
                    <Text style={styles.label}>Keywords</Text>
                    <TextInput
                        value={keywordInput}
                        onChangeText={text => setKeywordInput(text)}
                        onSubmitEditing={handleKeywordAdding}
                        placeholder="Add keyword" />
                    <View style={styles.keywordsContainer}>
                        {keywords.map((keyword, index) =>
                            <Text
                                key={index}
                                style={styles.keyword}>
                                {keyword}
                            </Text>
                        )}
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

export default withNavigation(ProjectFormView);
