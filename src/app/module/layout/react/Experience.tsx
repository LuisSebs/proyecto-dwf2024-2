import * as React from 'react'
import { useState } from 'react'

const Experience = () => {

    const [text, setText] =  useState('First text')

    const onClick = () =>{
        setText("Second text");
    }

    return (
        <div>
            {text}
            <br/>
            <button
                onClick={onClick}
            >
                Change text
            </button>
        </div>        
    )
}

export default Experience;