import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import Translate from './Translate';

export default function SearchFilter({ onSearch }) {
    const [searchText, setSearchText] = useState('');

    const handleSearch = (translatedText) => {
        onSearch(translatedText);
    };

    return (
        <View style={{ flexDirection: 'row', marginBottom: 10 }}>
            <TextInput
                style={{
                    flex: 1,
                    borderWidth: 1,
                    borderColor: '#ccc',
                    padding: 10,
                    marginRight: 10
                }}
                placeholder="Buscar recetas"
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
