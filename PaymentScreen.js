import { Alert, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { CardField, useStripe } from '@stripe/stripe-react-native';
import Button from './Btn';
import StripeApi from './StripeApi';

const Payment = ({ enrollID }) => {
    const { createToken } = useStripe();
    const [cardInfo, setCardInfo] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchCardDetails = (cardDetail) => {
        if (cardDetail.complete) {
            setCardInfo(cardDetail);
        } else {
            setCardInfo(null);
        }
    };

    const onDone = async () => {
        if (!cardInfo) {
            Alert.alert('Error', 'Please complete your card details.');
            return;
        }

        setLoading(true);

        try {
            // Step 1: Create a Stripe Token
            const { token, error: tokenError } = await createToken({
                type: 'Card',
            });

            if (tokenError) {
                console.error('Error creating token:', tokenError);
                Alert.alert('Error', tokenError.message);
                return;
            }

            console.log("Stripe Token ID >>> ", token.id);

            // Step 2: Call StripeApi with the Stripe token, enrollment ID, and amount (100 cents for 1 dollar)
            const amountInCents = 100; // 1 dollar = 100 cents
            const response = await StripeApi(enrollID, token.id, amountInCents);

            // Step 3: Show success message if the enrollment was successful
            if (response?.data?.success) {
                Alert.alert("Success", "You have successfully enrolled for the course !!");
            } else {
                console.error("Error during enrollment:", response.data);
                Alert.alert("Enrollment Failed", response.data.message || "There was an issue processing your enrollment.");
            }
        } catch (error) {
            console.error("Error raised during payment and enrollment", error);
            Alert.alert("Error", "Failed to process the payment and enrollment.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <View style={{ padding: 20, marginTop: 300 }}>
                <CardField
                    postalCodeEnabled={false}
                    placeholders={{
                        number: '0000 0000 0000 0000',
                    }}
                    cardStyle={{
                        backgroundColor: '#FFFFFF',
                        textColor: '#000000',
                    }}
                    style={{
                        width: '100%',
                        height: 50,
                        marginVertical: 30,
                    }}
                    onCardChange={(cardDetails) => {
                        fetchCardDetails(cardDetails);
                        console.log('Card Details:', cardDetails);
                    }}
                />
                <Button
                    onPress={onDone}
                    title="Done"
                    disabled={loading}
                />
            </View>
        </View>
    );
};

export default Payment;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
