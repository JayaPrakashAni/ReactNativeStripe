import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, Image, TouchableOpacity, Alert } from "react-native";
import { BASE_URL_IMG } from '../../Login/Config';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation, useRoute } from "@react-navigation/native";
import difficultyIcon from '../../Assets/Icon/difficulty.png'; 
import Enrollment from "../../Enrollment";

const GuitarCoursedetails = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { courseId, courseName } = route.params;
    const [courseDetails, setCourseDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const checkLoginStatus = async () => {
            const userInfo = await AsyncStorage.getItem('userInfo');
            setIsLoggedIn(!!userInfo);
        };

        checkLoginStatus();

        navigation.setOptions({
            title: courseName,
            headerBackTitle: 'Back', // This sets the back button text to 'Back'
        });
    }, [navigation, courseName]);

    const enrollpage = async (id) => {
        if (!isLoggedIn) {
            Alert.alert("Please Login to complete the Course Enrollment!");
            return;
        }

        if (courseDetails?.isEnrolled) { // Assuming 'isEnrolled' is the key indicating enrollment status
            Alert.alert("You have already Enrolled in this course! Thank You.");
            return;
        }
        
        await AsyncStorage.setItem('courseId', JSON.stringify(id));
        console.log('CourseId $$ ------>', id);
      
        navigation.navigate('Course Enrollment', {
            isEnrolled: courseDetails.isEnrolled,
        });
    };

    useEffect(() => {
        const fetchCourseDetails = async () => {
            try {
                const response = await fetch(`https://my.bmusician.com/app/getcoursedetails/${courseId}`);
                const json = await response.json();
                setCourseDetails(json.coursedetails);
                setIsLoading(false);
                console.log('course detail values>>>> ', json);
            } catch (error) {
                console.error(error);
            }
        };
        fetchCourseDetails();
    }, [courseId]);

    if (isLoading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size={'large'} />
            </View>
        );
    }

    if (!courseDetails) {
        return <Text>No Details found</Text>;
    }

    const imageUrl = `${BASE_URL_IMG}${courseDetails.CourseImage}`;

    return (
        <View style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.courseCard}>
                    <Image style={styles.courseImage} source={{ uri: imageUrl }} />
                    <View style={styles.cardSection}></View>
                    <Text style={styles.courseDescription}>{courseDetails.CourseDescription}</Text>
                </View>

                {courseDetails.CourseGoals && (
                    <View style={styles.courseCard}>
                        <View style={styles.cardSection}>
                            <Icon name="bullseye" size={24} color="#ED4D57" />
                            <Text style={styles.sectionTitle}>Course Goals</Text>
                        </View>
                        <Text style={styles.courseText}>{courseDetails.CourseGoals}</Text>
                    </View>
                )}

                <View style={styles.courseCard}>
                    <View style={styles.cardSection}>
                        <Icon name="dollar" size={24} color="#ED4D57" />
                        <Text style={styles.sectionTitle}>Fees</Text>
                    </View>
                    <Text style={styles.courseText}>{courseDetails.Fees}</Text>
                </View>

                {courseDetails.Prerequisite && (
                    <View style={styles.courseCard}>
                        <View style={styles.cardSection}>
                            <Icon name="exclamation-circle" size={24} color="#ED4D57" />
                            <Text style={styles.sectionTitle}>Prerequisite</Text>
                        </View>
                        <Text style={styles.courseText}>{courseDetails.Prerequisite}</Text>
                    </View>
                )}

                {courseDetails.CourseHighlights && courseDetails.CourseHighlights.length > 0 && (
                    <View style={styles.courseCard}>
                        <View style={styles.cardSection}>
                            <Icon name="star" size={24} color="#ED4D57" />
                            <Text style={styles.sectionTitle}>Course Highlights</Text>
                        </View>
                        {courseDetails.CourseHighlights.map((highlight, index) => (
                            <Text key={index} style={styles.courseText}>{highlight.HighlightText}</Text>
                        ))}
                    </View>
                )}

                <View style={styles.courseCard}>
                    <View style={styles.cardSection}>
                        <Icon name="book" size={24} color="#ED4D57" />
                        <Text style={styles.sectionTitle}>Syllabus</Text>
                    </View>
                    {courseDetails.SyllabusModules.map((module, index) => (
                        <View key={index} style={styles.moduleContainer}>
                            <Text style={styles.moduleTitle}>{index + 1}. {module.ModuleName}</Text>
                            <Text style={styles.courseText}>{module.ModuleDescription}</Text>

                            <View style={styles.infoRow}>
                                <Image source={difficultyIcon} style={{ width: 40, height: 40 }} />
                                <Text style={styles.infoText}>Difficulty: {module.DifficultyLevel}</Text>
                            </View>

                            <View style={styles.infoRows}>
                                <Icon name="clock-o" size={30} color="#ED4D57" />
                                <Text style={styles.infoTexts}>Number of Hours: {module.NumberOfHoursApproximation}</Text>
                            </View>
                            <View style={{
                                height: 4,
                                width: "100%",
                                backgroundColor: "#E0E0E0",
                                marginTop: 15,
                            }} />
                        </View>
                    ))}
                </View>
            </ScrollView>

            <TouchableOpacity style={styles.enrollButton} onPress={() => enrollpage(courseDetails.ID)}>
                <Text style={styles.enrollButtonText}>Enroll Now</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollContainer: {
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    courseCard: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 15,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 3,
    },
    cardSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    courseImage: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 19,
        fontWeight: '600',
        color: 'black',
        marginLeft: 10,
    },
    courseDescription: {
        fontSize: 17,
        color: 'black',
        textAlign: 'justify',
        lineHeight: 23,
    },
    courseText: {
        fontSize: 17,
        color: 'black',
        textAlign: 'justify',
        lineHeight: 23,
        marginBottom: 10,
    },
    syllabusTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 20,
    },
    moduleContainer: {
        marginBottom: 20,
    },
    moduleTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 5,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        marginLeft: 10,
    },
    infoRows: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        marginLeft: 18,
    },
    infoText: {
        fontSize: 17,
        color: 'black',
        marginLeft: 10,
    },
    infoTexts: {
        fontSize: 17,
        color: 'black',
        marginLeft: 16,
    },
    enrollButton: {
        padding: 15,
        backgroundColor: '#ED4D57',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20,
        borderRadius: 10,
    },
    enrollButtonText: {
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
    },
});

export default GuitarCoursedetails;
