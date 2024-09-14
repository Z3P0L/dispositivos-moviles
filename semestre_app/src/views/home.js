import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SearchFilter from '../components/SearchFilter';
import Translate from '../components/Translate';

const apiKey = '44de5da064b443ed80731ef881de9c00';

export default function Home() {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    const fetchRecipes = async (customQuery = '') => {
        setLoading(true);
        try {
            const response = await fetch(
                `https://api.spoonacular.com/recipes/complexSearch?query=${customQuery}&number=10&apiKey=${apiKey}`
            );
            const data = await response.json();
            setRecipes(prevRecipes => [...prevRecipes, ...data.results]);
        } catch (error) {
            console.error('Error fetching recipes:', error);
            alert('No se pudieron cargar las recetas. Intenta nuevamente más tarde.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRecipes();
    }, []);

    const loadMoreRecipes = () => {
        if (!loading) {
            fetchRecipes();
        }
    };

    const searchRecipes = (query) => {
        setRecipes([]);
        fetchRecipes(query);
    };

    const applyFilter = (filters) => {
        const filterQuery = filters.vegetarian ? 'vegetarian' : '';
        setRecipes([]);
        fetchRecipes(filterQuery);
    };

    const renderRecipeItem = ({ item }) => (
        <TouchableOpacity
            onPress={() => navigation.navigate('Item', { recipeId: item.id })}
            style={styles.itemContainer}
        >
            <Image
                source={{ uri: item.image }}
                style={styles.image}
            />
            <View style={styles.textContainer}>
                <Translate text={item.title}>
                    {(translatedTitle) => (
                        <Text style={styles.title}>{translatedTitle}</Text>
                    )}
                </Translate>
                <Text style={styles.details}>Listo en: {item.readyInMinutes} minutos</Text>
                <Text style={styles.details}>Precio por porción: ${item.pricePerServing}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <SearchFilter onSearch={searchRecipes} />
            <FlatList
                data={recipes}
                renderItem={renderRecipeItem}
                keyExtractor={(item) => item.id.toString()}
                onEndReached={loadMoreRecipes}
                onEndReachedThreshold={0.5}
                ListFooterComponent={() =>
                    loading ? <ActivityIndicator size="large" color="#3498db" /> : null
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    itemContainer: {
        flexDirection: 'row',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#bdc3c7',
        backgroundColor: '#fff',
        elevation: 2,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 8,
    },
    textContainer: {
        flex: 1,
        marginLeft: 10,
        justifyContent: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    details: {
        fontSize: 14,
        color: '#7f8c8d',
    },
});
