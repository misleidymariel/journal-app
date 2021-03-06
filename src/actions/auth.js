import Swal from 'sweetalert2';


import { googleAuthProvider} from '../firebase/firebase-config'
import { types } from '../types/types';

import { getAuth, signInWithPopup, GoogleAuthProvider, updateProfile } from "firebase/auth";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { finishLoading, starLoading } from './ui';
import { noteLogout } from './notes';

//actionn asincrona

export const startLoginEmailPassword =  (email, password) =>{
    return ( dispatch ) =>{
        try {

        dispatch( starLoading());
            
        const auth = getAuth()
        signInWithEmailAndPassword(auth, email, password)
        .then(({user}) =>{
            
            dispatch(login(user.uid, user.displayName));
            
            dispatch( finishLoading() );
          
        })
        .catch( e => {
            console.log(e);
            dispatch( finishLoading() );   
            Swal.fire('Error', e.message, 'error'); 
        });
            
        }catch (error) {
            console.error(error);
        }
        

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
            Swal.fire('Error', e.message, 'error'); 
        
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


export const startLogout =() => {
    return async (dispatch)=>{
       await getAuth().signOut();

       dispatch( logout() );
       dispatch( noteLogout() );

    }
}

export const logout = () => ({
    type: types.logout

})