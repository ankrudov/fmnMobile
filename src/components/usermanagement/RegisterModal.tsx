import React, {useState, useReducer} from "react";
import { Modal, View, Text, TouchableOpacity, ActivityIndicator, TextInput, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { modalStyle } from "../styles/modals/usermanagement";
import { User } from "../../interfaces/user";
import { createUser } from "../../api/userApi";
import { validateEmail, validatePhoneNumber, validateNames, validatePassword } from "../../utils/validations";
import MaskInput, {Masks} from "react-native-mask-input";

interface RegisterProps {
    isModalVisible: boolean;
    onCloseModal: () => void;
}
interface State {
    username: string;
    firstName: string;
    lastName: string;
    password: string;
    email: string;
    phoneNumber: string;
}
type Action = 
    | { type: 'setFirstName'; payload: string }
    | { type: 'setLastName'; payload: string }
    | { type: 'setUsername'; payload: string }
    | { type: 'setEmail'; payload: string }
    | { type: 'setPassword'; payload: string }
    | { type: 'setPhoneNumber'; payload: string }

const initialState:State = {
    username:'',
    firstName:'',
    lastName:'',
    password:'',
    email:'',
    phoneNumber:'',
}
function reducer(state:State, action:Action) {
    switch (action.type) {
        case 'setFirstName':
            return {...state, firstName: action.payload}
        case 'setLastName':
            return {...state, lastName: action.payload}
        case 'setUsername':
            return {...state, username: action.payload}
        case 'setFirstName':
            return {...state, firstName: action.payload}
        case 'setEmail':
            return { ...state, email: action.payload };
        case 'setPassword':
            return { ...state, password: action.payload };
        case 'setPhoneNumber':
            return {...state, phoneNumber: action.payload}
        default:
            throw new Error();
    }
}
export const RegisterModal: React.FC<RegisterProps>=({isModalVisible, onCloseModal}) =>{
    let requestData:User = {
        username:'',
        first_name:'',
        last_name:'',
        password:'',
        email:'',
        phone_number:'',
        is_staff: false, 
        is_active:false,
        is_superuser:false
    }
    const [state, dispatch] = useReducer(reducer, initialState)
    const [isLoading, setLoading] = useState<boolean>(false);
    const [viewPassword, setViewPassword] = useState<boolean>(true)
    const [isvalidEmail, setIsValidEmail] = useState<boolean>(true)
    const [isValidPhoneNumber, setIsValidPhoneNumber] = useState<boolean>(true)
    const [isValidUsername, setIsvalidUsername] = useState<boolean>(true)
    const [isValidFirstName, setIsValidFirstName] = useState<boolean>(true)
    const [isValidLastName, setIsValidLastName] = useState<boolean>(true)
    const [isValidPassword, setIsValidPassword] = useState<boolean>(true)
    const [passwordError, setPasswordError] = useState<string>('')
    const [submitError, setSubmitError] = useState<boolean>(false)

    const handlePasswordValidation = (password:string) =>{
        const errorMessage = validatePassword(password)
        if(errorMessage != null){
            setIsValidPassword(false)
            setPasswordError(errorMessage)
        }else {
            setIsValidPassword(true)
            setPasswordError('')
        }
        
    }
    const handlePasswordToggle = () =>{
        setViewPassword(!viewPassword)
    }

    const handleUserRegister = ({username, firstName, lastName, password, email, phoneNumber}:State) =>{
        if (isvalidEmail && isValidPhoneNumber && isValidUsername && isValidFirstName && isValidLastName){
            try{
                setLoading(true)
                Object.assign(requestData,{
                    username:username,
                    first_name:firstName,
                    last_name:lastName,
                    password:password,
                    email:email,
                    phone_number:phoneNumber,
                    is_staff: false, 
                    is_active:true,
                    is_superuser:false
                })
                createUser(requestData)
                .then((data)=>{
                    //this will eventually be saved to a redux store
                    console.log(data)
                })
                .catch((error)=>{
                    console.log(error)
                })
                .finally(()=>{
                    setLoading(false)
                })
            }catch(error){
                setSubmitError(true)
                console.log(error)
            } 
        }else {
            setSubmitError(true)
        }
    }
    return(
        <Modal
        transparent
        animationType='slide'
        visible={isModalVisible} 
        onRequestClose={onCloseModal}>
            <ScrollView style={modalStyle.mainContainer}>
                <View style={modalStyle.loginContainer}>
                    <View style={{display:'flex', alignItems:'flex-end'}}>
                        <Icon
                            name='close'
                            size={20}
                            onPress={onCloseModal}
                        />
                    </View>
                    <View style={modalStyle.formContainer}>
                        <Text style={modalStyle.greetingText}>Register Account!</Text>
                        <View style={modalStyle.inputContainer}>
                            <TextInput
                                autoCapitalize='none'
                                onBlur={()=>setIsvalidUsername(validateNames(state.username))}
                                onChangeText={text=> dispatch({type: 'setUsername',payload:text})}
                                placeholder="username"
                                style={modalStyle.inputs}
                                value={state.username}
                                
                            />
                        </View>
                        {isValidUsername ? null: <Text style={modalStyle.errorText}>Please input a valid username</Text> }
                        <View style={modalStyle.inputContainer}>
                            <TextInput
                                autoCapitalize='none'
                                onBlur={()=> setIsValidFirstName(validateNames(state.firstName))}
                                onChangeText={text=> dispatch({type: 'setFirstName',payload:text})}
                                placeholder="first name"
                                style={modalStyle.inputs}
                                value={state.firstName}
                                
                            />
                        </View>
                        {isValidFirstName ? null: <Text style={modalStyle.errorText}>Please input a valid first name</Text> }
                        <View style={modalStyle.inputContainer}>
                            <TextInput
                                autoCapitalize='none'
                                onBlur={()=>setIsValidLastName(validateNames(state.lastName))}
                                onChangeText={text=> dispatch({type:'setLastName',payload:text})}
                                placeholder="last name"
                                style={modalStyle.inputs}
                                value={state.lastName}
                                
                            />
                        </View>
                        {isValidLastName ? null: <Text style={modalStyle.errorText}>Please input a valid last name</Text> }
                        <View style={modalStyle.inputContainer}>
                            <Icon
                                name='phone'
                                size={15}
                                style={modalStyle.inputIcon}
                            />
                            <MaskInput
                                autoCapitalize="none"
                                keyboardType="number-pad"
                                mask={Masks.USA_PHONE}
                                onBlur={()=> setIsValidPhoneNumber(validatePhoneNumber(state.phoneNumber))}
                                onChangeText={(masked)=>
                                dispatch({type:'setPhoneNumber',payload:masked})
                                }
                                placeholder="555-555-5555"
                                style={modalStyle.inputs}
                                value={state.phoneNumber}
                                
                            />
                        </View>
                        {isValidPhoneNumber ? null : <Text style={modalStyle.errorText}>Please input a valid phone number</Text> }
                        <View style={modalStyle.inputContainer}>
                            <Icon
                                name='mail'
                                size={15}
                                style={modalStyle.inputIcon}
                            />
                            <TextInput
                                autoCapitalize='none'
                                onBlur={()=> setIsValidEmail(validateEmail(state.email))}
                                onChangeText={text=> dispatch({type: 'setEmail',payload:text})}
                                placeholder='email@example.com'
                                style={modalStyle.inputs}
                                value={state.email}
                                
                            />
                        </View>
                        {isvalidEmail ? null: <Text style={modalStyle.errorText}>Please input a valid email</Text> }
                        <View style={modalStyle.inputContainer}>
                            <Icon
                                name='lock'
                                size={15}
                                style={modalStyle.inputIcon}
                            />
                            <TextInput
                                autoCapitalize='none'
                                onBlur={()=> handlePasswordValidation(state.password)}
                                onChangeText={text=> dispatch({type: 'setPassword',payload:text})}
                                placeholder="password"
                                secureTextEntry={viewPassword}
                                style={modalStyle.inputs}
                                value={state.password}
                                
                            />
                            <Icon
                                name='eyeo'
                                size={15}
                                style={modalStyle.viewPasswordIcon}
                                onPress={handlePasswordToggle}
                            />
                        </View>
                        {isValidPassword ? null: <Text style={modalStyle.errorText}>{passwordError}</Text> }
                    </View>
                    <View style={modalStyle.signInContainer}>
                        <TouchableOpacity onPress={()=>handleUserRegister(state)}>
                            <Text style={modalStyle.button}>Sign up</Text>
                        </TouchableOpacity>
                        { submitError ? <Text style={modalStyle.submissionError}>Submission failed, check your form.</Text> : null}
                    </View>
                    {isLoading && (
                        <View style={modalStyle.overlay}>
                        <ActivityIndicator size="large" color="#0000ff" />
                        </View>
                    )}
                </View>
            </ScrollView>
        </Modal>
    )
}