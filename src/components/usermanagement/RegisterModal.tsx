import React, {useState, useReducer} from "react";
import { Modal, View, Text, TouchableOpacity, ActivityIndicator, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { modalStyle } from "../styles/modals/usermanagement";
import { User } from "../../interfaces/user";
import { createUser } from "../../api/userApi";
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
    const [state, dispatch] = useReducer(reducer, initialState)
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
    const [isLoading, setLoading] = useState<boolean>(false);
    const [viewPassword, setViewPassword] = useState<boolean>(true)
    const handlePasswordToggle = () =>{
        setViewPassword(!viewPassword)
    }
    const handleUserRegister = ({username, firstName, lastName, password, email, phoneNumber}:State) =>{
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
                console.log(data)
            })
            .catch((error)=>{
                console.log(error)
            })
            .finally(()=>{
                setLoading(false)
            })
        }catch(error){
            console.log(error)
        } 
    }
    return(
        <Modal
        transparent
        animationType='slide'
        visible={isModalVisible} 
        onRequestClose={onCloseModal}>
            <View style={modalStyle.mainContainer}>
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
                                placeholder="username"
                                style={modalStyle.inputs}
                                autoCapitalize='none'
                                value={state.username}
                                onChangeText={text=> dispatch({type: 'setUsername',payload:text})}
                            />
                        </View>
                        <View style={modalStyle.inputContainer}>
                            <TextInput
                                placeholder="first name"
                                style={modalStyle.inputs}
                                autoCapitalize='none'
                                value={state.firstName}
                                onChangeText={text=> dispatch({type: 'setFirstName',payload:text})}
                            />
                        </View>
                        <View style={modalStyle.inputContainer}>
                            <TextInput
                                placeholder="last name"
                                style={modalStyle.inputs}
                                autoCapitalize='none'
                                value={state.lastName}
                                onChangeText={text=> dispatch({type:'setLastName',payload:text})}
                            />
                        </View>
                        <View style={modalStyle.inputContainer}>
                            <Icon
                                name='phone'
                                size={15}
                                style={modalStyle.inputIcon}
                            />
                            <TextInput
                                placeholder="Phone Number 555-555-5555"
                                style={modalStyle.inputs}
                                autoCapitalize='none'
                                value={state.phoneNumber}
                                onChangeText={text=> dispatch({type: 'setPhoneNumber',payload:text})}
                            />
                        </View>
                        <View style={modalStyle.inputContainer}>
                            <Icon
                                name='mail'
                                size={15}
                                style={modalStyle.inputIcon}
                            />
                            <TextInput
                                placeholder="example@example.com"
                                style={modalStyle.inputs}
                                autoCapitalize='none'
                                value={state.email}
                                onChangeText={text=> dispatch({type: 'setEmail',payload:text})}
                            />
                        </View>
                        <View style={modalStyle.inputContainer}>
                            <Icon
                                name='lock'
                                size={15}
                                style={modalStyle.inputIcon}
                            />
                            <TextInput
                                placeholder="password"
                                style={modalStyle.inputs}
                                autoCapitalize='none'
                                secureTextEntry={viewPassword}
                                value={state.password}
                                onChangeText={text=> dispatch({type: 'setPassword',payload:text})}
                            />
                            <Icon
                                name='eyeo'
                                size={15}
                                style={modalStyle.viewPasswordIcon}
                                onPress={handlePasswordToggle}
                            />
                        </View>
                    </View>
                    <View style={modalStyle.signInContainer}>
                        <TouchableOpacity onPress={()=>handleUserRegister(state)}>
                            <Text style={modalStyle.button}>Sign up</Text>
                        </TouchableOpacity>
                    </View>
                    {isLoading && (
                        <View style={modalStyle.overlay}>
                        <ActivityIndicator size="large" color="#0000ff" />
                        </View>
                    )}
                </View>
            </View>
        </Modal>
    )
}