import React,{useContext,useState} from 'react'
import {CopyToClipboard} from "react-copy-to-clipboard"
import {FiCopy,FiPhone,FiPhoneOff} from "react-icons/fi"
import { VideoContext } from "../VideoContext"
import { Button } from '@material-ui/core'
const Options = ({children}) => {
    const { me, callAccepted, name, setName, callEnded, leaveCall, callUser } = useContext(VideoContext)
    
    const [idToCall, setIdToCall] = useState('')
    
    return (
        <div className="options">
            <form>
                <div className="form__wrapper">
                    <h4>Account Info</h4>
                    <div className="form__input">
                        <input type="text" placeholder="Please Input your name" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                
                <CopyToClipboard text={me} >
                    <Button className="copy__button">COPY
                        <FiCopy className="copy__icon"/>
                    </Button>
                </CopyToClipboard>
                </div>

                <div className="form__wrapper">
                    <h4>Make a call</h4>
                    <div className="form__input">
                    <input type="text" placeholder="Id to call" value={idToCall} onChange={(e) => setIdToCall(e.target.value)} />
                    </div>
                    {callAccepted && !callEnded ? (
                        <Button onClick={leaveCall}
                            className="copy__button"
                        >Hang Up
                        <FiPhoneOff className="copy__icon"/>
                        </Button>
                    ): (
                        <Button onClick={() => callUser(idToCall)} className="copy__button" >Call
                            <FiPhone className="copy__icon"/> 
                            </Button>
                   )}
                </div>
            {children}
            </form>
        </div>
    )
}

export default Options
