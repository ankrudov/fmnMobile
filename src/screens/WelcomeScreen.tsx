import React from 'react'
import {Text, StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import { Stack,Divider } from "@react-native-material/core";
import { Dimensions } from 'react-native';

export const WelcomeScreen = () =>{
    const screen = Dimensions.get('window');
    const containerWidth = screen.width * 1;
    const containerHeight = screen.height * 1;
    return(
        <View style={[styles.mainContainer, {height:containerHeight},{width:containerWidth}]}>
            <View style={styles.modalContainer}>
                <View style={styles.imageContainer}>
                    <Image
                        style={styles.logoImage}
                        source={require('../assets/forgetmenotICON.png')}
                    />
                </View>
                {/* <View>
                    <Text>Welcome to forgetmenot!</Text>
                </View> */}
                <View style={styles.buttonContainer}>
                    <Stack style={styles.stack} fill center spacing={12}>
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.buttonText}>Sign In</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.buttonText}>Sign Up</Text>
                        </TouchableOpacity>
                    </Stack>
                </View>
            </View>    
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:'#E1525F',
    },
    modalContainer: {
        width:'90%',
        height:'80%',
      backgroundColor: '#E1525F',
    },
    imageContainer:{
        display:'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'#E1525F'
    },
    logoImage:{
        width:'80%',
        height:'80%'
    },
    buttonContainer:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        position:'absolute',
        bottom:30,
        height:'20%',
        width:'100%'
    },
    button:{
        width:'70%',
        padding:12,
        paddingRight:25,
        paddingLeft:25,
        borderRadius:15,
        backgroundColor:'#FFD9B3',
        color:'brown',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        
    },
    buttonText:{
        fontWeight:'400',
        fontFamily:'roboto',
        fontSize:16
    },
    divider:{
        marginBottom:10,
    },
    stack:{
        width:'100%',
    }
  });
