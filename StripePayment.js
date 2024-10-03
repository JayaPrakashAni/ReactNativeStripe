import React from 'react';
import { View, StyleSheet } from 'react-native';
import { StripeProvider } from '@stripe/stripe-react-native';
import PaymentScreen from './PaymentScreen';

const StripePay = ({ route }) => {
  const { enrollID } = route.params;  

  return (
    <View style={styles.container}>
      <StripeProvider publishableKey='pk_live_JJerb48UNyfOylZY2ABw1QZw'>
        <PaymentScreen enrollID={enrollID} />  
      </StripeProvider>
    </View>
  )
}

export default StripePay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
