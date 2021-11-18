
import { googleAuthProvider} from '../firebase/firebase-config'
import { types } from '../types/types';

import { getAuth, signInWithPopup, GoogleAuthProvider, updateProfile } from "firebase/auth";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { finishLoading, starLoading } from './ui';

//actionnasincrona

export const startLoginEmailPassword = (email, password) =>{
    return ( dispatch ) =>{

        dispatch( starLoading() );

        const auth = getAuth()
        signInWithEmailAndPassword(auth, email, password)
        .then(({user}) =>{
            
            login(user.uid, user.displayName);
          
        })
        .catch( e => {
            console.log(e);
            dispatch(finishLoading());
                
        });

    }
}


export const startRegisterWithEmailPasswordName = ( email, password, name) =>{
    return ( dispatch) => {
 
        const auth = getAuth()
        createUserWithEmailAndPassword(auth, email, password)
        .then( async ({user}) =>{
            await updateProfile(user, { displayName: name})

            dispatch(
               login(user.uid, user.displayName)
            )
        
        })
        .catch(e => {
            console.log(e)
        
        });
    }
}




export const startGoogleLogin = () => {
    return ( dispatch) =>{

        const auth = getAuth();
        signInWithPopup(auth, googleAuthProvider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            

            dispatch(
                login(user.uid, user.displayName)
            )
            // ...
            console.log( token, user);
        }).catch((error) => {
        
        });

    }
}

export const login = ( uid, displayName ) => ({
    type: types.login,
    payload: {
        uid,
        displayName
    }  
})