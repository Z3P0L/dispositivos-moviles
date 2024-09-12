import React from 'react';
import { View, Text, Image, ScrollView, useWindowDimensions } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Translate from '../components/Translate';
import RenderHtml from 'react-native-render-html';

export default function Item() {
    const route = useRoute();
    const { recipe } = route.params;
    const { width } = useWindowDimensions();

    return (
        <ScrollView style={{ flex: 1, padding: 10 }}>
            <Image
                source={{ uri: recipe.image }}
                style={{ width: '100%', height: 200 }}
            />
            <Translate text={recipe.title} targetLanguage="ES">
                {(translatedTitle) => (
                    <Text style={{ fontSize: 24, fontWeight: 'bold', marginVertical: 10 }}>
                        {translatedTitle}
                    </Text>
                )}
            </Translate>
            <Text style={{ fontSize: 18 }}>Tiempo de preparación: {recipe.readyInMinutes} minutos</Text>
            <Text style={{ fontSize: 18 }}>Precio por porción: ${recipe.pricePerServing}</Text>

            <Text style={{ fontSize: 20, fontWeight: 'bold', marginVertical: 10 }}>Ingredientes:</Text>
            {recipe.extendedIngredients?.map((ingredient, index) => (
                <Translate key={index} text={ingredient.original} targetLanguage="ES">
                    {(translatedIngredient) => (
                        <Text style={{ fontSize: 16 }}>
                            • {translatedIngredient}
                        </Text>
                    )}
                </Translate>
            ))}

            <Text style={{ fontSize: 20, fontWeight: 'bold', marginVertical: 10 }}>Instrucciones:</Text>
            {recipe.instructions ? (
                <Translate text={recipe.instructions} targetLanguage="ES">
                    {(translatedInstructions) => (
                        <RenderHtml
                            contentWidth={width}
                            source={{ html: translatedInstructions }}
                        />
                    )}
                </Translate>
            ) : (
                <Text style={{ fontSize: 16 }}>No hay instrucciones disponibles.</Text>
            )}
        </ScrollView>
    );
}
