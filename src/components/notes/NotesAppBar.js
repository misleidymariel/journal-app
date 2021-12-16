
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startSaveNote } from '../../actions/notes';

export const NotesAppBar = () => {


    const dispatch = useDispatch();
    const { active } = useSelector(state => state.notes);

    const handleSave = () =>{
        //console.log(active)
        dispatch( startSaveNote( active))

    }



    return (
        <div className="notes__appbar">
            <span>20 de Septiembre 2021</span>

            <div>
                <button className="btn">
                    Pinture
                </button>
                
                <button 
                    className="btn"
                    onClick={ handleSave}
                >
                    Save
                </button>
            </div>
            
        </div>
    )
}
