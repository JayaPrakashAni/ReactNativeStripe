import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ImageBackground, ActivityIndicator, ScrollView, Image } from "react-native";
import { Button } from "react-native-paper";
import Icon from 'react-native-vector-icons/FontAwesome'; // Import FontAwesome icons

const GetClassId = ({ navigation, route }) => {
  const [dataArray, setDataArray] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  const { slotID } = route.params;

  const getUserData = async () => {
    try {
      const response = await fetch("https://my.bmusician.com/app/GetClassroomID/" + slotID);
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }
      const myData = await response.json();
      setDataArray(myData);
      setIsLoaded(true);
      console.log('Resultuuu>>>>', myData);
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  if (!isLoaded) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size={'large'} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  return (
    <ImageBackground style={styles.background}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.content}>
          <Text style={styles.messageText}>
            {dataArray.message}
          </Text>
          <View style={styles.callButtonContainer}>
            {dataArray.Allocation ? (
              <Button
                style={styles.callButton}
                mode="contained"
                onPress={() => {
                  navigation.navigate('VideoCallPage', {
                    roomId: dataArray.Allocation.toString(), // Ensure Allocation exists
                  });
                }}>
                <Icon name="phone" size={20} color="#fff" /> Call Now To Start Class
              </Button>
            ) : (
              <View style={styles.errorContainer}>
                
                <Icon name="frown-o" size={50} color="black" style={styles.icon} />

              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    width: '100%',
    height: '100%',
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  content: {
    marginTop: 5,
    alignItems: 'center',
    padding: 20,
    marginTop: 100,
  },
  messageText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ED4D57",
    textAlign: 'center',
    padding: 20,
  },
  callButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    padding: 30,
    marginTop: 30,
  },
  callButton: {
    height: 60,
    justifyContent: 'center',
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  errorContainer: {
    alignItems: 'center',
    marginTop: -70,
  },
  errorText: {
    color: 'black',
    fontSize: 18,
    backgroundColor: 'lightcyan',
    borderRadius: 10,
    textAlign: 'center',
    marginVertical: 10,
    padding: 10,
  },
  icon: {
    marginVertical: 20,
  
  },
});

export default GetClassId;
