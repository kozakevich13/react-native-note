import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@todos';


const TodoList = () => {
  const [textInput, setTextInput] = useState('');
  const [todos, setTodos] = useState([]);
  const [mainCounter, setMainCounter] = useState(0)

  useEffect(() => {
    loadTodos();
  }, []);

  const addTodo = () => {
    setTodos([...todos, textInput]);
    setTextInput('');
  };

  const deleteTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
    setMainCounter(mainCounter + 1)
  };

  const saveTodos = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    } catch (error) {
      console.log(error);
    }
  };

  const loadTodos = async () => {
    try {
      const todosFromStorage = await AsyncStorage.getItem(STORAGE_KEY);
      if (todosFromStorage !== null) {
        setTodos(JSON.parse(todosFromStorage));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    saveTodos();
  }, [todos]);

  return (
    <View style={styles.container}>
      <Text style={styles.textTack}>all tasks completed: {mainCounter}</Text>
      <TouchableOpacity style={styles.button} onPress={addTodo}>
        <Text>add task</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="Add a todo"
        value={textInput}
        onChangeText={(text) => setTextInput(text)}
      />
      {todos.map((todo, index) => (
        <TouchableOpacity key={index} onPress={() => deleteTodo(index)}>
          <Text style={styles.todo}>{todo}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
 
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
  },
  todo: {
    fontSize: 20,
    marginBottom: 10,
    borderColor: '#537075',
    padding: 2,
    borderWidth: 2,
    backgroundColor: '#728f9f',
    width: 200
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    margin: 10
  },
  textTack: {
    marginBottom: 20
  },
});

export default TodoList;
