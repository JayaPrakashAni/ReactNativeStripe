import React, { useRef, useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions, Image } from 'react-native';

const screenWidth = Dimensions.get('window').width;

const Testimonial = () => {
  const scrollViewRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);

  const gurus = [
    {
      Description: "The class was really great! My teacher really helped me understand the piece that I am learning, and if I had any questions, she would answer them gladly. Overall, I had a really great experience!",
      StudentName: 'Amoolya Yathiraj',
      Title: 'Intermediate Classical Piano',
      backgroundColor: '#f9f9f9',
      image: require('../Assets/Explore/testi1.jpg'), 
    },
    {
      Description: "Varnams notes are explained in a very simple way and easy to understand. Thank you for being very patient during the entire class. Appreciated!",
      StudentName: 'Arivazhagan',
      Title: 'Beginner Carnatic Flute',
      backgroundColor: '#f9f9f9',
      image: require('../Assets/Explore/testi2.jpg'), 
    },
    {
      Description: "The way of approaching by the team was excellent! Keep up the good work. The tutor has taught every lesson is clearly.",
      StudentName: 'Seshagiri Yarrajonna',
      Title: 'Beginner Classical Piano',
      backgroundColor: '#f9f9f9',
      image: require('../Assets/Explore/testi3.jpg'), 
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => {
        const nextIndex = prevIndex === gurus.length - 1 ? 0 : prevIndex + 1;
        scrollViewRef.current?.scrollTo({ x: nextIndex * screenWidth, animated: true });
        return nextIndex;
      });
    }, 3000); // Scrolls every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        ref={scrollViewRef}
        onMomentumScrollEnd={(event) => {
          const index = Math.floor(event.nativeEvent.contentOffset.x / screenWidth);
          setCurrentIndex(index);
        }}
        contentContainerStyle={{
          paddingHorizontal: (screenWidth - 450) / 2,
        }}
        snapToInterval={screenWidth}
        decelerationRate="fast"
      >
        {gurus.map((guru, index) => (
          <View key={index} style={[styles.guruView, { backgroundColor: guru.backgroundColor }]}>
            <Image source={guru.image} style={styles.avatar} />
            <Image source={require('../Assets/Icon/qu.png')} style={styles.quotation} />
            <Image source={require('../Assets/Icon/qu2.png')} style={styles.quotations} />
            <View style={styles.textContainer}>
              <Text style={styles.title}>{guru.Title}</Text>
              <Text style={styles.description}>{guru.Description}</Text>
              <Text style={styles.studentName}>{guru.StudentName}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  guruView: {
    width: screenWidth - 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    overflow: 'hidden',
    marginHorizontal: 20,
    padding: 20,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 15,
  },
  textContainer: {
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  quotation: {
    width: 30, 
    height: 30,
    position: 'absolute',
    top: 130, 
    left: 20,
  },
  quotations: {
    width: 30, 
    height: 30,
    position: 'absolute',
    top: 280, 
    left: 300,
  },
  title: {
    fontSize: 16,
    color: 'black',
    fontWeight: '600',
    marginTop: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
    marginVertical: 10,
    lineHeight: 22,
  },
  studentName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 10,
  },
});

export default Testimonial;
