import React from 'react'
import { NotesAppBar } from './NotesAppBar'

export const NoteScreen = () => {
    return (

        <div className="notes__main-content">

            <NotesAppBar/>

            <div className="notes__content">

                <input
                    type="text"
                    placeholder="Sone awesome title"
                    className="notes__title-input" 
                    autoComplete="off"
                />

                <textarea
                    placeholder="What happened today"
                    className="notes__textarea"
                ></textarea>
               
                <div className="notes__image">
                   <img
                       src="https://viajes.nationalgeographic.com.es/medio/2019/01/30/los-alpes_5d57b29e_1200x630.jpg"
                        alt="images playa"
                   />

                </div>

            </div>
            
        </div>
    )
}
