import '../App.css'
import { useState } from "react";

const Counter = () => {
    const [count, setCount] = useState(0);
    const [colour, setColour] = useState('bg-white');
    const [textColour, setTextColour] = useState('text-black')
    const [whiteBorder, setWhiteBorder] = useState('border-black')
    const [showResetModel, setShowResetModel] = useState(false);

    const handelRest = () => {
        setShowResetModel(true);
    }

    const handelBgColour = (colour:string) => {
        setColour(colour);
        if (colour === 'bg-black'){
            setTextColour('text-white');
            setWhiteBorder('border-white');
        } else {
            setTextColour('text-black');
            setWhiteBorder('border-black');
        }
    }

    const handelResetYes = () => {
        setShowResetModel(false);
        setCount(0);
    }

    const handelResetNo = () => {
        setShowResetModel(false);
    }

  return (
    <div className={`h-screen flex flex-col justify-between  ${colour}`}>
        <div className="">
            <div className={`flex justify-center  my-2 ${textColour}`}><button className="border-1 rounded px-2" onClick={handelRest}>Reset</button></div>
            <div className=" flex justify-center gap-2">
                <button className={`bg-black rounded border-1 w-6 h-6 ${whiteBorder}`} onClick={() =>handelBgColour('bg-black')}></button>
                <button className={`bg-white rounded border-1  w-6 h-6`} onClick={() =>handelBgColour('bg-white')}></button>
                <button className={`bg-blue-400 rounded border-1  w-6 h-6`} onClick={() =>handelBgColour('bg-blue-400')}></button>
            </div>
        </div>
        <div className={` flex justify-center font-bold text-9xl ${textColour}`}>{count}</div>
        <div className="  flex justify-evenly font-bold text-4xl mb-10 p-0">
            <div><button className={`border-1 rounded-2xl text-center pb-1 px-4 ${textColour}`} onClick={() => setCount(count-1)}>-</button></div>
            <div><button className={`border-1 rounded-2xl text-center pb-1 px-4 ${textColour}`} onClick={() => setCount(count+1)}>+</button></div>
        </div>

        {showResetModel && (
            <div className={`w-100 h-20 rounded-xl fixed place-content-center ${colour} ${textColour}  bg-opacity-40z-50 border-2 self-center-safe top-50`}>
                <div><h1 className='font-bold flex justify-around'>Are you sure you want to reset the counter?</h1></div>
                <div className='flex justify-evenly'>
                    <div><button className = "border-1 rounded w-10" onClick={handelResetYes}>Yes</button></div>
                    <div><button className = "border-1 rounded w-10" onClick={handelResetNo}>No</button></div>
                </div>
            </div>
        )}

    </div>
  )
}

export default Counter