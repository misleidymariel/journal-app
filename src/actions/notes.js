import Swal  from 'sweetalert2';

//react-journal

import { db } from "../firebase/firebase-config";
import { doc, addDoc, collection, setDoc } from "firebase/firestore";
import { types } from "../types/types";
import { loadNotes } from "../helpers/loadNotes";
import { fileUpload } from '../helpers/fileUpload';

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

        const noteUpdate = {...note};

        const notesRef = await collection(db, uid, "journal", "notes");
        const res = await doc(notesRef, note.id);
        delete noteUpdate.id;
        await setDoc(res, noteUpdate);

        dispatch( refreshNote(note.id, noteUpdate));
        Swal.fire('Saved', note.title, 'success');

    }

}

export const refreshNote = (id, note) => ({
    type: types.notesUpdated,
    payload:{
        id, 
        note: {
            id,
            ...note
        }
    }

});

export const startUploading = (file) => {

    return async ( dispatch, getState) =>{

        const { active:activeNote } = getState().notes;

        
        let timerInterval
        Swal.fire({
        title: 'Auto close alert!',
        html: 'I will close in <b></b> milliseconds.',
        timerProgressBar: true,
        didOpen: () => {
            Swal.showLoading()
            const b = Swal.getHtmlContainer().querySelector('b')
            timerInterval = setInterval(() => {
            b.textContent = Swal.getTimerLeft()
            }, 100)
        },
        willClose: () => {
            clearInterval(timerInterval)
        }
        })

        const fileUrl = await fileUpload( file);

        console.log(fileUrl);

        Swal.close();

    }
}