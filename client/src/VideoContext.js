import { useState, useEffect, useRef, createContext } from "react"
import {io} from "socket.io-client"
import Peer from "simple-peer"
 
const VideoContext = createContext()

const socket = io('http://localhost:5000')

const VideoProvider = ({ children }) => {
    const [stream, setStream] = useState(null)
    const [me, setMe] = useState('')
    const [call, setCall] = useState({})
    const [callAccepted, setCallAccepted] = useState(false)
    const [callEnded, setCallEnded] = useState(false)
    const [name, setName] = useState('')
    
    //refs
    const myVideo = useRef()
    const userVideo = useRef()
    const connectionRef = useRef()

    // get permission to use video and audio on  a web page
    useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((currentStream) => {
                setStream(currentStream)

                myVideo.current.srcObject = currentStream
            })
        socket.on("me", (id) => setMe(id))
        
        socket.on("calluser", ({ from, name: callerName, signal }) => {
            setCall({isReceivedCall:true,from,name:callerName,signal})
        })
    },[])
    
    // all functions to make our video chat work.
    const answerCall = () => {
        setCallAccepted(true)

        //create a peer
        const peer = new Peer({ initiator: false, trickle: false, stream })
        
        peer.on("signal", (data) => {
            socket.emit("answercall",{signal:data,to:call.from})
        })

        peer.on("stream", (currentStream) => {
            userVideo.current.srcObject = currentStream
        })
        peer.signal(call.signal)

        connectionRef.current = peer
    }

    const callUser = (id) => {
        //create a peer
        const peer = new Peer({ initiator: true, trickle: false, stream })
         peer.on("signal", (data) => {
            socket.emit("calluser",{userToCall : id , signalData:data,from:me,name })
        })

        peer.on("stream", (currentStream) => {
            userVideo.current.srcObject = currentStream
        })

        socket.on("callaccepted", (signal) => {
            setCallAccepted(true)

            peer.signal(signal)
        })

        connectionRef.current = peer
    }

    const leaveCall = () => {
        setCallEnded(true)

        connectionRef.current.destroy()

        window.location.reload()
    }

    return (
        <VideoContext.Provider value={{
            call,callAccepted,myVideo,userVideo,userVideo,stream,name,setName,callEnded,me,callUser,leaveCall,answerCall,
        }}>
        {children}
        </VideoContext.Provider>
)
}
export {VideoProvider,VideoContext}
