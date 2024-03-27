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
rtsptowebrtc.ServeStream("test", rtsptowebrtc.StreamST{
   OnDemand:     false,
   DisableAudio: true,
   URL:          "rtsp://127.0.0.1:8554/stream",
})
```

**Remove Stream**

```go
rtsptowebrtc.RemoveStream("test")
```

## Web

Include both the webrtc-adapter.js and webrts.js scripts in your html markup

```html
<script src="/js/webrtc-adapter.js"></script>
<script defer src="/js/webrtc.js"></script>
```
### Changes applicable for webrtc.js

Be aware that you might need to change the suuid, depending on where in your url the suuid is located at or however you define it

You can also change the querySelector for the videoElement for more fine-grained control over the videoElement

## Example

A example application on how to integrate the RTSPtoWebRTC package can be found in this [repository](github.com/salfel/camera) under the server dir
