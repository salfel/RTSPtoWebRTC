let stream = new MediaStream();
const suuid = window.location.pathname.split("/").pop()

let config = {
    iceServers: [{
        urls: ["stun:stun.l.google.com:19302"]
    }]
}

const pc = new RTCPeerConnection(config);
pc.onnegotiationneeded = handleNegotiationNeededEvent;

pc.ontrack = function(event) {
    stream.addTrack(event.track)
    document.querySelector("video").srcObject = stream;
}

async function handleNegotiationNeededEvent() {
    let offer = await pc.createOffer()
    await pc.setLocalDescription(offer)
    getRemoteSdp();
}

document.addEventListener("ready", getCodecInfo);

async function getCodecInfo() {
    const response = await fetch(`/stream/codec/${suuid}`)
    const data = await response.json()
    for (const value of data) {
        pc.addTransceiver(value.Type, {direction: "sendrecv"})
    }
}

let sendChannel = null;

async function getRemoteSdp() {
    const response = await fetch(`/stream/receiver/${stream}`, {
        method: "POST",
        body: JSON.stringify({
            suuid,
            data: btoa(pc.localDescription.sdp)
        })
    })
    const data = await response.json()

    pc.setRemoveDescription(new RTCSessionDescription({
        type: "answer",
        sdp: atob(data)
    }))
}
