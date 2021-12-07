import { db } from "../firebase/firebase-config";

import { addDoc, collection } from "firebase/firestore";
import { types } from "../types/types";

export const startNewNote = () => {
    return async( dispatch, getState) => {

        const uid =  getState().auth.uid;
        
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        }


        const notesRef = collection(db, uid, "journal", "notes");
        const docRef = await addDoc(notesRef, newNote);

    

        dispatch( activeNote( docRef.id, newNote));

 
    }
}

export const activeNote = ( id, note) => ({
    type: types.notesActive,
    payload:{
        id,
        ...note
    }

})