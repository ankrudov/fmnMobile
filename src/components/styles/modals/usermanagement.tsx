import { StyleSheet } from "react-native";

export const modalStyle = StyleSheet.create({
    mainContainer:{
        height:'65%',
        width:'100%',
        backgroundColor:'#ffff',
        position: 'absolute',
        bottom: 0,
        borderTopStartRadius:15,
        borderTopEndRadius:15
    },
    loginContainer:{
        height:'100%',
        marginTop:5,
        paddingHorizontal:6
    },
    formContainer:{
        marginTop:10,
        paddingLeft:3,
        width:'95%'
    },
    greetingText:{
        fontWeight:'700',
        fontFamily:'roboto',
        color:'#E1525F',
        fontSize:18
    }, 
    inputContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        marginTop:20,
        borderBottomColor: '#ccc', // Add grey border to the bottom
        borderBottomWidth: 1, // Add grey border to the bottom
        paddingHorizontal: 15,
    },
    inputs:{
        flex:1,
        padding: 0,
        paddingLeft: 15,
    },
    inputIcon:{
        position: 'absolute',
        left: 0,
    },
    viewPasswordIcon:{
        position: 'absolute',
        right: 0,
    },
    signInContainer:{
        marginTop:20,
        display:'flex',
        alignItems:'center',
        justifyContent:'center'
    },
    button:{
        width:'70%',
        padding:12,
        paddingRight:25,
        paddingLeft:25,
        borderRadius:20,
        backgroundColor:'#E1525F',
        color:'#ffff',
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    },
    overlay:{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: 'rgba(255,255,255,0.7)',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopStartRadius:15,
        borderTopEndRadius:15
    },
    errorText:{
        fontSize:11,
        color:'red',
        alignSelf:'flex-end'
    },
    submissionError:{
        paddingTop: 7,
        fontSize:11,
        color:'red',
        alignSelf:'center'
    }
})