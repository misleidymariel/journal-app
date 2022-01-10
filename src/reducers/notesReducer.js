/*

    notes: []
    active: null,
    active: {
        id: yywq,
        title: '',
        body: '' ,
        imagesUrl: '',
        date: 1234567890
    }

*/

//import Swal from "sweetalert2";
import { types } from "../types/types";

//reducer una funcion pura 

const initialState = {
    notes: [], 
    active: null
}

export const notesReducer = ( state = initialState, action) =>{

    switch (action.type) {
         
        case types.notesActive:
            return {
                ...state,
                active:{
                    ...action.payload
                }
            }

        case types.notesAddNew:
            return {
                ...state,
               notes: [action.payload, ...state.notes]
            }    

        case types.notesLoad:
            return {
                ...state,
                notes: [...action.payload]      
            }  
            
            
        case types.notesUpdated:
            return{
                ...state,
                notes: state.notes.map(
                    note => note.id === action.payload.id
                    ? action.payload.note
                    : note
                ) 
            }  
        case types.notesDelete:
            return {
                ...state,
                active: null,
                notes: state.notes.filter( note => note.id !== action.payload)
            } 

        case types.notesLogoutCleaning: 
            return {
                ...state,
                active: null,
                notes:[] 
            }
        default:
            return state;
    }

}