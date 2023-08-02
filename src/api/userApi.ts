import { User} from "../interfaces/user"
import auth from '@react-native-firebase/auth';
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
        return token
    }catch (error) {
        console.error('Failed to log in:', error);
    }
}
