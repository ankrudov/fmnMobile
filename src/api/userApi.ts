import { User} from "../interfaces/user"
import auth, { firebase } from '@react-native-firebase/auth';
//local machine
const BASE_URL: string = 'http://127.0.0.1:8000/api/'

//createUser is a post request that registers a user
export const createUser = async (user:User)=> {
    try{
        const response = await fetch(`${BASE_URL}users/create/`,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(user)
        })
        if(!response.ok){
            throw new Error(`error: ${response.status}`);
        }else {
            const data = await response.json()
            console.log(data)
            return data
        }
    }catch(err){
        return err
    }
}

//loginUser is a request that logs in a user and returns a refresh and access token on succesful login
export const loginUser = async (email:string, password:string) => {
    try {
        const user = await auth().signInWithEmailAndPassword(email, password);
        const token = await user.user.getIdToken();
        const response = await fetch(`${BASE_URL}users/login/`,{
            method:'POST',
            headers:{
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        })
        if(!response.ok){
            throw new Error(`error: ${response.status}`);
        }else {
            const data = await response.json()
            return data
        }
    }catch (error) {
        console.error('Failed to log in:', error);
        throw error;
    }
}

//this is just a test 
export const updateUser = async () =>{
        firebase.auth().currentUser?.getIdToken(true).then((idToken)=>{
            const data = {
                username:"ankrudov",
                first_name:"andre",
                last_name:"vasquez",
                is_superuser:true,
                is_staff:false,
                phone_number:"555-555-7777",
                password:"something"
            } 
            fetch(`${BASE_URL}users/update-user/`,{
                method:"PUT",
                headers:{
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${idToken}`
                },
                body: JSON.stringify(data)
            })
            .then((response)=> response.json())
            .then((data)=>{
                console.log(data)
            })
            .catch((error)=>{
                console.log(error)
            })
        })
}
