import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    DatePickerAndroid,
    TouchableOpacity,
} from 'react-native';
import styles from './styles';

function ProjectFormView() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [deadline, setDeadline] = useState('Press to select date.');
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
                setDeadline(date);
            }
        } catch (error) {
            console.log('Error selecting deadline date', error);
        }
    };

    const handleKeywordAdding = async () => {
        setKeywords(prevState => prevState.length < 3 ? [keywordInput, ...prevState] : prevState);
        setKeywordInput('');
    };

    return (
        <View style={styles.container}>
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
                        value={deadline.toString()} />
                </View>
            </TouchableOpacity>
            <TextInput
                value={keywordInput}
                onChangeText={text => setKeywordInput(text)}
                onSubmitEditing={handleKeywordAdding}
                placeholder="Add keyword"/>
            {keywords.map(keyword =>
                <Text style={styles.keyword}>
                    {keyword}
                </Text>
            )}
        </View>
    );
}

export default ProjectFormView;
