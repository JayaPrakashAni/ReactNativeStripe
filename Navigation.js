import React, { useContext, useEffect } from "react";
import { View, ActivityIndicator, Image } from "react-native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawerContent from "../DrawerNav/CustomDrawer";
import BottomTabNavigator from "../Navigation/BottomTabNavigator";


import LoginScreen from "../Login/Login";
import HomeScreen from "../Home";
import { AuthContext } from "../Login/AuthContext";
import AllocationList from "../Allocation";
import Enrollment from "../Enrollment";
import CoursesPage from "../Courses/CoursePage";
import Violin from "../Courses/Violin/ViolinCourse";
import Guitar from "../Courses/GuitarCourses";
import VideoPlayerPage from "../VideoPlayer/VideoPlayerPage";
import GetClassId from "../VideoCall/Getclassid";
import VideoCallPage from "../VideoCall/VideoCallPage";
import Drums from "../Courses/Drums/Drums";
import GuitarCoursedetails from "../Courses/GUITAR/GuitarDetailPage";
import Cajon from "../Courses/Cajon/Cajon";
import Piano from "../Courses/Piano/piano";
import Keyboards from "../Courses/Keyboard/keyboard";
import Vocal from "../Courses/Vocal/vocal";
import Yoga from "../Courses/Yoga/Yoga";
import Flute from "../Courses/Flute/flute";
import Morsing from "../Courses/Morsing/morsing";
import Kanjira from "../Courses/Kanjira/kanjira";
import Ghatam from "../Courses/Ghatam/Ghatam";
import Saxophone from "../Courses/Saxophone/saxophone";
import Tabla from "../Courses/Tabla/Tabla";
import Harmonium from "../Courses/Harmonium/harmonium";
import Konnakol from "../Courses/Konnakol/konnakol";
import Veena from "../Courses/Veenai/veenai";
import Bharatanatyam from "../Courses/Bharatanatyam/bharatanatyam";
import Ukulele from "../Courses/ukulele/ukulele";
import Mridangam from "../Courses/Mridangam/Mirdangam";
import VocalGuruList from "../GuruDetailPage/Vocal";
import GuruDetailsScreen from "../GuruDetailPage/GuruDetailPage";
import PercussionGuruList from "../GuruDetailPage/Percussion";
import KeysGuruList from "../GuruDetailPage/Keys";
import Djembe from "../Courses/Djembe/Djembe";
import MANDOLIN from "../Courses/Mandolin/Mandolin";
import GuruList from "../GuruDetailPage/Guru";
import YogaGuruList from "../GuruDetailPage/Others";
import WindGuruList from "../GuruDetailPage/wind";
import FAQScreen from "../Favourite/Faqs";
import GetAllocationList from "../VideoCall/GetAllocationList";
import MridangamGurus from "../GuruDetailPage/specializations/MridangamGurus";
import KeyGurus from "../GuruDetailPage/specializations/KeyGurus";
import StringGuruList from "../GuruDetailPage/String";
import GuitarGurus from "../GuruDetailPage/specializations/GuitarGurus";
import TablaGurus from "../GuruDetailPage/specializations/TablaGurus";
import SanGuruDetailsScreen from "../GuruDetailPage/CelebratingGurus/Santosh";
import SandipGuruScreen from "../GuruDetailPage/CelebratingGurus/Sandip";
import RaviGuruDetailsScreen from "../GuruDetailPage/CelebratingGurus/Ravi";
import VenkatGuruScreen from "../GuruDetailPage/CelebratingGurus/Venkat";
import PrivacyPolicy from "../Favourite/PrivacyPolicy";
import TermsACondition from "../Favourite/Terms&Condition";
import GuitarCourseList from "../Courses/GUITAR/GuitarCourses";
import CourseList from "../Courses/CourseGrid";
import DetailPage from "../GuruDetailPage/Detail";
import StripePay from "../Payment/Stripe/StripePayment";
import PaymentSuccessScreen from "../Payment/Stripe/UpdateEnroll";




const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function DrawerNav() {
    return (
        <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}>
            <Drawer.Screen
                name="Home"
                component={BottomTabNavigator}
                options={{
                    headerTitle: () => (
                        <Image
                            source={require('../Assets/Icon/cmpylogo.png')}
                            style={{ width: 130, height: 50, marginLeft: -140 }}
                            resizeMode="contain"
                        />
                    ),
                    headerTitleAlign: 'center',
                    headerShown: true
                }}
            />
            <Drawer.Screen name="Courses" component={CourseList} />
            <Drawer.Screen name="Gurus" component={GuruList} />
            <Drawer.Screen name="FAQ" component={FAQScreen} />

        </Drawer.Navigator>
    );
}

const Navigation = () => {
    const { isLoading, userInfo } = useContext(AuthContext);
    const { isLoggedInUser } = useContext(AuthContext);

    useEffect(() => {
        console.log(userInfo);
    }, [userInfo]);

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size={'large'} />
            </View>
        );
    }

    return (
        <Stack.Navigator>
            {!isLoggedInUser && (
                <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            )}

            <Stack.Screen name="Back" component={DrawerNav} options={{ headerShown: false }} />

            <Stack.Screen name="HomeScreen" component={HomeScreen}
                options={{
                    headerTitle: () => (
                        <Image
                            source={require('../Assets/Icon/cmpylogo.png')}
                            style={{ width: 130, height: 50 }}
                            resizeMode="contain"
                        />),
                    headerTitleAlign: 'center',
                    headerShadow: true,
                }} />
            <Stack.Screen name="allocation" component={AllocationList} options={{ headerShown: true }} />
            <Stack.Screen name="Start class" component={GetClassId} options={{ headerShown: true }} />
            <Stack.Screen name="VideoCallPage" component={VideoCallPage} options={{ headerShown: true }} />
            <Stack.Screen name="My Recordings" component={VideoPlayerPage} options={{ headerShown: true }} />
            <Stack.Screen name="Course Enrollment" component={Enrollment}
                options={{
                    headerBackTitle: 'Back',
                }} />
            <Stack.Screen name="My Dashboard" component={GetAllocationList} />


            <Stack.Screen name="gurulist" component={GuruList} options={{ headerShown: true }} />
            <Stack.Screen name="Santosh" component={SanGuruDetailsScreen} options={{ headerShown: true }} />
            <Stack.Screen name="Sandip" component={SandipGuruScreen} options={{ headerShown: true }} />
            <Stack.Screen name="Ravindran" component={RaviGuruDetailsScreen} options={{ headerShown: true }} />
            <Stack.Screen name="Venkat" component={VenkatGuruScreen} options={{ headerShown: true }} />

            <Stack.Screen name="gurudetail" component={GuruDetailsScreen} options={{ headerShown: true }} />
            <Stack.Screen name="Vocal Gurus" component={VocalGuruList} options={{ headerShown: true }} />
            <Stack.Screen name="Percussion Gurus" component={PercussionGuruList} options={{ headerShown: true }} />
            <Stack.Screen name="Keys Gurus" component={KeysGuruList} options={{ headerShown: true }} />
            <Stack.Screen name="Yoga Gurus" component={YogaGuruList} options={{ headerShown: true }} />
            <Stack.Screen name="Wind Gurus" component={WindGuruList} options={{ headerShown: true }} />
            <Stack.Screen name="String Gurus" component={StringGuruList} options={{ headerShown: true }} />


            {/* <Stack.Screen name="Enrollment Success" component={PaymentSuccessScreen}
                options={{
                    headerBackTitle: 'Back',
                }} /> */}
         <Stack.Screen name="Stripe Payment" component={StripePay} />
         <Stack.Screen name="UpdateEnroll" component={PaymentSuccessScreen} />
            {/* <Stack.Screen name="StripePayment" component={RazorPayPayment} /> */}

            <Stack.Screen name="CoursePage" component={CoursesPage} options={{ headerShown: true }} />
            <Stack.Screen name="guitar" component={Guitar} options={{ headerShown: true }} />
            <Stack.Screen name="Guitar courses" component={GuitarCourseList} options={{ headerShown: true }} />
            <Stack.Screen name="DetailPage" component={GuitarCoursedetails} options={{ headerShown: true }} />

            <Stack.Screen name="Violin" component={Violin} options={{ headerShown: true }} />
            <Stack.Screen name="Mridangam" component={Mridangam} options={{ headerShown: true }} />
            <Stack.Screen name="Drums" component={Drums} options={{ headerShown: true }} />
            <Stack.Screen name="Cajon" component={Cajon} options={{ headerShown: true }} />
            <Stack.Screen name="Djembe" component={Djembe} options={{ headerShown: true }} />
            <Stack.Screen name="Piano" component={Piano} options={{ headerShown: true }} />
            <Stack.Screen name="Keyboard" component={Keyboards} options={{ headerShown: true }} />
            <Stack.Screen name="Vocal" component={Vocal} options={{ headerShown: true }} />
            <Stack.Screen name="Yoga" component={Yoga} options={{ headerShown: true }} />
            <Stack.Screen name="Flute" component={Flute} options={{ headerShown: true }} />
            <Stack.Screen name="Morsing" component={Morsing} options={{ headerShown: true }} />
            <Stack.Screen name="Kanjira" component={Kanjira} options={{ headerShown: true }} />
            <Stack.Screen name="Ghatam" component={Ghatam} options={{ headerShown: true }} />

            <Stack.Screen name="Saxophone" component={Saxophone} options={{ headerShown: true }} />
            <Stack.Screen name="Tabla" component={Tabla} options={{ headerShown: true }} />
            <Stack.Screen name="Harmonium" component={Harmonium} options={{ headerShown: true }} />
            <Stack.Screen name="Konnakol" component={Konnakol} options={{ headerShown: true }} />
            <Stack.Screen name="Veena" component={Veena} options={{ headerShown: true }} />
            <Stack.Screen name="Bharatanatyam" component={Bharatanatyam} options={{ headerShown: true }} />
            <Stack.Screen name="Ukulele" component={Ukulele} options={{ headerShown: true }} />
            <Stack.Screen name="Mandolin" component={MANDOLIN} options={{ headerShown: true }} />

            <Stack.Screen name="Mridangam Gurus" component={MridangamGurus} options={{ headerShown: true }} />
            <Stack.Screen name="Key Gurus" component={KeyGurus} options={{ headerShown: true }} />
            <Stack.Screen name="Guitar Gurus" component={GuitarGurus} options={{ headerShown: true }} />
            <Stack.Screen name="Tabla Gurus" component={TablaGurus} options={{ headerShown: true }} />

            <Stack.Screen name="Terms & Conditions" component={TermsACondition} options={{ headerShown: true }} />
            <Stack.Screen name="Privacy Policy" component={PrivacyPolicy} options={{ headerShown: true }} />

            <Stack.Screen name="Detail" component={DetailPage} options={{ headerShown: true }} />

        </Stack.Navigator>
    );
};

export default Navigation;
