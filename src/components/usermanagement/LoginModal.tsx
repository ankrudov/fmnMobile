import React, {useState} from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, TextInput, ActivityIndicator} from 'react-native';
import { Divider } from '@react-native-material/core';
import Icon from 'react-native-vector-icons/AntDesign';
import { loginUser } from '../../api/userApi';
import { modalStyle } from '../styles/modals/usermanagement';
interface LoginProps {
    isModalVisible: boolean;
    onCloseModal: () => void;
}

export const LoginModal: React.FC<LoginProps>= ({isModalVisible, onCloseModal}) =>{
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [viewPassword, setViewPassword]=useState<boolean>(true)
    const [isLoading, setLoading] = useState<boolean>(false);
    const handlePasswordToggle = ()=>{
        setViewPassword(!viewPassword)
    }
    const handleUserLogin = (email:string, password:string)=>{
        try{
            setLoading(true)
            loginUser(email, password)
            .then((data)=>{
                console.log(data)
            })
            .catch((error) =>{
                console.log(error)
            })
            .finally(()=>
            setLoading(false))
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
                        <Text style={modalStyle.greetingText}>Welcome Back!</Text>
                        <View style={modalStyle.inputContainer}>
                            <Icon
                                name='mail'
                                size={15}
                                style={modalStyle.inputIcon}
                            />
                            <TextInput
                                placeholder="example@example.com"
                                style={modalStyle.inputs}
                                onChangeText={setEmail}
                                value={email}
                                autoCapitalize='none'
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
                                onChangeText={setPassword}
                                value={password}
                                autoCapitalize='none'
                                secureTextEntry={viewPassword}
                            />
                            <Icon
                                name='eyeo'
                                size={15}
                                style={modalStyle.viewPasswordIcon}
                                onPress={handlePasswordToggle}
                            />
                        </View>
                        <View style={styles.forgotPasswordContainer}>
                            <TouchableOpacity >
                                <Text style={styles.infoText}>Forgot Password?</Text>
                            </TouchableOpacity>
                        </View>  
                    </View>
                    <View style={modalStyle.signInContainer}>
                        <TouchableOpacity onPress={()=>handleUserLogin(email,password)}>
                            <Text style={modalStyle.button}>Sign In</Text>
                        </TouchableOpacity>
                    </View>
                    <Divider style={{ marginTop: 20 }} leadingInset={16}/>
                    <View style={styles.alternateSignInContainer}>
                        <Text style={styles.infoText}>Or sign in with</Text>
                        <View style={styles.socialsContainer}>
                            <Icon 
                            name='google'
                            size={18}
                            />
                            <Icon 
                            name='facebook-square'
                            size={18}
                            />
                        </View>
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

const styles = StyleSheet.create({
    forgotPasswordContainer:{
        marginTop:10,
        display:'flex',
        alignItems:'flex-end'
    },
    infoText:{
        fontFamily:'roboto',
        color:'#E1525F',
        fontWeight:'500',
        fontSize:14
    }, 
    alternateSignInContainer:{
        marginTop:5,
        display:'flex',
        alignItems:'center',
        justifyContent:'center'
    },
    socialsContainer:{
        marginTop:4,
        flexDirection: 'row',
        alignItems: 'center',
    }
})