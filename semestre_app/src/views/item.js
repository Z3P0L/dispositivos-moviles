import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, useWindowDimensions, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Translate from '../components/Translate';
import RenderHtml from 'react-native-render-html';

const apiKey = '44de5da064b443ed80731ef881de9c00';

export default function Item() {
    const route = useRoute();
    const { recipeId } = route.params;
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { width } = useWindowDimensions();

    useEffect(() => {
        const fetchRecipe = async () => {
            setLoading(true);
            try {
                const response = await fetch(
                    `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${apiKey}`
                );
                if (!response.ok) {
                    throw new Error('Error fetching recipe details');
                }
                const data = await response.json();
                setRecipe(data);
            } catch (error) {
                console.error('Error fetching recipe details:', error);
                setError('No se pudo cargar los detalles de la receta.');
            } finally {
                setLoading(false);
            }
        };

        fetchRecipe();
    }, [recipeId]);

    if (loading) {
        return <Text>Cargando...</Text>;
    }

    if (error) {
        return <Text>{error}</Text>;
    }

    if (!recipe) {
        return <Text>No se encontró la receta.</Text>;
    }

    return (
        <ScrollView style={styles.container}>
            <Image
                source={{ uri: recipe.image }}
                style={styles.image}
            />
            <Translate text={recipe.title} targetLanguage="ES">
                {(translatedTitle) => (
                    <Text style={styles.title}>{translatedTitle}</Text>
                )}
            </Translate>
            <Text style={styles.details}>
                <Translate text={`Tiempo de preparación: ${recipe.readyInMinutes} minutos`} targetLanguage="ES">
                    {(translatedText) => translatedText}
                </Translate>
            </Text>
            <Text style={styles.details}>
                <Translate text={`Precio por porción: $${recipe.pricePerServing}`} targetLanguage="ES">
                    {(translatedText) => translatedText}
                </Translate>
            </Text>
            <Text style={styles.subtitle}>Ingredientes:</Text>
            {recipe.extendedIngredients?.map((ingredient, index) => (
                <Translate key={index} text={ingredient.original} targetLanguage="ES">
                    {(translatedIngredient) => (
                        <Text style={styles.ingredient}>• {translatedIngredient}</Text>
                    )}
                </Translate>
            ))}
            <Text style={styles.subtitle}>Instrucciones:</Text>
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
                <Text>No hay instrucciones disponibles.</Text>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff',
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 8,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    details: {
        fontSize: 18,
        marginVertical: 5,
        color: '#7f8c8d',
    },
    subtitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    ingredient: {
        fontSize: 16,
        marginVertical: 2,
    },
});
