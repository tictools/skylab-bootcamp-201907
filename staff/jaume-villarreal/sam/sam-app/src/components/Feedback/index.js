import React from 'react'

function Feedback({ message }){
    return  <div> 
                <h3>Error handling</h3>
                <p className = "feedback__text">{message}</p>
            </div>
}

export default Feedback