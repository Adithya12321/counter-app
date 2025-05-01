import React, { useState } from 'react'

const Test = () => {
    const [showModal, setShowmodal] = useState(false);
  return (
    <div>
        <div><button onClick={() => setShowmodal(true)}>show modal</button></div>
        { showModal && (
            <div>
                <div><h1>Are you sure you want to reset</h1></div>
                <div><button onClick={() => setShowmodal(false)}>yes</button></div>
            </div>
        )}
    </div>
  )
}

export default Test