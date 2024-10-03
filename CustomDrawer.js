import React, { useContext } from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  Linking,
  StyleSheet,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '../Login/AuthContext';

const CustomDrawer = (props) => {
  const { signOut, userInfo } = useContext(AuthContext);

  const handleSignOut = () => {
    signOut();
    props.navigation.navigate('Login'); // Navigate to the login screen after signing out
  };

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={styles.drawerContent}>
        <ImageBackground
          source={require('../Assets/Icon/cmpylogo.png')} // Add a background image
          style={styles.headerBackground}
          resizeMode="contain"
        >
          <View style={styles.headerContent}>
            {userInfo ? (
              <>
                <Text style={styles.userName}>User: {userInfo.username}</Text>
                <TouchableOpacity
                  onPress={() => props.navigation.navigate('My Dashboard')}
                  style={styles.dashboardButton}>
                  <Ionicons name="calendar-outline" size={18} color="#fff" style={styles.dashboardIcon} />
                  <Text style={styles.dashboardText}>My Dashboard</Text>
                </TouchableOpacity>
              </>
            ) : (
              <TouchableOpacity
                onPress={() => props.navigation.navigate('Login')}
                style={styles.signInButton}>
                <Text style={styles.signInText}>SignIn</Text>
                <Ionicons name="arrow-forward-outline" size={20} color="#fff" style={styles.arrowIcon} />
              </TouchableOpacity>
            )}
          </View>
        </ImageBackground>
        <View style={styles.drawerList}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>

      <View style={styles.footer}>
        <TouchableOpacity onPress={() => props.navigation.navigate('Terms & Conditions')} style={styles.footerButton}>
          <Ionicons name="document-outline" size={22} />
          <Text style={styles.footerButtonText}>Terms & Conditions</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => props.navigation.navigate('Privacy Policy')} style={styles.footerButton}>
          <Ionicons name="lock-closed-outline" size={22} />
          <Text style={styles.footerButtonText}>Privacy Policy</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => Linking.openURL("https://www.youtube.com/Bmusician/videos")} style={styles.footerButton}>
          <Ionicons name="share-social-outline" size={22} />
          <Text style={styles.footerButtonText}>Share</Text>
        </TouchableOpacity>

        {userInfo && (
          <TouchableOpacity onPress={handleSignOut} style={styles.footerButton}>
            <Ionicons name="exit-outline" size={22} />
            <Text style={styles.footerButtonText}>Sign Out</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    backgroundColor: 'black',
  },
  headerBackground: {
    padding: 20,
    height: 250,
    justifyContent: 'flex-end',
  },
  headerContent: {
    alignItems: 'flex-start', // Align items to the start (left)
  },
  userImage: {
    height: 100,
    width: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  userName: {
    color: 'white',
    fontSize: 18,
    marginTop: -10,
  },
  dashboardButton: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dashboardIcon: {
    height: 18,
    width: 18,
  },
  dashboardText: {
    color: 'white',
    fontSize: 18,
    marginLeft: 10,
  },
  signInButton: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signInText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Roboto-Medium',
    marginRight: 10,
    marginLeft: 140,
  },
  arrowIcon: {
    marginTop: 2,
  },
  drawerList: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 10,
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  footerButton: {
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerButtonText: {
    fontSize: 15,
    fontFamily: 'Roboto-Medium',
    marginLeft: 5,
  },
});

export default CustomDrawer;
