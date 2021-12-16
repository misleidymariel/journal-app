import { db } from "../firebase/firebase-config";

import { doc, addDoc, collection, setDoc } from "firebase/firestore";
import { types } from "../types/types";
import { loadNotes } from "../helpers/loadNotes";

export const startNewNote = () => {
    return async( dispatch, getState) => {

        const uid =  getState().auth.uid;
        
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        }


        const notesRef = collection(db, uid, "journal", "notes");
        const docRef = await aºddDoc(notesRef, newNote);

    

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

export const startLoadingNotes = ( uid ) =>{
    return async (dispatch) =>{

        const notes = await loadNotes(uid);
        dispatch( setNotes( notes) ); 
    }
}

export const setNotes = ( notes) =>({
    type: types.notesLoad,
    payload: notes
});


export const startSaveNote = (note) =>{
    return async ( dispatch, getState) =>{

        const { uid }  = getState().auth;


        if(!note.url){
            delete note.url;
        }

        const noteToFirestore = {...note};
        //elimino el id
        delete noteToFirestore.id;

        //const notesRef = collection(db, uid, "journal", "notes");
        //const docRef = await addDoc(notesRef, newNote);
         await doc(collection(db, uid, note.id, "jorunal","notes" )).update(noteToFirestore)
        //await addDoc(notesRef).update(noteToFirestore)
        //await doc( db,`${ uid}/journal/notes/${note.id}`).update(noteToFirestore)
    }


}