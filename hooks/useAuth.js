// we need to store the user into the application, so that we can use this user to navigate the home page for that we created a custom hook and use auth to personalize sign in to each user 
import { View, Text } from 'react-native'
import React, {useState} from 'react'
import { useEffect } from 'react'; // event from firebase
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase.config';


export default function useAuth() {
    const [user , setUser] = useState(null);  // default state user will be null

    useEffect(()=>{
        const unsub = onAuthStateChanged(auth, user=>{
            console.log('got user : ', user);
            if(user){ // if user has a value it means user has logged in 
                setUser(user);
            }else{
                setUser(null); // else set user to null
            }
        });
        return unsub; //registering this event, when user logs in or logs out it will update the state 

    }, [])
  
    return {user}
}