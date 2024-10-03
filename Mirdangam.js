import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const BASE_URL = 'https://my.bmusician.com';

const Mirdangam = () => {
  const navigation = useNavigation();

  const [courseDetails, setCourseDetails] = useState({});
  const [otherCourses, setOtherCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [courseFees, setCourseFees] = useState({});

  const UniqueId = async (id, name) => {
    await AsyncStorage.setItem('courseId', JSON.stringify(id));
    console.log('CourseId @ ------>', id);
    navigation.navigate('DetailPage', { courseId: id, courseName: name });
  };

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/app/getcoursedetails/35`);
        setCourseDetails(response.data.coursedetails);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchOtherCourses = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/app/getcourses/4`);
        setOtherCourses(response.data.CourseList);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchData = async () => {
      await fetchCourseDetails();
      await fetchOtherCourses();
      setLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchCourseFee = async (courseId) => {
      try {
        const response = await axios.get(`${BASE_URL}/app/getcoursedetails/${courseId}`);
        setCourseFees(prevState => ({
          ...prevState,
          [courseId]: response.data.coursedetails.CourseFeeTwelveMonthsPlan,
        }));
      } catch (error) {
        console.error(error);
      }
    };

    const fetchFeesForAllCourses = async () => {
      for (const course of otherCourses) {
        await fetchCourseFee(course.ID);
      }
    };

    if (otherCourses.length > 0) {
      fetchFeesForAllCourses();
    }
  }, [otherCourses]);

  const renderDescription = (description) => {
    const items = description.split('.').filter(item => item.trim() !== '');
    return items.map((item, index) => (
      <Text key={index} style={styles.descriptionText}>
        {item.trim()}.
      </Text>
    ));
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View key={courseDetails.ID} >
        <Image
          source={{ uri: `${BASE_URL}${courseDetails.CourseImage}` }}
          style={styles.courseImage}
        />
      </View>

      {otherCourses.map(course => (
        <View key={course.ID} >
          <View style={styles.courseHeader}>
            <Text style={styles.otherCourseName}>{course.CourseName}</Text>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon name="dollar" size={20} color="#000" />
            <Text style={styles.fee}>{courseFees[course.ID] || 'Loading...'}</Text>
            <Text style={{ fontWeight: 'bold', marginTop: 1, fontSize: 20, color: 'black' }}> / m</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ color: 'black', fontSize: 18, marginBottom: 10, fontWeight: 'bold', marginTop: -5, }}>12-15 months approx.</Text>
            <TouchableOpacity onPress={() => UniqueId(course.ID, course.CourseName)}>
              <Text style={styles.Viewbutton}>View</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.descriptionContainer}>
            {renderDescription(course.CourseDescription)}
          </View>

          <View style={{
            height: 4,
            width: "100%",
            backgroundColor: "#E0E0E0",
            marginVertical: 10,
            marginTop: -5,
            marginBottom: 30
          }} />

          <Image
            source={{ uri: `${BASE_URL}${courseDetails.CourseImage}` }}
            style={styles.courseImage}
          />
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  courseImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  courseHeader: {
    marginBottom: 10,
  },
  otherCourseName: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
  },
  otherCourseDescription: {
    fontSize: 16,
    color: 'black',
    textAlign: 'justify',
    lineHeight: 20,
  },
  fee: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginLeft: 5,
    marginBottom: 10,
    marginTop: 10,
  },
  descriptionContainer: {
    marginBottom: 10,
  },

  descriptionText: {
    fontSize: 16,
    color: 'black',
    lineHeight: 20,
    textAlign: 'justify',
    marginBottom: 5,
  },
  Viewbutton: {
    marginTop: -20,
    marginLeft: 60,
    fontSize: 16,
    color: 'purple',
    backgroundColor: 'white',
    paddingVertical: 6,
    textAlign: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'grey',
    fontWeight: 'bold',
    paddingHorizontal: 30,
  },
});

export default Mirdangam;
