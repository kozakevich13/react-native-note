import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import {useState} from 'react'

export default function App() {
  let [value, setValue] = useState('доров1')

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your ass!</Text>
            <Text style={styles.suka}>{value}</Text>
            <TextInput
                style={styles.input}
                value={value}
                onChangeText={setValue}
            ></TextInput>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },

    suka: {
      backgroundColor: 'green',
      alignItems: 'center',
      justifyContent: 'center',
    },

  input: {
      backgroundColor: '#993300',
      justifyContent: 'center',
      width: 200,
      height: 50,
      borderWidth: 2,
      borderColor: 'green'

    },
});
