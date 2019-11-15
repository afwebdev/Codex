import { useState } from "react";

const useForm = () => {

    const handleChange = e => {
        //Destructure name and value from event
        const { name, value } = e.target
        //Use the state update function to update the values object
        //Note that I spread the existing values and overwrite only what changed
        setValues({
          ...values,
          [name]: value
        })
      }
    
      const handleFormSubmission = event => {
        event.preventDefault();
        console.log(event.target);
        // toggleIsSubmitted(true);
        // if (!firstName) 
        // API.signUp({
        //   user_firstName: firstName,
        //   user_lastName: lastName,
        //   user_email: email,
        //   user_password: password
        // })
        //   .then(resp => {
        //     console.log(`Received from resp ${JSON.stringify(resp)}`);
        //   })
        //   .catch(err => {
        //     console.log(err);
        //   });
      };

      return {
          handleChange,
          handleFormSubmission
      }
}

export default useForm;