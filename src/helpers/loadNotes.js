import { db } from "../firebase/firebase-config"

import { collection } from "firebase/firestore";
import { getDocs } from "firebase/firestore";


export const loadNotes = async ( uid) => {
    
    const notesRef = collection(db, uid, "journal", "notes");
    
    const notes = [];

    try {
        const res = await getDocs(notesRef);
        
        res.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            notes.push({
                id: doc.id, 
                ...doc.data()
            })
        });
      } catch (e) {
        console.log("Error getting cached document:", e);
      }
   
    return notes;
}    