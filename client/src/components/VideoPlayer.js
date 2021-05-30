import {useContext} from "react"
import { VideoContext } from "../VideoContext"
import { AiOutlineEye } from 'react-icons/ai'
import { Button } from '@material-ui/core'

const VideoPlayer = () => {
 const {name,callAccepted,myVideo,userVideo,stream,call,callEnded} = useContext(VideoContext)
    return (
        <section className="video">
            <div className="container">
                {stream && (
                    <Button  className="video__live">
                        Live
                         <AiOutlineEye className="video__liveIcon" />
                    </Button>
                )}
                <div className="video__container">
                 {stream && (
                    <div className="video__box">
                        <video ref={myVideo} muted autoPlay playsInline/>
                        <h4>{name || 'Name'}</h4>
                    </div>
            )} 
                    {/* user vidoe */}
            {callAccepted && !callEnded && (
                <div className="video__box">
                        <video ref={userVideo} muted autoPlay playsInline />
                        <h4>{call.name || 'Name'}</h4>
                    </div>
            )}
                    
                </div>
            </div>
        </section> 
    )
}

export default VideoPlayer
