// phishing_app/receiver.js
const { RTCPeerConnection, RTCSessionDescription } = require('wrtc');

const pc = new RTCPeerConnection();

pc.ontrack = (event) => {
const [stream] = event.streams;
const videoElement = document.createElement('video');
videoElement.srcObject = stream;
videoElement.autoplay = true;
document.body.appendChild(videoElement);
};

fetch('/tmp/offer.json')
.then(response => response.json())
.then(offer => {
pc.setRemoteDescription(new RTCSessionDescription(offer));
pc.createAnswer().then(answer => {
pc.setLocalDescription(answer);
fetch('/answer', {
method: 'POST',
body: JSON.stringify(answer)
});
});
});
