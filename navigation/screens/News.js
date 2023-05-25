import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Dimensions, TextInput } from 'react-native';
import { Card } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function News({ navigation }) {
  const [data, setData] = useState([]);

  const url =
    'https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=044175598afd464db1a017c29900c328';

  const getArticles = () => {
    fetch(url)
      .then(res => res.json())
      .then(json => setData(json))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    getArticles();
  }, []);

  const SearchBar = () => {
    return (
      <View>
        <TextInput placeholder="Search News" style={styles.input} />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.background}>
      <ScrollView>
        <View style={styles.container}>
          <SearchBar />
          {Object.keys(data).length > 0 &&
            data.articles.map((article, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => navigation.navigate('ArticleDetail', { article })}
              >
                <Card style={styles.card}>
                  <Image source={{ uri: article.urlToImage }} style={styles.image} />
                  <View style={styles.articleContainer}>
                    <Text style={styles.title}>{article.title}</Text>
                  </View>
                  <Text style={styles.description}>{article.description}</Text>
                  <View style={styles.heading}>
                    <Text style={styles.source}>{article.source.name}</Text>
                  </View>
                  <View style={styles.heading}>
                    <Text style={styles.date}>{article.publishedAt}</Text>
                  </View>
                </Card>
              </TouchableOpacity>
            ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#ffdeb7',
  },
  container: {
    width: Dimensions.get('window').width,
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  card: {
    width: Dimensions.get('window').width,
    marginBottom: 20,
    borderColor: '#ff8100',
    borderWidth: 5,
    borderRadius: 5,
  },
  articleContainer: {
    width: Dimensions.get('window').width,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ff8100',
  },
  title: {
    width: Dimensions.get('window').width -10,
    marginTop: 1,
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
  },
  image: {
    width: Dimensions.get('window').width-10,
    height: 200,
    alignItems: 'center',
  },
  description: {
    width: Dimensions.get('window').width - 10,
    alignItems: 'center',
    fontSize: 16,
    fontWeight: '400',
    marginTop: 10,
  },
  input: {
    width: Dimensions.get('window').width,
    height: 40,
    backgroundColor: '#ffdeb7',
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderColor: '#ff8100',
    borderWidth: 5,
    borderRadius: 5,
    marginBottom: 10,
    marginTop: 10,
  },
  heading: {
    alignItems: 'flex-start',
    marginTop: 5,
  },
  source: {
    fontSize: 14,
    fontWeight: '600',
    alignItems: 'flex-start',
  },
  date: {
    fontSize: 14,
    fontWeight: '600',
    alignItems: 'flex-start',
  },
});
