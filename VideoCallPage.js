import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import * as Gruveo from 'react-native-gruveo';
import { useRoute } from '@react-navigation/native';

function VideoCallPage() {
  const [isCallInProgress, setCallInProgress] = useState(false); // Track call status

  const route = useRoute();
  const { roomId } = route.params;

  const callWithGruveo = async () => {
    if (!isCallInProgress) {
      setCallInProgress(true);

      Gruveo.call(roomId, true, false, async (status, payload) => {
        console.log('call status----->:', status);
        console.log('roomID --------->:', roomId);
        console.log('payload --------->:', payload);

        switch (status) {
          case Gruveo.CallStatus.initFailed:
            onCallInitFailed();
            break;
          case Gruveo.CallStatus.initialized:
            console.log("Initialized the room successfully");
            break;
          case Gruveo.CallStatus.requestToSignApiAuthToken:
            console.log("Request to sign token");
            const response = await fetch('https://my.bmusician.com/app/generateHMAC?token=' + payload, {
              method: 'GET',
            });
            if (!response.ok) {
              const errorText = await response.text();
              throw new Error(errorText);
            }
            const signedToken = await response.json();
            Gruveo.authorize(signedToken.macstring);
            break;
          case Gruveo.CallStatus.callEstablished:
            console.log("Call Established");
            startRecordingWithDelay(); // Start recording with a delay
            break;
          case Gruveo.CallStatus.callEnd:
            OnCallEnd();
            break;
          case Gruveo.CallStatus.recordingStateChanged:
            console.log("Call Recording State Changed");
            break;
          default:
            console.warn("Unknown call status", status);
            break;
        }
      });
    } else {
      console.log('There is an ongoing call. Wait for it to end before starting a new one.');
    }
  };

  const onCallInitFailed = () => {
    console.error('Failed to initiate the call');
    setCallInProgress(false);
  };

  const OnCallEnd = () => {
    console.log('Call ended');
    setCallInProgress(false);
  };

  const startRecordingWithDelay = () => {
    setTimeout(() => {
      Gruveo.startRecording();
      console.log("Recording started automatically after 30 seconds");
    }, 30000); // 30 seconds delay
  };

  useEffect(() => {
    console.log('Component has been updated');
    Gruveo.initialize('fWawTqa6gPhS');
    callWithGruveo();
  }, [roomId]);

  return (
    <SafeAreaView>
      <TouchableOpacity onPress={() => {
        console.log("Button Pressed");
      }}>
        {/* Other UI components */}
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default VideoCallPage;
