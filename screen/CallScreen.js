import React from 'react'
import {color} from '../styles/styles'
import { 
    StyleSheet,
    Dimensions, 
    Text, 
    TouchableOpacity, 
    Image,
    View
} from 'react-native'
import LottieView from 'lottie-react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {
    RTCPeerConnection,
    RTCIceCandidate,
    RTCSessionDescription,
    RTCView,
    MediaStream,
    MediaStreamTrack,
    mediaDevices,
    registerGlobals
} from 'react-native-webrtc';
import io from 'socket.io-client'
import {stun_turn_config} from '../config/webrtc-config'

const dimensions = Dimensions.get('window')

export default class CallScreen extends React.Component {
    constructor(props) {
      super(props)
  
      this.state = {
        localStream: null,
        remoteStream: null,
        isConnectPeer: true,
        camera: true,
        mic: true,
      }
 
      this.doctor = {
        id: 1, 
        name: 'Bác sĩ Mua', 
        starAveraged: 4.9, 
        starNum: 411, 
        img: "https://zpsocial-f42-org.zadn.vn/89418b993275de2b8764.jpg",
        online: true,
      }

      this.stream = null
      this.pc = null
      this.socket = null
    }
  
    componentDidMount = () => {
  
      this.socket = io.connect(
        'https://calldoctorwebrtc.herokuapp.com/webrtcPeer',
        {
          path: '/io/webrtc',
          query: {}
        }
      )
  
      this.socket.on('connection-success', success => {
        console.log("Kết nối thành công",success)
        this.createOffer()
      })
  
      this.socket.on('offerOrAnswer', (sdp) => {
        if (sdp.type === "answer") {
            this.setState({
              ...this.state,
              isConnectPeer: false
            })
        }
        console.log("Set remote description");
        this.pc.setRemoteDescription(new RTCSessionDescription(sdp))
      })
  
      this.socket.on('candidate', (candidate) => {
        console.log("add candidate vào local");
        this.pc.addIceCandidate(new RTCIceCandidate(candidate))
      })

      this.socket.on('stopCall', (data) => {
        console.log("Hủy kết nối");
        this.pc.close()
        this.props.navigation.goBack()
      })
  
      this.pc = new RTCPeerConnection(stun_turn_config)
  
      this.pc.onicecandidate = (e) => {
        if (e.candidate) {
          console.log("gửi candidate cho người khác");
          this.sendToPeer('candidate', e.candidate)
        }
      }
  
      // triggered when there is a change in connection state
      this.pc.oniceconnectionstatechange = (e) => {
        console.log("thay đổi trạng thái ice");
        console.log(e)
      }
  
      this.pc.onaddstream = (e) => {
        setTimeout(() => {
          this.setState({
            ...this.state,
            remoteStream: e.stream
          })
        }, 1000);
      }
  
      const success = (stream) => {
        console.log("kết nối thiết bị thành công")
        this.setState({
          ...this.state,
          localStream: stream
        })
        this.stream = stream
        this.pc.addStream(stream)
      }
  
      const failure = (e) => {
        console.log('getUserMedia Error: ', e)
      }
  
      let isFront = true;
      mediaDevices.enumerateDevices().then(sourceInfos => {
        console.log(sourceInfos);
        let videoSourceId;
        for (let i = 0; i < sourceInfos.length; i++) {
          const sourceInfo = sourceInfos[i];
          if (sourceInfo.kind == "videoinput" && sourceInfo.facing == (isFront ? "front" : "environment")) {
            videoSourceId = sourceInfo.deviceId;
          }
        }
  
        const constraints = {
          audio: true,
          video: {
            mandatory: {
              minWidth: 500, // Provide your own width, height and frame rate here
              minHeight: 300,
              minFrameRate: 30
            },
            facingMode: (isFront ? "user" : "environment"),
            optional: (videoSourceId ? [{ sourceId: videoSourceId }] : [])
          }
        }
  
        mediaDevices.getUserMedia(constraints)
          .then(success)
          .catch(failure);
      });
    }

    sendToPeer = (messageType, payload) => {
      this.socket.emit(messageType, {
        socketID: this.socket.id,
        payload
      })
    }
  
    createOffer = () => {
      console.log('Offer')
      this.pc.createOffer({ offerToReceiveVideo: 1 })
        .then(sdp => {
          // set offer sdp as local description
          console.log("set local sdp và gửi sdp")
          this.pc.setLocalDescription(sdp)
  
          this.sendToPeer('offerOrAnswer', sdp)
        })
    }
  
    createAnswer = () => {
      console.log('Answer')
      this.pc.createAnswer({ offerToReceiveVideo: 1 })
        .then(sdp => {
          // set answer sdp as local description
          console.log("set local sdp và gửi sdp")
          this.pc.setLocalDescription(sdp)
  
          this.sendToPeer('offerOrAnswer', sdp)
        })
    }

    closeCall = (navigation) => {
        if (this.pc) {
            this.pc.close()
        }
        this.sendToPeer("stopCall", null)
        console.log("going back");
        navigation.goBack()
    }

    onOffCam = () => {
      this.stream.getVideoTracks()[0].enabled = !this.state.camera
      this.setState({
        ...this.state,
        camera: !this.state.camera
      })
    }

    render() {
        const {route, navigation} = this.props;
        const { 
            localStream, 
            remoteStream, 
            isConnectPeer,
            camera
        } = this.state

        const remoteVideo = remoteStream ? 
        (
            <RTCView
              key={2}
              mirror={true}
              style={{ ...styles.rtcViewRemote }}
              objectFit='contain'
              streamURL={remoteStream && remoteStream.toURL()}
            />
        ) :
        (
            <Text></Text>
        )
        return (
            <View style={styles.container}>
                {isConnectPeer ?
                <View style={styles.userInfo}>
                    <LottieView 
                        source={require('../assets/animations/call-loading.json')}
                        size={60}
                        autoPlay
                        loop
                    />
                    <Image style={styles.avatar} source={{uri: this.doctor.img}}/>
                    <Text style={styles.name}>{this.doctor.name}</Text>
                    <Text style={styles.status}>Đang đổ chuông</Text>
                </View>
                :
                (<><View style={styles.videoCall1}>
                    {remoteVideo}
                </View>
                <View style={styles.videoCall2}>
                    <RTCView
                        key={1}
                        zOrder={0}
                        objectFit='cover'
                        style={{ ...styles.rtcView }}
                        streamURL={localStream && localStream.toURL()}
                    />
                </View></>)
                }
                <View style={styles.buttonBox}>
                    {isConnectPeer ?
                    <View style={styles.buttonWrapper}>
                        <View style={styles.iconBox}>
                            <MaterialIcons name="volume-down" color="white" size={30}/>
                        </View>
                        <Text style={styles.textBtn}>Loa</Text>
                    </View>
                    :
                    <View style={styles.buttonWrapper}>
                        <TouchableOpacity onPress={() => localStream._tracks[1]._switchCamera()}>
                            <View style={styles.iconBox}>
                                <Fontisto name="spinner-rotate-forward" color="white" size={30} />
                            </View>
                        </TouchableOpacity>
                        <Text style={styles.textBtn}>Xoay</Text>
                    </View>
                    }
                    <View style={styles.buttonWrapper}>
                        <TouchableOpacity onPress={() => this.closeCall(navigation)}>
                            <View style={{...styles.iconBox, backgroundColor: '#e14141'}}>
                                <MaterialIcons name="call-end" color="white" size={30}/>
                            </View>
                        </TouchableOpacity>
                        <Text style={styles.textBtn}>Kết thúc</Text>
                    </View>
                    <View style={styles.buttonWrapper}>
                        <TouchableOpacity onPress={() => this.onOffCam()}>
                        <View style={styles.iconBox}>
                            <MaterialIcons name="videocam" color="white" size={30}/>
                        </View>
                        </TouchableOpacity>
                        <Text style={styles.textBtn}>Camera</Text>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.PrimaryColor,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    userInfo: {
        marginTop: 80,
        alignItems: 'center',
        flex: 2,
        width: '100%',
    },
    avatar: {
        width: 130,
        height: 130,
        resizeMode: 'cover',
        borderRadius: 65,
        marginTop: 60
    },
    name: {
        textAlign: "center",
        color: 'white',
        fontSize: 30,
        marginTop: 20
    },
    status: {
        textAlign: "center",
        color: '#f1f1f1',
        fontSize: 20,
        marginTop: 16
    },
    videoCall1: {
        position: 'absolute',
        backgroundColor: 'black',
        width: dimensions.width,
        height: dimensions.height,
    },
    videoCall2: {
        position: 'absolute',
        top: 10,
        right: 10,
        width: 100,
        height: 200,
        borderRadius: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        backgroundColor: "black",
        overflow: "hidden",
        zIndex: 1000
    },
    buttonBox: {
        flex: 3,
        flexDirection: "row",
        alignItems: "flex-end",
        marginBottom: 40,
        zIndex: 1000
    },
    buttonWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000
    },
    iconBox: {
        backgroundColor: '#274e59',
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
        tintColor: 'white'
    },
    textBtn: {
        textAlign: "center",
        color: 'white',
        fontSize: 20,
        marginTop: 20
    },
    rtcView: {
        width: 100, //dimensions.width,
        height: 200,//dimensions.height / 2,
        backgroundColor: 'black',
        borderRadius: 10
    },
    rtcViewRemote: {
        width: "100%",
        height: "100%",//dimensions.height / 2,
        backgroundColor: 'black',
    }
})
