import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View, Button, TextInput, FlatList, StatusBar, Image } from 'react-native';

export default function App() {

  const [keyword, setKeyword] = useState('');
  const [recipes, setRecipes] = useState([]);

  const fetchRecipes = () => {
    fetch(`https://themealdb.com/api/json/v1/1/filter.php?i=${keyword}`)
    .then(response => response.json())
    .then(data => setRecipes(data.meals))
    .catch(error => {
    Alert.alert('Error', error.message);
    });
    }

    const listSeparator = () => {
      return (
        <View
          style={{
            height: 1,
            width: "80%",
            backgroundColor: "#CED0CE",
            marginLeft: "10%"
          }}
        />
      );
    };

    
  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <FlatList
        style={{marginLeft : "5%"}}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) =>
          <View>
            <Text style={{fontSize: 18, fontWeight: "bold"}}>{item.strMeal}</Text>
            <Image
               style={{width: 60, height: 60}}
               source={{uri: item.strMealThumb}}>
            </Image>
          </View>}
        data={recipes}
        ItemSeparatorComponent={listSeparator} />

        <View style={styles.search}>
        <TextInput
          style={{fontSize: 18, width: 200, borderColor: 'gray', borderWidth: 1, margin: 20}}
          placeholder='Ingredient'
          onChangeText={text => setKeyword(text)}
          value={keyword}
        />
        <Button
          title='Find'
          onPress={fetchRecipes}
        />
        </View>
      
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
  search:{
    margin: 20
  }
});
