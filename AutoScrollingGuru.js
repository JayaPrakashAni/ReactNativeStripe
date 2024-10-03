import React, { useRef, useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const screenWidth = Dimensions.get('window').width;

const AutoScrollingGurus = () => {
    const navigation = useNavigation();
    const scrollViewRef = useRef();
    const [currentIndex, setCurrentIndex] = useState(0);

    const gurus = [
        {
            name: "Mridangam Gurus",
            subName: "Prapancham Surendran",
            image: require('../Assets/Guru/suru.png'),
            onPress: () => navigation.navigate('Mridangam Gurus'),
            backgroundColor: '#87b452'
        },
        {
            name: "Guitar Gurus",
            subName: "Shylu Ravindran",
            image: require('../Assets/Guru/shylu.png'),
            onPress: () => navigation.navigate('Guitar Gurus'),
            backgroundColor: '#7c78e4'
        },
        {
            name: "Tabla Gurus",
            subName: "Arjun Kaliprasad",
            image: require('../Assets/Guru/arjun.png'),
            onPress: () => navigation.navigate('Tabla Gurus'),
            backgroundColor: '#5BCCF5'
        },
        {
            name: "Keys Gurus",
            subName: "Sathyanarayanan",
            image: require('../Assets/Guru/Sathyanarayanan.png'),
            onPress: () => navigation.navigate('Key Gurus'),
            backgroundColor: '#F74949'
        }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(prevIndex => {
                const nextIndex = prevIndex === gurus.length - 1 ? 0 : prevIndex + 1;
                scrollViewRef.current?.scrollTo({ x: nextIndex * screenWidth, animated: true });
                return nextIndex;
            });
        }, 3000);  // Scrolls every 3 seconds

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
                    paddingHorizontal: (screenWidth - 450) / 2
                }}
                snapToInterval={screenWidth}
                decelerationRate="fast" >

                {gurus.map((guru, index) => (
                    <View key={index} style={[styles.guruView, { backgroundColor: guru.backgroundColor }]}>
                        <View style={styles.textContainer}>
                            <Text style={styles.guruName}>{guru.name}</Text>
                            {/* <Text style={styles.guruSubName}>{guru.subName}</Text> */}
                            <TouchableOpacity style={styles.readMoreButton} onPress={guru.onPress}>
                                <Text style={styles.readMoreText}>Read More</Text>
                            </TouchableOpacity>
                        </View>
                        <Image style={styles.guruContainer} source={guru.image} />
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
        flexDirection: 'row',
        width: screenWidth - 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,  // Apply radius to entire carousel item
        overflow: 'hidden',  // Ensures children don't overlap the corners
        marginHorizontal: 10,
      
    },
    guruContainer: {
        width: 200,
        height: 220,
        resizeMode: 'cover',
    },
    textContainer: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: 30,
    },

    guruName: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 5,
    },
    // guruSubName: {
    //     fontSize: 16,
    //     color: 'white',
    //     marginBottom: 10,
    //     fontWeight: 'bold',
    // },
    readMoreButton: {
        marginTop: 30,
        backgroundColor: 'grey',
        paddingHorizontal: 10,
        paddingVertical: 7,
        borderRadius: 5,
    },
    readMoreText: {

        fontWeight: '700',
        color: 'white',
        fontSize: 16,
    },

});

export default AutoScrollingGurus;
