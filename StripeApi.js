import axios from 'axios';

const StripeApi = (enrollmentId, stripeToken, amount) => {
  console.log("Enrollment ID:", enrollmentId);  
  console.log("Stripe Token:", stripeToken);    
  
  return new Promise((resolve, reject) => {
    axios.post('https://my.bmusician.com/app/chargeenrollment', {
        enrollmentid: enrollmentId,
        stripeToken: stripeToken,
        amount: amount,  
    }).then(function (res){
        resolve(res);
    }).catch(function (error){
        reject(error);
    });
  });
}

export default StripeApi;
