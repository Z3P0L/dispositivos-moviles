import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
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
                `https://api.spoonacular.com/recipes/random?number=10&tags=${customQuery}&apiKey=${apiKey}`
            );
            const data = await response.json();
            setRecipes(prevRecipes => [...prevRecipes, ...data.recipes]);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching recipes:', error);
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
            onPress={() => navigation.navigate('Item', { recipe: item })}
            style={{ padding: 10, borderBottomWidth: 1, borderColor: '#ccc' }}
        >
            <Image
                source={{ uri: item.image }}
                style={{ width: 100, height: 100 }}
            />
            <Translate text={item.title}>
                {(translatedTitle) => (
                    <Text style={{ fontSize: 18 }}>{translatedTitle}</Text>
                )}
            </Translate>
            <Text>Listo en: {item.readyInMinutes} minutos</Text>
            <Text>Precio por porción: ${item.pricePerServing}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={{ flex: 1 }}>
            <SearchFilter onSearch={searchRecipes} onFilter={applyFilter} />
            
            <FlatList
                data={recipes}
                renderItem={renderRecipeItem}
                keyExtractor={(item, index) => item.id.toString() + index}
                onEndReached={loadMoreRecipes}
                onEndReachedThreshold={0.5}
                ListFooterComponent={() =>
                    loading ? <ActivityIndicator size="large" color="#0000ff" /> : null
                }
            />
        </View>
    );
}
