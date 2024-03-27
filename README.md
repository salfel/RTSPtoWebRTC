# Go - RTSPtoWebRTC

RTSP Stream to WebBrowser over WebRTC based on Pion (full native! not using ffmpeg or gstreamer).

**Note**: This repository is a fork of [RTSPtoWebRTC](https://github.com/deepch/RTSPtoWebRTC)

The goal of this fork is to create a dynamic way of restreaming a rtsp connection to webrtc


## Installation

```
go get github.com/salfel/RTSPtoWebRTC
```

## Api

**Set config**

```go
rtsptowebrtc.SetConfig(&rtsptowebrtc.ConfigST{
   Server: rtsptowebrtc.ServerST{
      ICEServers: []string{"stun:stun.l.google.com:19302"},
   },
})
```

**Serve Routes (only gin for now)**

```go
r := gin.Default()

rtsptowebrtc.ServeGin(r)
```

**Start Stream**

```go
rtsptowebrtc.ServeStream(client.Channel, rtsptowebrtc.StreamST{
   OnDemand:     false,
   DisableAudio: true,
   URL:          "rtsp://127.0.0.1:8554/stream",
})
```
