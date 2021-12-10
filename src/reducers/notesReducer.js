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

        case types.notesLoad:
            return {
                ...state,
                notes: [...action.payload]      
            }   
    
        default:
            return state;
    }

}