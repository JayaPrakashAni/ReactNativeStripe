import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const GuruDetailsScreen = ({ route }) => {
    const { guruId } = route.params;
    const [guruDetails, setGuruDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showDescription, setShowDescription] = useState(false);
    const navigation = useNavigation();
    const scrollViewRef = useRef(null); // Reference to the ScrollView

    useEffect(() => {
        navigation.setOptions({ title: '' });
        const fetchGuruDetails = async () => {
            try {
                const response = await fetch(`https://my.bmusician.com/app/gurudetails/${guruId}`);
                const json = await response.json();
                if (json.success) {
                    setGuruDetails(json.data);
                    navigation.setOptions({
                        title: json.data.Name,
                        headerBackTitle: 'Back',  // This will set the back button text
                    });
                } else {
                    setError("Failed to fetch guru details");
                }
            } catch (error) {
                setError(error.message);
            }
            setIsLoading(false);
        };

        fetchGuruDetails();
    }, [guruId]);

    if (isLoading) {
        return <View style={styles.centered}><ActivityIndicator size="large" color="#0000ff" /></View>;
    }

    if (error) {
        return <View style={styles.centered}><Text>Error: {error}</Text></View>;
    }

    const getImageUri = () => {
        if (guruDetails.ProfilePicture) {
            return `https://my.bmusician.com${guruDetails.ProfilePicture}`;
        } else {
            return '../Assets/Guru/guruIcon.png';
        }
    };

    const toggleDescription = () => {
        setShowDescription(!showDescription);
        if (showDescription) {
            // Scroll to top when showing less description
            scrollViewRef.current.scrollTo({ y: 0, animated: true });
        }
    };

    const renderDescriptionWithBullets = () => {
        const sentences = guruDetails.Description.split('.').filter(sentence => sentence.trim() !== '');
        const chunks = [];
        let chunkSize = Math.ceil(sentences.length / 3); // Split into 3 passages
        for (let i = 0; i < sentences.length; i += chunkSize) {
            chunks.push(sentences.slice(i, i + chunkSize).join('. ') + '.');
        }
        return chunks.map((chunk, index) => (
            <Text key={index} style={styles.shortDescription}>
                {chunk.trim()}
            </Text>
        ));
    };

    return (
        <ScrollView ref={scrollViewRef} contentContainerStyle={styles.container}>
            {guruDetails && (
                <>
                    <Image
                        source={guruDetails.ProfilePicture ? { uri: getImageUri() } : require('../Assets/Guru/guruIcon.png')}
                        style={styles.profileImage}
                    />
                    <Text style={styles.name}>{guruDetails.Name}</Text>
                    <Text style={styles.shortDescription}>{guruDetails.ShortDescription}</Text>

                    {showDescription && renderDescriptionWithBullets()}

                    <TouchableOpacity onPress={toggleDescription} style={styles.readMoreButton}>
                        <Text style={styles.readMoreButtonText}>
                            {showDescription ? 'Read Less' : 'Read More'}{' '}
                        </Text>
                        <Icon name={showDescription ? 'chevron-up' : 'chevron-down'} size={18} color="#ED4D57" />
                    </TouchableOpacity>

                    <View style={styles.experienceContainer}>
                        <View style={styles.experienceBox}>
                            <Icon name="clock-o" size={24} color="#ED4D57" />
                            <Text style={styles.experienceText}>Experience: {guruDetails.YearsOfExperience} Years</Text>
                        </View>
                        <View style={styles.experienceBox}>
                            <Icon name="book" size={24} color="#ED4D57" />
                            <Text style={styles.experienceText}>Teaching Exp: {guruDetails.YearsOfTeachingExperience} Years</Text>
                        </View>
                    </View>

                    <View style={{
                        height: 4,
                        width: "100%",
                        backgroundColor: "#E0E0E0",
                        marginTop: 10,
                        marginBottom: 20,
                    }} />

                    <Text style={styles.sectionTitle}>Gallery</Text>
                    {guruDetails.GalleryItems.map((item, index) => (
                        <View key={index} style={styles.galleryItem}>
                            <Image source={{ uri: `https://my.bmusician.com${item.PathToPhoto}` }} style={styles.galleryImage} />
                            <Text style={styles.galleryTitle}>{item.Title}</Text>
                        </View>
                    ))}

                    <View style={{
                        height: 4,
                        width: "100%",
                        backgroundColor: "#E0E0E0",
                        marginTop: -5,
                        marginBottom: 20,
                    }} />

                    <Text style={styles.sectionTitle}>Guru Highlights</Text>
                    <View style={styles.highlightsContainer}>
                        {guruDetails.GuruHighlights.map((highlight, index) => (
                            <Text key={index} style={styles.highlight}>{highlight.HighlightText}</Text>
                        ))}
                    </View>
                    <View style={{
                        height: 4,
                        width: "100%",
                        backgroundColor: "#E0E0E0",
                        marginTop: 15,
                        marginBottom: 20,
                    }} />

                    <Text style={styles.sectionTitle}>Courses</Text>
                    <View style={styles.courseGrid}>
                        {guruDetails.Courses.map((course, index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.courseContainer}
                                onPress={() => navigation.navigate('DetailPage', { courseId: course.ID, courseName: course.CourseName })}
                            >
                                <Text style={styles.courseName}>{course.CourseName}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        backgroundColor: 'white',
        padding: 20,
        alignItems: 'center',
    },
    profileImage: {
        width: 400,
        height: 400,
        borderRadius: 10,
        marginBottom: 20,
        marginTop: -10,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 10,
        textAlign: 'left',
        width: '100%',
        paddingHorizontal: 10, // Align with shortDescription
    },
    shortDescription: {
        fontSize: 18,
        color: 'black',
        textAlign: 'justify',
        marginBottom: 20,
        lineHeight: 24,
        paddingHorizontal: 10, // Align with name
    },
    experienceContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 20,
    },
    experienceBox: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#f8f8f8',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 3,
        width: '46%',
    },
    experienceText: {
        marginLeft: 10,
        fontSize: 16,
        color: 'black',
    },
    readMoreButton: {
        marginTop: 10,
        marginBottom: 20,
        paddingVertical: 6,
        borderWidth: 1,
        borderColor: 'grey',
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: -220, // Align with name and shortDescription
    },
    readMoreButtonText: {
        fontSize: 18,
        color: '#ED4D57',
        fontWeight: 'bold',
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#ED4D57',
        width: '100%',
        textAlign: 'left',
        marginBottom: 10,
    },
    highlightsContainer: {
        paddingHorizontal: 10, // added padding
    },
    highlight: {
        fontSize: 16,
        marginBottom: 10,
        textAlign: 'justify',
        color: 'black',
        lineHeight: 21,
    },
    galleryItem: {
        marginBottom: 10,
    },
    galleryImage: {
        width: 350,
        height: 300,
        borderRadius: 10,
    },
    galleryTitle: {
        padding: 5,
        color: 'black',
        fontSize: 18,
        textAlign: 'center',
    },
    courseGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        width: '100%',
    },
    courseContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 15,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 3,
        width: '48%',
    },
    courseName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 5,
        textAlign: 'center',
    },
});

export default GuruDetailsScreen;
