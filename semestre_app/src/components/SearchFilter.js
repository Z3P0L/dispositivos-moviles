import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import Translate from './Translate';

export default function SearchFilter({ onSearch }) {
    const [searchText, setSearchText] = useState('');

    const handleSearch = (translatedText) => {
        onSearch(translatedText);
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Buscar recetas..."
                value={searchText}
                onChangeText={setSearchText}
            />
            <Translate text={searchText} targetLanguage="EN">
                {(translatedText) => (
                    <Button title="Buscar" onPress={() => handleSearch(translatedText)} />
                )}
            </Translate>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginBottom: 15,
        paddingHorizontal: 10,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 10,
        fontSize: 16,
        backgroundColor: '#fff',
    },
});
