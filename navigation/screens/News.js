import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image,Dimensions} from 'react-native';
import { Card } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function News({ navigation }) {
  const [data, setData] = useState([]);

  const url = "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=044175598afd464db1a017c29900c328";

  const getArticles = () => {
    fetch(url)
      .then(res => res.json())
      .then(json => setData(json))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    getArticles();
  }, []);

  return (
    <SafeAreaView style={styles.background}>
      <ScrollView>
        {Object.keys(data).length > 0 && (
          <View style={styles.container}>
            {data.articles.map((article, index) => (
              <Card key={index}
               width={Dimensions.get("window").width -30}
               >
               
                <View style={styles.articleContainer}>
                  <Text style={styles.title}>{article.title}</Text>
                  <TouchableOpacity>
                    <Image
                      source={{ uri: article.urlToImage }}
                      style={styles.image}
                    />
                  </TouchableOpacity>
                </View>
                <Text style={styles.description}>{article.description}</Text>
                <Text>{article.publishedAt}</Text>
              </Card>
            ))}
          </View>
        )}
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
    justifyContent: 'space-between',
    alignItems: 'center',
    
 
  },
  articleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15,
    borderColor: "#ff8100",
    borderWidth: 6,
    borderRadius: 8
   
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 15,
  },
  description: {
    fontSize: 16,
  },
});
