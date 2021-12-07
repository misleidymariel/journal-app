import { db } from "../firebase/firebase-config"

import { collection,} from "firebase/firestore";


export const loadNotes = async ( uid) => {
    
    const notesSnap = await collection( db, `${ uid}/journal/notes`)
    const notes = [];

    console.log( notesSnap); 

    return notes;
}    