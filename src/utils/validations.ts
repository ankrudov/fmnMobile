import { isValidPhoneNumber } from "libphonenumber-js";
import { badWordsArray } from "./badWords";
const Filter = require('bad-words')
const filter = new Filter()
filter.addWords(...badWordsArray)
const validate = require('validate.js');

//validateEmail validates an email
export const validateEmail = (email:string) =>{
    const constraints = {
        email: {
          email: true 
        }
      };

    return !validate({ email: email }, constraints);
}

//validatePhoneNumber validates a phonenumber using libphonenumber 
export const validatePhoneNumber = (number:string) =>{
    const phoneNumber = isValidPhoneNumber(number, 'US')
    if (phoneNumber){
        return true
    }else{
      return false
    }
}
//validateNames validates an inputs name checking for badwords
export const validateNames = (name:string) =>{
  const containsSpecialCharacters = /[^\w\s-_]/.test(name);
  if (filter.isProfane(name) || containsSpecialCharacters){
    return false
  }else {
    return true
  }
  
}
//validatePassword checks the password length, lowercasing, uppercasing, number, and special characters in password
export const validatePassword = (password:string) =>{
  if (password.length < 6) {
    return 'Password must be at least 6 characters long.';
  }

  if (!/[a-z]/.test(password)) {
    return 'Password must contain at least one lowercase letter.';
  }

  if (!/[A-Z]/.test(password)) {
    return 'Password must contain at least one uppercase letter.';
  }

  if (!/[0-9]/.test(password)) {
    return 'Password must contain at least one number.';
  }

  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return 'Password must contain at least one special character.';
  }

  return null;
}