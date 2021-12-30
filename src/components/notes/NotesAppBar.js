
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startSaveNote, startUploading } from '../../actions/notes';

export const NotesAppBar = () => {


    const dispatch = useDispatch();
    const { active } = useSelector(state => state.notes);

    const handleSave = () =>{
        //console.log(active)
        dispatch( startSaveNote( active))

    }

    const handlePintureClick = () =>{
        document.querySelector('#fileSelector').click()
    }

    const handleFileChange = (e) => { 
        const file = e.target.files[0];
        if( file){
            dispatch( startUploading(file) )
        }

    }

    return (
        <div className="notes__appbar">
            <span>20 de Septiembre 2021</span>

            <input
                id= "fileSelector"
                type="file"
                name= "file"
                style={{ display:'none'}}
                onChange={ handleFileChange} 
            />

            <div>
                <button 
                    className="btn"
                    onClick ={ handlePintureClick} 
                >
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
