import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    DatePickerAndroid,
    TouchableOpacity,
    Image,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import styles from './styles';

// Component that renders the project form for creating a new project.
function ProjectFormView() {
    // State.
    const [iconSource, setIconSource] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [deadline, setDeadline] = useState('Press to select deadline date.');
    const [keywordInput, setKeywordInput] = useState('');
    const [keywords, setKeywords] = useState([]);

    const handleDateSelection = async () => {
        try {
            const { action, year, month, day } = await DatePickerAndroid.open();
            if (action !== DatePickerAndroid.dismissedAction) {
                const date = new Date();
                date.setFullYear(year);
                date.setMonth(month);
                date.setDate(day);
                setDeadline(date.toISOString());
            }
        } catch (error) {
            console.log('Error selecting deadline date', error);
        }
    };

    const handleKeywordAdding = async () => {
        setKeywords(prevState => prevState.length < 3 ? [keywordInput, ...prevState] : prevState);
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

    return (
        <View style={styles.container}>
            <View>
                <TouchableOpacity onPress={handleIconPress}>
                    <Image
                        style={styles.icon}
                        source={{
                            uri:
                            'https://reactnativecode.com/wp-content/uploads/2018/02/Default_Image_Thumbnail.png'}}/>
                </TouchableOpacity>
                <Text>Icon</Text>
            </View>
            <TextInput
                value={name}
                placeholder="Name"
                onChangeText={text => setName(text)} />
            <TextInput
                value={description}
                placeholder="Description"
                onChangeText={text => setDescription(text)} />
            <Text>Deadline</Text>
            <TouchableOpacity onPress={handleDateSelection}>
                <View pointerEvents={'none'}>
                    <TextInput
                        editable={false}
                        value={deadline} />
                </View>
            </TouchableOpacity>
            <TextInput
                value={keywordInput}
                onChangeText={text => setKeywordInput(text)}
                onSubmitEditing={handleKeywordAdding}
                placeholder="Add keyword"/>
            {keywords.map((keyword, index) =>
                <Text
                    key={index}
                    style={styles.keyword}>
                    {keyword}
                </Text>
            )}
        </View>
    );
}

export default ProjectFormView;
