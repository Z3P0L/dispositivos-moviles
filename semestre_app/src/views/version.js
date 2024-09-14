import React from 'react';
import { View, Text, Linking, StyleSheet } from 'react-native';

export default function Version() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Versión de la App</Text>
            <Text style={styles.text}>Versión: 1.0</Text>
            {[
                { name: 'Diego Lopez', url: 'https://github.com/z3p0l' },
                { name: 'JP', url: 'https://github.com/' }, // Reemplaza con el URL real
                { name: 'VO', url: 'https://github.com/' }  // Reemplaza con el URL real
            ].map((dev, index) => (
                <View key={index} style={styles.developerContainer}>
                    <Text style={styles.text}>Desarrollador: {dev.name}</Text>
                    <Text
                        style={styles.link}
                        onPress={() => Linking.openURL(dev.url)}
                    >
                        Perfil de GitHub
                    </Text>
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    text: {
        fontSize: 18,
        marginBottom: 5,
    },
    link: {
        fontSize: 18,
        color: '#3498db',
        textDecorationLine: 'underline',
        marginBottom: 15,
    },
    developerContainer: {
        marginBottom: 20,
    },
});
