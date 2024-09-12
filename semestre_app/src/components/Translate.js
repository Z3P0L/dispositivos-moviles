import React, { useState, useEffect } from 'react';
import axios from 'axios';

const deepLApiKey = '723a6474-6822-456d-a800-593d3ef2d079:fx';

const translateText = async (text, targetLanguage = 'ES') => {
    try {
        const response = await axios.post('https://api-free.deepl.com/v2/translate', new URLSearchParams({
            auth_key: deepLApiKey,
            text: text,
            target_lang: targetLanguage
        }), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        return response.data.translations[0].text;
    } catch (error) {
        console.error('Error translating text:', error);
        return text;
    }
};

const Translate = ({ text, targetLanguage, children }) => {
    const [translatedText, setTranslatedText] = useState(text);

    useEffect(() => {
        const translate = async () => {
            const result = await translateText(text, targetLanguage);
            setTranslatedText(result);
        };

        translate();
    }, [text, targetLanguage]);

    return children(translatedText);
};

export default Translate;
