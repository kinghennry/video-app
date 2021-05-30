 import {useContext} from 'react'
import { FiPhoneCall } from 'react-icons/fi'
import { VideoContext } from "../VideoContext"
import { Button } from '@material-ui/core'

const Notifications = () => {
    const { callAccepted, answerCall, call } = useContext(VideoContext)

    return (
        <>
            {call.isReceivedCall && !callAccepted && (
                <div className="notifications">
                    <h2>{call.name } is calling </h2>
                    <Button className="copy__button" onClick={answerCall}>Answer
                    <FiPhoneCall className="copy__icon" /> 
                    </Button>
                </div>
            )}
        </>
    )
}
                   


export default Notifications
