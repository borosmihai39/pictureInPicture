const videoElement = document.getElementById('video');
const button = document.getElementById('button');
const choose = document.getElementById('choose-another');

// Prompt user to select a media stream async function, pass to video element, then play

async function selectMediaStream() {
    try {
        const mediaStream = await navigator.mediaDevices.getDisplayMedia();
        videoElement.srcObject = mediaStream;
        videoElement.onloadedmetadata = () => {
            videoElement.play();
        }
    } catch(error){
// catch error here
    }
}

async function stopStreamedVideo(videoElem) {
    const stream = videoElement.srcObject;
    const tracks = stream.getTracks();
  
    tracks.forEach(function(track) {
      track.stop();
    });
  
    videoElement.srcObject = null;
    selectMediaStream();
  }

button.addEventListener('click',async () => {
    // Disable Button
    button.disabled = true;
    // Start Picture in Picture
    await videoElement.requestPictureInPicture();
    // Reset Button
    button.disabled = false;
});


choose.addEventListener('click',stopStreamedVideo);

selectMediaStream();