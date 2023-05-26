import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  TextInput,
  Linking,
} from 'react-native';
import { Card } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function News({ navigation }) {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const url =
    'https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=044175598afd464db1a017c29900c328';

  useEffect(() => {
    getArticles();
  }, []);

  const getArticles = () => {
    fetch(url)
      .then((res) => res.json())
      .then((json) => setData(json.articles))
      .catch((err) => console.log(err));
  };

  const handleSearch = (text) => {
    setSearchQuery(text);
  };

  const filteredArticles = data.filter((article) =>
    article.title.includes(searchQuery)
  );

  const SearchBar = () => {
    return (
      <View>
        <TextInput
          placeholder="Search News"
          style={styles.input}
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>
    );
  };

  const handleSourcePress = (sourceUrl) => {
    Linking.openURL(sourceUrl);
  };

  return (
    <SafeAreaView style={styles.background}>
      <ScrollView>
        <View style={styles.container}>
          <SearchBar />
          {filteredArticles.map((article, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => navigation.navigate('ArticleDetail', { article })}
            >
              <Card style={styles.card}>
                <Image
                  source={{ uri: article.urlToImage }}
                  style={styles.image}
                />
                <View style={styles.articleContainer}>
                  <Text style={styles.title}>{article.title}</Text>
                </View>
                <Text style={styles.description}>{article.description}</Text>
                <TouchableOpacity
                  onPress={() => handleSourcePress(article.url)}
                >
                  <View style={styles.heading}>
                    <Text style={styles.sourceButton}>
                      Source: <Text style={styles.source}>{article.source.name}</Text>
                    </Text>
                  </View>
                </TouchableOpacity>
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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: Dimensions.get('window').width,
  },
  card: {
    marginBottom: 20,
    borderWidth: 10,
    borderRadius: 20,
    borderColor: '#ff8100',
    width: Dimensions.get('window').width - 50,
  },
  articleContainer: {
    width: Dimensions.get('window').width - 50,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ff8100',
  },
  title: {
    width: Dimensions.get('window').width - 90,
    marginTop: 2,
    marginBottom: 2,
    marginHorizontal:16,
    marginVertical: 20,
    fontSize: 20,
    fontWeight: '600',
    flex: 1,
  },
  image: {
    width: Dimensions.get('window').width - 70,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    height: 200,
    alignItems: 'center',
  },
  description: {
    marginTop: 5,
    marginBottom: 1,
    marginHorizontal: 10,
    width: Dimensions.get('window').width - 70,
    alignItems: 'center',
    fontSize: 16,
    fontWeight: '400',
  },
  input: {
    width: Dimensions.get('window').width - 40,
    height: 40,
    backgroundColor: '#ffdeb7',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderColor: '#ff8100',
    borderWidth: 5,
    borderRadius: 5,
    marginBottom: 10,
    marginTop: 10,
  },
  heading: {
    alignItems: 'flex-start',
    marginTop: 5,
    flexDirection: 'row',
  },
  source: {
    marginTop: 1,
    marginBottom: 1,
    marginHorizontal: 10,
    marginVertical:10,
    fontSize: 17,
    fontWeight: '600',
    alignItems: 'center',
    color: 'black'
  },
  sourceButton: {
    marginTop: 1,
    marginBottom: 1,
    marginHorizontal: 5,
    marginVertical:5,
    fontSize: 17,
    fontWeight: '600',
    color: 'black',
    backgroundColor:'#ffdeb7',
  },
  date: {
    marginBottom: 10,
    marginHorizontal: 5,
    marginVertical:5,
    fontSize: 15,
    fontWeight: '600',
    alignItems: 'flex-start',
  },
});
