import React from 'react';
import { View, Text, Linking, StyleSheet } from 'react-native';

export default function Version() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Versión de la App</Text>
            <Text style={styles.text}>Versión: 1.0</Text>
            <Text style={styles.text}>Desarrollador: Diego Lopez</Text>
            <Text
                style={styles.link}
                onPress={() => Linking.openURL('https://github.com/z3p0l')}
            >
                Perfil de GitHub
            </Text>
            <Text style={styles.text}>Desarrollador: JP</Text>
            <Text
                style={styles.link}
                onPress={() => Linking.openURL('https://github.com/')}
            >
                Perfil de GitHub
            </Text>
            <Text style={styles.text}>Desarrollador: VO</Text>
            <Text
                style={styles.link}
                onPress={() => Linking.openURL('https://github.com/')}
            >
                Perfil de GitHub
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    text: {
        fontSize: 18,
        marginBottom: 5,
    },
    link: {
        fontSize: 18,
        color: 'blue',
        textDecorationLine: 'underline',
    },
});
