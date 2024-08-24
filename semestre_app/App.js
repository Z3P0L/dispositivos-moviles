import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';

export default function App() {

  const [count, setCount] = useState(0);
  const [api_record, setApiRecord] = useState();

  const update_count = (number) => {
    setCount(count + number);
  };

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Text>Count: {count}</Text>
      <Button onPress={() => update_count(1)} title="Sumar"></Button>
      <Button onPress={() => update_count(-1)} title="Restar"></Button>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
