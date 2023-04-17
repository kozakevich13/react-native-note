import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({navigation}) => {
    const [savedData, setSavedData] = useState(null);

    const getSavedData = async () => {
        try {
        const data = await AsyncStorage.getItem('goals');
        if (data !== null) {
            setSavedData(JSON.parse(data));
        }
        } catch (error) {
        console.log(error);
        }
    };

    useEffect(() => {
        getSavedData();
    }, []);

    console.log(savedData)

    return (
        <View>
                <Button
                    title="Go to Jane's profile"
                    onPress={() =>
                    navigation.navigate('Goal', {name: 'Jane'})
                    }
                />
         {savedData ? (
        <View>
          {savedData.map((item) => (
            <Text key={item.themeWords}>{item.themeWords}</Text>
          ))}
        </View>
      ) : (
        <Text>Loading...</Text>
      )}
      </View>
     
      
    );
  };

  export default HomeScreen