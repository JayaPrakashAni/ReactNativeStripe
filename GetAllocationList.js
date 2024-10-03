import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, ActivityIndicator, ScrollView, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "react-native-paper";
import Icon from 'react-native-vector-icons/FontAwesome';

const GetAllocationList = ({ navigation }) => {
  const [dataArray, setDataArray] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  
  const clockpic = require('../Assets/Icon/clock.png');
  const [success, setSuccess] = useState(true);
  const [message, setMessage] = useState('');

  const getUserData = async (userId) => {
    try {
      const response = await fetch(`https://my.bmusician.com/app/GetAllocationList/${userId}`);
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }
      const myData = await response.json();
      if (myData.success) {
        setDataArray(myData.AllocationsList);
        setSuccess(true);
      } else {
        setMessage(myData.message);
        setSuccess(false);
      }
      setIsLoaded(true);
    } catch (error) {
      console.log(error);
      setMessage('Failed to fetch data: ' + error.message);
      setSuccess(false);
      setIsLoaded(true);
    }
  };

  useEffect(() => {
    const getUserInfo = async () => {
      const userInfo = JSON.parse(await AsyncStorage.getItem('userInfo'));
      if (userInfo) {
        getUserData(userInfo.userid);
      }
    };
    getUserInfo();
  }, []);

  if (!isLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size={'large'} />
      </View>
    );
  }

  if (!success) {
    return (
      <View style={styles.centered}>
        <Text style={styles.message}>{message}</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      {dataArray.map((item) => (
        <View key={item.ID} style={styles.card}>
          <Text style={styles.courseName}>
            {item.CourseName}
          </Text>
          <View style={styles.row}>
            <Text style={styles.label}>Guru:</Text>
            <Text style={styles.value}>
              {item.GuruName}
            </Text>
          </View>
          <View style={styles.row}>
            <Image style={styles.clockimage} source={clockpic} />
            <Text style={styles.CourseDay}>
              {item.CourseDay}
            </Text>
          </View>
          <View style={styles.buttonRow}>
            <View style={styles.recordButton}>
              <Button
                icon="video"
                mode="outlined"
                onPress={() => {
                  navigation.navigate('My Recordings', {
                    itemId: item.ID,
                  });
                }}>
                My Recordings
              </Button>
            </View>
            <View style={styles.startButton}>
              <Button
                icon="play-circle"
                mode="contained"
                onPress={() => {
                  console.log('slotIDTest ----->', item.ID);
                  navigation.navigate('Start class', {
                    slotID: item.ID,
                  });
                }}>
                Start Class
              </Button>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  card: {
    marginTop: 5,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    marginHorizontal: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  courseName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ED4D57",
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
  },
  value: {
    fontSize: 18,
    color: 'black',
    marginLeft: 10,
    fontWeight: '600'
  },
  clockimage: {
    width: 25,
    height: 25,
    marginStart: 15,
    marginLeft: -2,
    marginTop: -3,
  },
  CourseDay: {
    marginLeft: 15,
    fontSize: 18,
    color: 'black',
    paddingVertical: 7,
    marginTop: -3,
    fontWeight: '600'
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  startButton: {
    flex: 1,
    marginLeft: 10,
  },
  recordButton: {
    flex: 1,
    marginRight: 10,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  message: {
    fontSize: 26,
    color: 'red',
  },
});

export default GetAllocationList;