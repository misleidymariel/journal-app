import React from 'react'

export const JournalEntry = () => {
    return (
        <div className="journal__entry pointer">

            <div 
                className="journal__entry-pinture"
                style={{
                    backgroundSize: 'cover',
                    backgroundImage: 'url(https://escribirte.com.ar/wp-content/uploads/2020/01/Poemas-de-paiasjes-1.jpg?ezimgfmt=ng%3Awebp%2Fngcb1%2Frs%3Adevice%2Frscb1-1)'

                }}
            ></div>

            <div className="journal__entry-body">
                <p className="journal__entry-title">
                    Un nuevo dia
                </p>
                <p className="journal__entry-content">
                    El planeta tierra es en sí mismo una de las grandes maravillas 
                    del universo
                    
                </p>

            </div>

            <div className="journal__entry-date-box">
                <span>Monday</span>
                <h4>06</h4>

            </div>
            
        </div>
    )
}
