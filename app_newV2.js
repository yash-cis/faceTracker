// Once the whole document is loaded completely ...
var constraints = { audio: true, video: { width: { min: 320, ideal: 320, max: 640 }, height: { min: 240, ideal: 240, max: 480 }, framerate: 30 } };
var videoElement;
var recBtn;
var stopBtn;
var recBtnRV;
var stopBtnRV;
var downloadLink;
var downloadLinkRV;
var mediaRecorder;
var chunks = [];
var count = 0;
var localStream = null;
var _config__use_webcam = false;
var _container;
var _imageData;
var videoRV;
var _videoSource;
var _inputFile;
var _containerRV;
var _imageDataRV;
var firstLoaded = false;
var sessionName = '';
var webcam_resolution = { video: { width: 440, height: 280, frameRate: 30 } };
faceData = [];
feameId = 0;
captureFaceDetails = false;
var _pointsToAdd = [];
var pointsPerFrame = [];
let analyze = false;
let ScaleDataStr = "Scale Data\n\tFrame\tScale\n";
let MaskPositionDataStr = "Mask Position Data\n\tFrame\tX pixels\tY pixels\n";
let RotationDataStr = "Rotation Data\n\tFrame\tXRot\tYRot\tZRot\n";
var finalData = [];
    MaskPositionData=[],
    RotationData=[],
    ScaleData =[];
var testFaceArray = [];

var _ctx = null;
var _timeoutId = -1;
facePoints = [
    { key: [], val: 24, caption:"Effects Face Track Points #1    Left Eyebrow Middle #24 \n\tFrame\tX pixels\tY pixels\n" },
    { key: [], val: 22, caption: "Effects Face Track Points #1    Left Eyebrow Inner #22 \n\tFrame\tX pixels\tY pixels\n" },
    { key: [], val: 26, caption: "Effects Face Track Points #1    Left Eyebrow Outer #26 \n\tFrame\tX pixels\tY pixels\n" },
    { key: [], val: 42 , caption: "Effects Face Track Points #1    Left Eye Inner #42 \n\tFrame\tX pixels\tY pixels\n"},
    { key: [], val: 45 , caption:"Effects Face Track Points #1    Left Eye Outer #45 \n\tFrame\tX pixels\tY pixels\n"},
    { key: [], val: 21 , caption:"Effects Face Track Points #1    Right Eyebrow Inner #21 \n\tFrame\tX pixels\tY pixels\n"},
    { key: [], val: 19 , caption:"Effects Face Track Points #1    Right Eyebrow Middle #19 \n\tFrame\tX pixels\tY pixels\n"},
    { key: [], val: 17 , caption:"Effects Face Track Points #1    Right Eyebrow Outer #17 \n\tFrame\tX pixels\tY pixels\n"},
    { key: [], val: 39 , caption:"Effects Face Track Points #1    Right Eye Inner #39 \n\tFrame\tX pixels\tY pixels\n"},
    { key: [], val: 36 , caption:"Effects Face Track Points #1    Right Eye Outer #36 \n\tFrame\tX pixels\tY pixels\n"},
    { key: [], val: 27 , caption:"Effects Face Track Points #1    NoseBridge #27 \n\tFrame\tX pixels\tY pixels\n"},
    { key: [], val: 30 , caption:"Effects Face Track Points #1    NoseTip #30 \n\tFrame\tX pixels\tY pixels\n"},
    { key: [], val: 35 , caption:"Effects Face Track Points #1    Left Nostril #35 \n\tFrame\tX pixels\tY pixels\n"},
    { key: [], val: 31 , caption:"Effects Face Track Points #1    Right Nostril #31 \n\tFrame\tX pixels\tY pixels\n"},
    { key: [], val: 54 , caption:"Effects Face Track Points #1    Mouth Left #54 \n\tFrame\tX pixels\tY pixels\n"},
    { key: [], val: 51 , caption:"Effects Face Track Points #1    Mouth Top #51 \n\tFrame\tX pixels\tY pixels\n"},
    { key: [], val: 48 , caption:"Effects Face Track Points #1    Mouth Right #48 \n\tFrame\tX pixels\tY pixels\n"},
    { key: [], val: 57 , caption:"Effects Face Track Points #1    Mouth Bottom #57 \n\tFrame\tX pixels\tY pixels\n"},
    { key: [], val: 15 , caption:"Effects Face Track Points #1    Left Cheek Top #15 \n\tFrame\tX pixels\tY pixels\n"},
    { key: [], val: 13 , caption:"Effects Face Track Points #1    Left Cheek Middle #13 \n\tFrame\tX pixels\tY pixels\n"},
    { key: [], val: 1 , caption:"Effects Face Track Points #1    Right Cheek Top #1 \n\tFrame\tX pixels\tY pixels\n"},
    { key: [], val: 3 , caption:"Effects Face Track Points #1    Right Cheek Middle #3 \n\tFrame\tX pixels\tY pixels\n"},
    { key: [], val: 8 , caption:"Effects Face Track Points #1    Chin #8 \n\tFrame\tX pixels\tY pixels\n"},
    { key: [], val: 37 , caption:"Effects Face Track Points #1    Right Eye Upper #37 \n\tFrame\tX pixels\tY pixels\n"},
    { key: [], val: 38 , caption:"Effects Face Track Points #1    Right Eye Upper2 #38 \n\tFrame\tX pixels\tY pixels\n"},
    { key: [], val: 41 , caption:"Effects Face Track Points #1    Right Eye Lower1 #41 \n\tFrame\tX pixels\tY pixels\n"},
    { key: [], val: 40 , caption:"Effects Face Track Points #1    Right Eye Lower2 #40 \n\tFrame\tX pixels\tY pixels\n"},
    { key: [], val: 43 , caption:"Effects Face Track Points #1    Left Eye Upper1 #43 \n\tFrame\tX pixels\tY pixels\n"},
    { key: [], val: 44 , caption:"Effects Face Track Points #1    Left Eye Upper2 #44 \n\tFrame\tX pixels\tY pixels\n"},
    { key: [], val: 47 , caption:"Effects Face Track Points #1    Left Eye Lower1 #47 \n\tFrame\tX pixels\tY pixels\n"},
    { key: [], val: 46 , caption:"Effects Face Track Points #1    Left Eye Lower2 #46 \n\tFrame\tX pixels\tY pixels\n"},
    { key: [], val: 23 , caption:"Effects Face Track Points #1    Left Eyebrow1 #23 \n\tFrame\tX pixels\tY pixels\n"},
    { key: [], val: 25 , caption:"Effects Face Track Points #1    Left Eyebrow2 #25 \n\tFrame\tX pixels\tY pixels\n"},
    { key: [], val: 20 , caption:"Effects Face Track Points #1    Right Eyebrow1 #20 \n\tFrame\tX pixels\tY pixels\n"},
    { key: [], val: 18 , caption:"Effects Face Track Points #1    Right Eyebrow2 #18 \n\tFrame\tX pixels\tY pixels\n"},
    { key: [], val: 33 , caption:"Effects Face Track Points #1    MidNostril #33 \n\tFrame\tX pixels\tY pixels\n"},
    { key: [], val: 32 , caption:"Effects Face Track Points #1    NostrilR1 #32 \n\tFrame\tX pixels\tY pixels\n"},
    { key: [], val: 34 , caption:"Effects Face Track Points #1    NostrilL1 #34 \n\tFrame\tX pixels\tY pixels\n"},
    { key: [], val: 49 , caption:"Effects Face Track Points #1    Mouth Right Mid Top #49 \n\tFrame\tX pixels\tY pixels\n"},
    { key: [], val: 50 , caption:"Effects Face Track Points #1    Mouth Right Top #50 \n\tFrame\tX pixels\tY pixels\n"},
    { key: [], val: 53 , caption:"Effects Face Track Points #1    Mouth Left Mid Top #53 \n\tFrame\tX pixels\tY pixels\n"},
    { key: [], val: 52 , caption:"Effects Face Track Points #1    Mouth Left Top #52 \n\tFrame\tX pixels\tY pixels\n"},
    { key: [], val: 59 , caption:"Effects Face Track Points #1    Mouth Right MidData Bottom  #59 \n\tFrame\tX pixels\tY pixels\n"},
    { key: [], val: 58 , caption:"Effects Face Track Points #1    Mouth Right BottomData #58 \n\tFrame\tX pixels\tY pixels\n"},
    { key: [], val: 55 , caption:"Effects Face Track Points #1    Mouth Left MidDataBottom #55 \n\tFrame\tX pixels\tY pixels\n"},
    { key: [], val: 56 , caption:"Effects Face Track Points #1    Mouth Left Bottom #56 \n\tFrame\tX pixels\tY pixels\n"},
    { key: [], val: 62 , caption:"Effects Face Track Points #1    Mouth Top Inner1 #62 \n\tFrame\tX pixels\tY pixels\n"},
    { key: [], val: 66 , caption:"Effects Face Track Points #1    Mouth Top Inner2 #66 \n\tFrame\tX pixels\tY pixels\n"},
    { key: [], val: 10 , caption:"Effects Face Track Points #1    Jaw Left #10 \n\tFrame\tX pixels\tY pixels\n"},
    { key: [], val: 6 , caption: "Effects Face Track Points #1   Jaw Right #6 \n\tFrame\tX pixels\tY pixels\n"}
]


var _resolution = null;
var _brfManager = null;
var _brfv4;
var _config__yawn = false; // true for showing how wide open the mouth is.
var _config__only_point_tracking = false; // whether or not to turn on face tracking

var duration = 0;
var frameRate = 0;
var totalFrame = 0;
var track = false;

//Calculate FrameRate
function getCurrentVideoFrame(frameRate, currentTime) {
    /**
     * Gets the current time, multiplies by the framerate to find current frame
     */
    console.log("000000000000000000000000000000000000000000000000");
    // debugger
    // curTime = document.getElementById("videoRV").currentTime;
    theCurrentFrame=Math.floor(currentTime*frameRate);
    console.log('theCurrentFrame: ', theCurrentFrame);
    console.log('theCurrenttime: ', currentTime);
    // debugger
    return theCurrentFrame;
}

function onHTMLLoadedCompletely(event, webcam = false) {
    // console.log("onHTMLLoadedCompletely called");
    // ... get the elements from the HTML document.

    // var _video = document.getElementById("_video");


    var _container = document.getElementById("_container");
    var _imageData = document.getElementById("_imageData");
    var _clickArea = document.getElementById("_clickArea");

    var _containerRV = document.getElementById("_containerRV");
    var _clickAreaRV = document.getElementById("_clickAreaRV");

    // var _inputFile = document.getElementById("_inputFile");

    var _containerRV = document.getElementById("_containerRV");
    var _imageDataRV = document.getElementById("_imageDataRV");


    let recordedBlobs = [];
    let i = 0;
    // ###### config start ######

    _config__use_webcam = webcam; // true for using webcam, false for loading a video file
    //console.log('_config__use_webcam: ', _config__use_webcam);
    

    var brfv4 = { locateFile: function () { return "lib/BRFv4_JS_DK130519_v4.2.1_commercial.wasm"; } };
    _brfv4 = brfv4


    // var webcam_resolution = {
    //     video: {
    //         width: 640,
    //         height: 480,
    //         frameRate: 30
    //     }
    // };

    // ###### config end ######

    // ###### ctx start ######

    // The video stream size must be known before we can use BFRv4.
    // The video stream size comes either from the webcam stream or from the loaded video file.

 

    function onVideoSizeKnown() {
        // console.log("onVideoSizeKnown called");
        if (_config__use_webcam) {
            _imageData.width = _video.videoWidth;
            _imageData.height = _video.videoHeight;
            _ctx = _imageData.getContext("2d");
            _clickArea.style.width = _imageData.width + "px";
            _clickArea.style.height = _imageData.height + "px";
            _container.style.height = _imageData.height + "px";
            _clickArea.addEventListener("click", function (event) {
                // console.log("Clicked: __  ");
                // console.log(_pointsToAdd);
                _pointsToAdd.push(new brfv4.Point(event.layerX, event.layerY));
            });
        } else {
            _imageDataRV.width = videoRV.videoWidth;
            _imageDataRV.height = videoRV.videoHeight;
            _ctx = _imageDataRV.getContext("2d");
            _clickAreaRV.style.width = _imageDataRV.width + "px";
            _clickAreaRV.style.height = _imageDataRV.height + "px";
            _containerRV.style.height = _imageDataRV.height + "px";
            _clickAreaRV.addEventListener("click", function (event) {
                // console.log("Clicked: __  ");
                // console.log(_pointsToAdd);
                _pointsToAdd.push(new brfv4.Point(event.layerX, event.layerY));
            });
        }



        waitForSDK();
    }


    // ###### ctx end ######

    // ###### webcam setup start ######

    if (_config__use_webcam) { // using webcam

        if (!navigator.mediaDevices.getUserMedia) {
            alert('navigator.mediaDevices.getUserMedia not supported on your browser, use the latest version of Firefox or Chrome');
        } else {
            if (window.MediaRecorder == undefined) {
                alert('MediaRecorder not supported on your browser, use the latest version of Firefox or Chrome');
            } else {
                // var constraints = { audio: true, video: { width: 440, height: 280, frameRate: 30 } };
                var constraints = { audio: true, video: { width: 640, height: 480, frameRate: 30 } };

                // setTimeout(() => {
                // console.log("Flow 1");
                // navigator.getUserMedia
                navigator.mediaDevices.getUserMedia(constraints)
                    .then(function (stream) {
                        localStream = stream;
                        // console.log("Flow 2");

                        localStream.getTracks().forEach(function (track) {
                            if (track.kind == "audio") {
                                track.onended = function (event) {
                                    // console.log("audio track.onended Audio track.readyState=" + track.readyState + ", track.muted=" + track.muted);
                                }
                            }
                            if (track.kind == "video") {
                                track.onended = function (event) {
                                    // console.log("video track.onended Audio track.readyState=" + track.readyState + ", track.muted=" + track.muted);
                                }
                            }
                        });

                        // onHTMLLoadedCompletely().onVideoSizeKnown();
                        videoElement.srcObject = localStream;
                        // console.log(videoElement.videoWidth);
                        // console.log(videoElement.videoHeight);
                        videoElement.play()
                            .then(function () {
                                onVideoSizeKnown();
                            });
                    }).catch(function (err) {
                        console.log(err);
                        /* handle the error */
                        console.log('navigator.getUserMedia error: ' + err);
                    });
            }
        }
        // window.navigator.mediaDevices.getUserMedia(webcam_resolution)
        //     .then(function (mediaStream) {
        //         _video.srcObject = mediaStream;
        //         let options = { mimeType: 'video/webm;codecs=vp9' };
        //         mediaRecorder = new MediaRecorder(mediaStream, options);
        //         mediaRecorder.ondataavailable = handleDataAvailable;
        //         mediaRecorder.start();
        //         _video.play().then(function () { onVideoSizeKnown(); });
        //     })
        //     .catch(function () { alert("No camera available."); });
    }

    // ###### webcam setup end ######



    // ###### video setup start ######

    // console.log('firstLoaded: ', firstLoaded);
    if (!_config__use_webcam && firstLoaded) { // using video

        if (!_inputFile) {
            // <input id="_inputFile" type="file" name="file[]" class="file_multi_video" accept="video/*">

            _inputFile = document.createElement("input");
            _inputFile.id = "_inputFile";
            _inputFile.type = "file";
            _inputFile.name = "_inputFile";
            _inputFile.className = "file_multi_video";
            _inputFile.accept = "video/*";
            _inputFile.style = "margin-bottom: 20px;padding-top: 10px;";
            document.getElementById("loadVideo").appendChild(_inputFile);
            // document.body.appendChild()
        }
        // if (document.getElementById("videoRV").currentTime > 0) {
        //     localStream = videoRV.mozCaptureStream ? videoRV.mozCaptureStream() : videoRV.captureStream();
        // }
        videoRV.onloadstart = function () {
            // console.log("Video loading...");
        };
        videoRV.oncanplaythrough = function () {
            // console.log("Video ready...");
            // console.log(videoRV.videoWidth);
            // console.log(videoRV.videoHeight);
            localStream = videoRV.mozCaptureStream ? videoRV.mozCaptureStream() : videoRV.captureStream();
            if (navigator.userAgent.indexOf('Firefox') == -1) {
                videoRV.muted = true;
            }
            onVideoSizeKnown();
            // localStream = videoRV.mozCaptureStreamUntilEnded();
            console.log('localStream: ', localStream);
        };

        _inputFile.addEventListener("change", function () {
            if (!_videoSource) {
                _videoSource = document.createElement("source");
                _videoSource.id = "_videoSource";
                videoRV.appendChild(_videoSource);
            }
            _imageDataRV.style.display = "block";
            // localStream = true;
            // videoUrl =  URL.createObjectURL(this.files[0]);
            document.getElementById("_videoSource").src = URL.createObjectURL(this.files[0]);
            document.getElementById("videoRV").load();

            document.getElementById("test").src = URL.createObjectURL(this.files[0]);
            document.getElementById("testVid").load();
            // videoRV.load();

        });
    }

    // ###### video setup end ######



    // ###### BRF start ######

    initializeBRF(brfv4); // we added the brfv4 js synchronously, so it's loaded here.

    function waitForSDK() {

        // BRFv4 AND the video need to be ready for BRF to start properly.
        if (brfv4.sdkReady && _ctx) { initSDK(); return; }
        clearTimeout(_timeoutId);
        _timeoutId = setTimeout(waitForSDK, 250);
    }

  

    


    function initSDK() {
        // console.log("INIT SDK CALLED");
        if (_config__use_webcam) {
            _resolution = new brfv4.Rectangle(0, 0, _imageData.width, _imageData.height);
        } else {
            _resolution = new brfv4.Rectangle(0, 0, _imageDataRV.width, _imageDataRV.height);
        }
        _brfManager = new brfv4.BRFManager();
        _brfManager.init(_resolution, _resolution, "davidsvideotracking");

        var stepSize = 24;
        var minFaceSize = _resolution.height * 0.16; // quite small faces should be detectable ...
        var maxFaceSize = _resolution.height * 2.00; // ... and large ones as well

        if (_config__only_point_tracking) {
            _brfManager.setMode(brfv4.BRFMode.POINT_TRACKING)
        } else {
            _brfManager.setMode(brfv4.BRFMode.FACE_TRACKING)
        }

        _brfManager.setFaceDetectionParams(minFaceSize, maxFaceSize, stepSize, 6);
        _brfManager.setFaceTrackingStartParams(minFaceSize, maxFaceSize, 35, 35, 35);
        _brfManager.setFaceTrackingResetParams(minFaceSize - stepSize, maxFaceSize + stepSize, 35, 55, 35);
        _brfManager.setNumFacesToTrack(1);
        // _brfManager.setMode(brfv4.BRFMode.POINT_TRACKING)
        _brfManager.setOpticalFlowCheckPointsValidBeforeTracking(false);

        // Once the tracking is started, it is continously, even, if the video is paused
        // localStream.getVideoTracks()[0].getSettings().frameRate
        // console.log('localStream.getVideoTracks(): ', localStream.getVideoTracks());
        // console.log('localStream.getVideoTracks()[0].getSettings().frameRate: ', localStream.getVideoTracks()[0].getSettings().frameRate);
        setInterval(function(){ trackFaces(document.getElementById("videoRV").currentTime); }, 1000/frameRate); // Aims at 60 FPS.
        // if (frameRate != 0) {
        //     document.getElementById("videoRV").play();
        //     let vid = document.getElementById("videoRV");
        //     setTimeout(function () {
        //         vid.pause();
        //         setInterval(
        //             function () {
        //                 trackFaces(document.getElementById("videoRV").currentTime);
        //                 vid.currentTime += (1 / frameRate);
        //             }, frameRate
        //         );
        //     }, frameRate);
        // }
    }

    function handleDataAvailable(event) {
        if (event.data && event.data.size > 0) {
            recordedBlobs.push(event.data);
        }
    }

    // function trackFaces() {
    //     // console.log("Track faces called");
    //     // console.log(videoElement.videoWidth);
    //     // console.log(videoElement.videoHeight);
    //     if (_pointsToAdd.length > 0) {
    //         // Add all clicked points right before a tracking update occurs,
    //         // otherwise the tracking would get mixed up.
    //         // console.log("in points to add");
    //         // _pointsToAdd.forEach(element => {
    //         //     // console.log('element: ', element);
    //         // });
    //         _brfManager.addOpticalFlowPoints(_pointsToAdd);
    //         // _pointsToAdd.length = 0;
    //         _pointsToAdd = [];
    //     }

    //     if (!_config__use_webcam) {
    //         _ctx.drawImage(videoRV, 0, 0, _resolution.width, _resolution.height);
    //     } else {
    //         // console.log("Just before Drawing Points");
    //         // _ctx.setTransform(-1.0, 0, 0, 1, _resolution.width, 0);
    //         _ctx.drawImage(_video, 0, 0, _resolution.width, _resolution.height);
    //         // _ctx.setTransform(1.0, 0, 0, 1, 0, 0);
    //     }

    //     _brfManager.update(_ctx.getImageData(0, 0, _resolution.width, _resolution.height).data);

    //     drawRects(_ctx, _brfManager.getAllDetectedFaces(), "#00a0ff", 1.0);
    //     drawRects(_ctx, _brfManager.getMergedDetectedFaces(), "#ffd200", 3.0);
    //     // _brfManager.rotationX()
    //     // console.log('_brfManager.rotationX(): ', _brfManager.rotationX());
    //     var faces = _brfManager.getFaces();
    //     var i;

    //     //below cod eis for incrementing the frame count
    //     if (captureFaceDetails) {
    //         feameId = getCurrentVideoFrame(frameRate);
    //         // debugger
    //         // console.log('feameId: ', feameId);
    //     }


    //     for (i = 0; i < faces.length; i++) {

    //         var face = faces[i];

    //         if (face.state === brfv4.BRFState.FACE_TRACKING_START ||
    //             face.state === brfv4.BRFState.FACE_TRACKING) {

    //             if (captureFaceDetails) {
    //                 // testFaceArray.push({frame: feameId, faceDetails: face})

    //                 // LeftEyebrowMiddleData += `\t${feameId}\t${parseFloat(face.points[24].x).toFixed(3)}\t${parseFloat(face.points[24].y).toFixed(3)}\n`;
    //                 // LeftEyebrowInnerData += `\t${feameId}\t${parseFloat(face.points[22].x).toFixed(3)}\t${parseFloat(face.points[22].y).toFixed(3)}\n`;
    //                 // LeftEyebrowOuterData += `\t${feameId}\t${parseFloat(face.points[26].x).toFixed(3)}\t${parseFloat(face.points[26].y).toFixed(3)}\n`;
    //                 // LeftEyeInnerData += `\t${feameId}\t${parseFloat(face.points[42].x).toFixed(3)}\t${parseFloat(face.points[42].y).toFixed(3)}\n`;
    //                 // LeftEyeOuterData += `\t${feameId}\t${parseFloat(face.points[45].x).toFixed(3)}\t${parseFloat(face.points[45].y).toFixed(3)}\n`;
    //                 // RightEyebrowInnerData += `\t${feameId}\t${parseFloat(face.points[21].x).toFixed(3)}\t${parseFloat(face.points[21].y).toFixed(3)}\n`;
    //                 // RightEyebrowMiddleData += `\t${feameId}\t${parseFloat(face.points[19].x).toFixed(3)}\t${parseFloat(face.points[19].y).toFixed(3)}\n`;
    //                 // RightEyebrowOuterData += `\t${feameId}\t${parseFloat(face.points[17].x).toFixed(3)}\t${parseFloat(face.points[17].y).toFixed(3)}\n`;
    //                 // RightEyeInnerData += `\t${feameId}\t${parseFloat(face.points[39].x).toFixed(3)}\t${parseFloat(face.points[39].y).toFixed(3)}\n`;
    //                 // RightEyeOuterData += `\t${feameId}\t${parseFloat(face.points[36].x).toFixed(3)}\t${parseFloat(face.points[36].y).toFixed(3)}\n`;
    //                 // NoseBridgeData += `\t${feameId}\t${parseFloat(face.points[27].x).toFixed(3)}\t${parseFloat(face.points[27].y).toFixed(3)}\n`;
    //                 // NoseTipData += `\t${feameId}\t${parseFloat(face.points[30].x).toFixed(3)}\t${parseFloat(face.points[30].y).toFixed(3)}\n`;
    //                 // LeftNostrilData += `\t${feameId}\t${parseFloat(face.points[35].x).toFixed(3)}\t${parseFloat(face.points[35].y).toFixed(3)}\n`;
    //                 // RightNostrilData += `\t${feameId}\t${parseFloat(face.points[31].x).toFixed(3)}\t${parseFloat(face.points[31].y).toFixed(3)}\n`;
    //                 // MouthLeftData += `\t${feameId}\t${parseFloat(face.points[54].x).toFixed(3)}\t${parseFloat(face.points[54].y).toFixed(3)}\n`;
    //                 // MouthTopData += `\t${feameId}\t${parseFloat(face.points[51].x).toFixed(3)}\t${parseFloat(face.points[51].y).toFixed(3)}\n`;
    //                 // MouthRightData += `\t${feameId}\t${parseFloat(face.points[48].x).toFixed(3)}\t${parseFloat(face.points[48].y).toFixed(3)}\n`;
    //                 // MouthBottomData += `\t${feameId}\t${parseFloat(face.points[57].x).toFixed(3)}\t${parseFloat(face.points[57].y).toFixed(3)}\n`;
    //                 // LeftCheekTopData += `\t${feameId}\t${parseFloat(face.points[15].x).toFixed(3)}\t${parseFloat(face.points[15].y).toFixed(3)}\n`;
    //                 // LeftCheekMiddleData += `\t${feameId}\t${parseFloat(face.points[13].x).toFixed(3)}\t${parseFloat(face.points[13].y).toFixed(3)}\n`;
    //                 // RightCheekTopData += `\t${feameId}\t${parseFloat(face.points[1].x).toFixed(3)}\t${parseFloat(face.points[1].y).toFixed(3)}\n`;
    //                 // RightCheekMIddleData += `\t${feameId}\t${parseFloat(face.points[3].x).toFixed(3)}\t${parseFloat(face.points[3].y).toFixed(3)}\n`;
    //                 // ChinData += `\t${feameId}\t${parseFloat(face.points[8].x).toFixed(3)}\t${parseFloat(face.points[8].y).toFixed(3)}\n`;

    //                 // RightEyeUpper1Data += `\t${feameId}\t${parseFloat(face.points[37].x).toFixed(3)}\t${parseFloat(face.points[37].y).toFixed(3)}\n`;
    //                 // RightEyeUpper2Data += `\t${feameId}\t${parseFloat(face.points[38].x).toFixed(3)}\t${parseFloat(face.points[38].y).toFixed(3)}\n`;
    //                 // RightEyeLower1Data += `\t${feameId}\t${parseFloat(face.points[41].x).toFixed(3)}\t${parseFloat(face.points[41].y).toFixed(3)}\n`;
    //                 // RightEyeLower2Data += `\t${feameId}\t${parseFloat(face.points[40].x).toFixed(3)}\t${parseFloat(face.points[40].y).toFixed(3)}\n`;
    //                 // LeftEyeUpper1Data += `\t${feameId}\t${parseFloat(face.points[43].x).toFixed(3)}\t${parseFloat(face.points[43].y).toFixed(3)}\n`;
    //                 // LeftEyeUpper2Data += `\t${feameId}\t${parseFloat(face.points[44].x).toFixed(3)}\t${parseFloat(face.points[44].y).toFixed(3)}\n`;
    //                 // LeftEyeLower1Data += `\t${feameId}\t${parseFloat(face.points[47].x).toFixed(3)}\t${parseFloat(face.points[47].y).toFixed(3)}\n`;
    //                 // LeftEyeLower2Data += `\t${feameId}\t${parseFloat(face.points[46].x).toFixed(3)}\t${parseFloat(face.points[46].y).toFixed(3)}\n`;
    //                 // LeftEyebrow1Data += `\t${feameId}\t${parseFloat(face.points[23].x).toFixed(3)}\t${parseFloat(face.points[23].y).toFixed(3)}\n`;
    //                 // LeftEyebrow2Data += `\t${feameId}\t${parseFloat(face.points[25].x).toFixed(3)}\t${parseFloat(face.points[25].y).toFixed(3)}\n`;
    //                 // RightEyebrow1Data += `\t${feameId}\t${parseFloat(face.points[20].x).toFixed(3)}\t${parseFloat(face.points[20].y).toFixed(3)}\n`;
    //                 // RightEyebrow2Data += `\t${feameId}\t${parseFloat(face.points[18].x).toFixed(3)}\t${parseFloat(face.points[18].y).toFixed(3)}\n`;
    //                 // MidNostrilData += `\t${feameId}\t${parseFloat(face.points[33].x).toFixed(3)}\t${parseFloat(face.points[33].y).toFixed(3)}\n`;
    //                 // NostrilR1Data += `\t${feameId}\t${parseFloat(face.points[32].x).toFixed(3)}\t${parseFloat(face.points[32].y).toFixed(3)}\n`;
    //                 // NostrilL1Data += `\t${feameId}\t${parseFloat(face.points[34].x).toFixed(3)}\t${parseFloat(face.points[34].y).toFixed(3)}\n`;
    //                 // MouthRightMidDataTop += `\t${feameId}\t${parseFloat(face.points[49].x).toFixed(3)}\t${parseFloat(face.points[49].y).toFixed(3)}\n`;
    //                 // MouthRightTopData += `\t${feameId}\t${parseFloat(face.points[50].x).toFixed(3)}\t${parseFloat(face.points[50].y).toFixed(3)}\n`;
    //                 // MouthLeftMidDataTop += `\t${feameId}\t${parseFloat(face.points[53].x).toFixed(3)}\t${parseFloat(face.points[53].y).toFixed(3)}\n`;
    //                 // MouthLeftTopData += `\t${feameId}\t${parseFloat(face.points[52].x).toFixed(3)}\t${parseFloat(face.points[52].y).toFixed(3)}\n`;
    //                 // MouthRightMidDataBottom += `\t${feameId}\t${parseFloat(face.points[59].x).toFixed(3)}\t${parseFloat(face.points[59].y).toFixed(3)}\n`;
    //                 // MouthRightBottomData += `\t${feameId}\t${parseFloat(face.points[58].x).toFixed(3)}\t${parseFloat(face.points[58].y).toFixed(3)}\n`;
    //                 // MouthLeftMidDataBottom += `\t${feameId}\t${parseFloat(face.points[55].x).toFixed(3)}\t${parseFloat(face.points[55].y).toFixed(3)}\n`;
    //                 // MouthLeftBottomData += `\t${feameId}\t${parseFloat(face.points[56].x).toFixed(3)}\t${parseFloat(face.points[56].y).toFixed(3)}\n`;
    //                 // MouthTopInner1Data += `\t${feameId}\t${parseFloat(face.points[62].x).toFixed(3)}\t${parseFloat(face.points[62].y).toFixed(3)}\n`;
    //                 // MouthTopInner2Data += `\t${feameId}\t${parseFloat(face.points[66].x).toFixed(3)}\t${parseFloat(face.points[66].y).toFixed(3)}\n`;
    //                 // JawLeftData += `\t${feameId}\t${parseFloat(face.points[10].x).toFixed(3)}\t${parseFloat(face.points[10].y).toFixed(3)}\n`;
    //                 // JawRightData += `\t${feameId}\t${parseFloat(face.points[6].x).toFixed(3)}\t${parseFloat(face.points[6].y).toFixed(3)}\n`;
    //                 // let xData = parseFloat(face.rotationX).toFixed(3) >= 0 ? ` ${parseFloat(face.rotationX).toFixed(3)}` : parseFloat(face.rotationX).toFixed(3);
    //                 // let yData = parseFloat(face.rotationY).toFixed(3) >= 0 ? ` ${parseFloat(face.rotationY).toFixed(3)}` : parseFloat(face.rotationY).toFixed(3);
    //                 // let zData = parseFloat(face.rotationZ).toFixed(3) >= 0 ? ` ${parseFloat(face.rotationZ).toFixed(3)}` : parseFloat(face.rotationZ).toFixed(3);
    //                 // ScaleData += `\t${feameId}\t${parseFloat(face.scale).toFixed(3)}\n`;
    //                 // MaskPositionData += `\t${feameId}\t${parseFloat(face.translationX).toFixed(3)}\t${parseFloat(face.translationY).toFixed(3)}\n`
    //                 // RotationData += `\t${feameId}\t${xData}\t${yData}\t${zData}\n`

    //                 this.facePoints.filter(facePoint => (
    //                     facePoint.key.push({
    //                     frame: feameId,
    //                     x_pixel: parseFloat(face.points[facePoint.val].x).toFixed(3),
    //                     y_pixel: parseFloat(face.points[facePoint.val].y).toFixed(3),
    //                 })));


    //                 this.RotationData.push({
    //                   frame: feameId,
    //                   xData:  parseFloat(face.rotationX).toFixed(3) >= 0 ? ` ${parseFloat(face.rotationX).toFixed(3)}` : parseFloat(face.rotationX).toFixed(3),
    //                   yData:  parseFloat(face.rotationY).toFixed(3) >= 0 ? ` ${parseFloat(face.rotationY).toFixed(3)}` : parseFloat(face.rotationY).toFixed(3),
    //                   zData:  parseFloat(face.rotationZ).toFixed(3) >= 0 ? ` ${parseFloat(face.rotationZ).toFixed(3)}` : parseFloat(face.rotationZ).toFixed(3)
    //                 })

    //                 this.ScaleData.push({
    //                     frame: feameId,
    //                     x_scale: parseFloat(face.scale).toFixed(3),
    //                 })

    //                 this.MaskPositionData.push({
    //                     frame: feameId,
    //                     x_pixel: parseFloat(face.translationX).toFixed(3),
    //                     y_pixel: parseFloat(face.translationY).toFixed(3)
    //                 })



    //                 // let xData = parseFloat(face.rotationX).toFixed(3) >= 0 ? ` ${parseFloat(face.rotationX).toFixed(3)}` : parseFloat(face.rotationX).toFixed(3);
    //                 // let yData = parseFloat(face.rotationY).toFixed(3) >= 0 ? ` ${parseFloat(face.rotationY).toFixed(3)}` : parseFloat(face.rotationY).toFixed(3);
    //                 // let zData = parseFloat(face.rotationZ).toFixed(3) >= 0 ? ` ${parseFloat(face.rotationZ).toFixed(3)}` : parseFloat(face.rotationZ).toFixed(3);
    //                 // ScaleData += `\t${feameId}\t${parseFloat(face.scale).toFixed(3)}\n`;
    //                 // MaskPositionData += `\t${feameId}\t${parseFloat(face.translationX).toFixed(3)}\t${parseFloat(face.translationY).toFixed(3)}\n`
    //                 // RotationData += `\t${feameId}\t${xData}\t${yData}\t${zData}\n`







    //             }
    //             if (!_config__yawn) {
    //                 drawCircles(_ctx, face.points, "#00a0ff", 2);
    //             } else {
    //                 // Yawn Detection - Or: How wide open is the mouth?
    //                 function calcDistance(x0, y0, x1, y1) {
    //                     return Math.sqrt((x1 - x0) * (x1 - x0) + (y1 - y0) * (y1 - y0));
    //                 }

    //                 var eyeDist = calcDistance(face.points[42].x, face.points[42].y, face.points[39].x, face.points[39].y);
    //                 var mouthOpen = calcDistance(face.points[62].x, face.points[62].y, face.points[66].x, face.points[66].y);
    //                 var yawnFactor = mouthOpen / eyeDist;

    //                 yawnFactor -= 0.35; // remove smiling

    //                 if (yawnFactor < 0) yawnFactor = 0;

    //                 yawnFactor *= 2.0; // scale up a bit

    //                 if (yawnFactor < 0.0) { yawnFactor = 0.0; }
    //                 if (yawnFactor > 1.0) { yawnFactor = 1.0; }

    //                 // Let the color show you how much you yawn.

    //                 var color =
    //                     (((0xff * (1.0 - yawnFactor) & 0xff) << 16)) +
    //                     (((0xff * yawnFactor) & 0xff) << 8);

    //                 // Face Tracking results: 68 facial feature points.

    //                 drawCircles(_ctx, face.points, '#' + color.toString(16), 2);
    //             }

    //         } else {
    //             // _brfManager.reset();
    //         }
    //     }

    //     var points = _brfManager.getOpticalFlowPoints();
    //     // console.log('points: ', points);
    //     var states = _brfManager.getOpticalFlowPointStates();
    //     // console.log('states: ', states);
    //     let prevX = '';
    //     let prevY = '';

    //     if (captureFaceDetails && points.length != 0) {

    //         var additionalPoints = [];
    //         points.map((point) => {
    //             if (point.x != prevX && point.y != prevY) {
    //                 prevX = point.x;
    //                 prevY = point.y;
    //                 return additionalPoints.push({
    //                     x: parseFloat(point.x).toFixed(3),
    //                     y: parseFloat(point.y).toFixed(3)
    //                 });
    //             }
    //         });

    //         pointsPerFrame.push({
    //             frameId: feameId,
    //             points: additionalPoints
    //         })
    //         // console.log('pointsPerFrame: ', pointsPerFrame);
    //         // // console.log('additionalPoints: ', additionalPoints);
    //     }

    //     if (captureFaceDetails && points.length === 0) {
    //         pointsPerFrame = [];
    //     }


    //     // Draw points by state: green valid, red invalid

    //     for (i = 0; i < points.length; i++) {

    //         if (states[i]) { // green: valid
    //             drawCircle(_ctx, points[i].x, points[i].y, "#00ff00", 2);
    //         } else { // red: invalid: tracking point lost in last frame
    //             drawCircle(_ctx, points[i].x, points[i].y, "#ff0000", 2); //revert here TODO
    //             // drawCircle(_ctx, points[i].x, points[i].y, "#00c4ff", 2);
    //         }
    //     }
    // }



    /*document.getElementById("downloadVideo").addEventListener("click", function () {
        const blob = new Blob(recordedBlobs, { type: 'video/webm' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'test.webm';
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 100);
    });*/
    // ###### BRF end ######
}

function trackFaces(currentTime) {
    // console.log("Track faces called");
    // console.log(videoElement.videoWidth);
    // console.log(videoElement.videoHeight);
    if (_pointsToAdd.length > 0) {
        // Add all clicked points right before a tracking update occurs,
        // otherwise the tracking would get mixed up.
        // console.log("in points to add");
        // _pointsToAdd.forEach(element => {
        //     // console.log('element: ', element);
        // });
        _brfManager.addOpticalFlowPoints(_pointsToAdd);
        // _pointsToAdd.length = 0;
        _pointsToAdd = [];
    }

    if (!_config__use_webcam) {
        _ctx.drawImage(videoRV, 0, 0, _resolution.width, _resolution.height);
    } else {
        // console.log("Just before Drawing Points");
        // _ctx.setTransform(-1.0, 0, 0, 1, _resolution.width, 0);
        _ctx.drawImage(_video, 0, 0, _resolution.width, _resolution.height);
        // _ctx.setTransform(1.0, 0, 0, 1, 0, 0);
    }

    _brfManager.update(_ctx.getImageData(0, 0, _resolution.width, _resolution.height).data);

    drawRects(_ctx, _brfManager.getAllDetectedFaces(), "#00a0ff", 1.0);
    drawRects(_ctx, _brfManager.getMergedDetectedFaces(), "#ffd200", 3.0);
    // _brfManager.rotationX()
    // console.log('_brfManager.rotationX(): ', _brfManager.rotationX());
    var faces = _brfManager.getFaces();
    var i;

    //below cod eis for incrementing the frame count
    if (captureFaceDetails) {
        feameId = getCurrentVideoFrame(frameRate, currentTime);
        // debugger
        // console.log('feameId: ', feameId);
    }


    for (i = 0; i < faces.length; i++) {

        var face = faces[i];

        if (face.state === _brfv4.BRFState.FACE_TRACKING_START ||
            face.state === _brfv4.BRFState.FACE_TRACKING) {

            if (captureFaceDetails) {
                // testFaceArray.push({frame: feameId, faceDetails: face})

                // LeftEyebrowMiddleData += `\t${feameId}\t${parseFloat(face.points[24].x).toFixed(3)}\t${parseFloat(face.points[24].y).toFixed(3)}\n`;
                // LeftEyebrowInnerData += `\t${feameId}\t${parseFloat(face.points[22].x).toFixed(3)}\t${parseFloat(face.points[22].y).toFixed(3)}\n`;
                // LeftEyebrowOuterData += `\t${feameId}\t${parseFloat(face.points[26].x).toFixed(3)}\t${parseFloat(face.points[26].y).toFixed(3)}\n`;
                // LeftEyeInnerData += `\t${feameId}\t${parseFloat(face.points[42].x).toFixed(3)}\t${parseFloat(face.points[42].y).toFixed(3)}\n`;
                // LeftEyeOuterData += `\t${feameId}\t${parseFloat(face.points[45].x).toFixed(3)}\t${parseFloat(face.points[45].y).toFixed(3)}\n`;
                // RightEyebrowInnerData += `\t${feameId}\t${parseFloat(face.points[21].x).toFixed(3)}\t${parseFloat(face.points[21].y).toFixed(3)}\n`;
                // RightEyebrowMiddleData += `\t${feameId}\t${parseFloat(face.points[19].x).toFixed(3)}\t${parseFloat(face.points[19].y).toFixed(3)}\n`;
                // RightEyebrowOuterData += `\t${feameId}\t${parseFloat(face.points[17].x).toFixed(3)}\t${parseFloat(face.points[17].y).toFixed(3)}\n`;
                // RightEyeInnerData += `\t${feameId}\t${parseFloat(face.points[39].x).toFixed(3)}\t${parseFloat(face.points[39].y).toFixed(3)}\n`;
                // RightEyeOuterData += `\t${feameId}\t${parseFloat(face.points[36].x).toFixed(3)}\t${parseFloat(face.points[36].y).toFixed(3)}\n`;
                // NoseBridgeData += `\t${feameId}\t${parseFloat(face.points[27].x).toFixed(3)}\t${parseFloat(face.points[27].y).toFixed(3)}\n`;
                // NoseTipData += `\t${feameId}\t${parseFloat(face.points[30].x).toFixed(3)}\t${parseFloat(face.points[30].y).toFixed(3)}\n`;
                // LeftNostrilData += `\t${feameId}\t${parseFloat(face.points[35].x).toFixed(3)}\t${parseFloat(face.points[35].y).toFixed(3)}\n`;
                // RightNostrilData += `\t${feameId}\t${parseFloat(face.points[31].x).toFixed(3)}\t${parseFloat(face.points[31].y).toFixed(3)}\n`;
                // MouthLeftData += `\t${feameId}\t${parseFloat(face.points[54].x).toFixed(3)}\t${parseFloat(face.points[54].y).toFixed(3)}\n`;
                // MouthTopData += `\t${feameId}\t${parseFloat(face.points[51].x).toFixed(3)}\t${parseFloat(face.points[51].y).toFixed(3)}\n`;
                // MouthRightData += `\t${feameId}\t${parseFloat(face.points[48].x).toFixed(3)}\t${parseFloat(face.points[48].y).toFixed(3)}\n`;
                // MouthBottomData += `\t${feameId}\t${parseFloat(face.points[57].x).toFixed(3)}\t${parseFloat(face.points[57].y).toFixed(3)}\n`;
                // LeftCheekTopData += `\t${feameId}\t${parseFloat(face.points[15].x).toFixed(3)}\t${parseFloat(face.points[15].y).toFixed(3)}\n`;
                // LeftCheekMiddleData += `\t${feameId}\t${parseFloat(face.points[13].x).toFixed(3)}\t${parseFloat(face.points[13].y).toFixed(3)}\n`;
                // RightCheekTopData += `\t${feameId}\t${parseFloat(face.points[1].x).toFixed(3)}\t${parseFloat(face.points[1].y).toFixed(3)}\n`;
                // RightCheekMIddleData += `\t${feameId}\t${parseFloat(face.points[3].x).toFixed(3)}\t${parseFloat(face.points[3].y).toFixed(3)}\n`;
                // ChinData += `\t${feameId}\t${parseFloat(face.points[8].x).toFixed(3)}\t${parseFloat(face.points[8].y).toFixed(3)}\n`;

                // RightEyeUpper1Data += `\t${feameId}\t${parseFloat(face.points[37].x).toFixed(3)}\t${parseFloat(face.points[37].y).toFixed(3)}\n`;
                // RightEyeUpper2Data += `\t${feameId}\t${parseFloat(face.points[38].x).toFixed(3)}\t${parseFloat(face.points[38].y).toFixed(3)}\n`;
                // RightEyeLower1Data += `\t${feameId}\t${parseFloat(face.points[41].x).toFixed(3)}\t${parseFloat(face.points[41].y).toFixed(3)}\n`;
                // RightEyeLower2Data += `\t${feameId}\t${parseFloat(face.points[40].x).toFixed(3)}\t${parseFloat(face.points[40].y).toFixed(3)}\n`;
                // LeftEyeUpper1Data += `\t${feameId}\t${parseFloat(face.points[43].x).toFixed(3)}\t${parseFloat(face.points[43].y).toFixed(3)}\n`;
                // LeftEyeUpper2Data += `\t${feameId}\t${parseFloat(face.points[44].x).toFixed(3)}\t${parseFloat(face.points[44].y).toFixed(3)}\n`;
                // LeftEyeLower1Data += `\t${feameId}\t${parseFloat(face.points[47].x).toFixed(3)}\t${parseFloat(face.points[47].y).toFixed(3)}\n`;
                // LeftEyeLower2Data += `\t${feameId}\t${parseFloat(face.points[46].x).toFixed(3)}\t${parseFloat(face.points[46].y).toFixed(3)}\n`;
                // LeftEyebrow1Data += `\t${feameId}\t${parseFloat(face.points[23].x).toFixed(3)}\t${parseFloat(face.points[23].y).toFixed(3)}\n`;
                // LeftEyebrow2Data += `\t${feameId}\t${parseFloat(face.points[25].x).toFixed(3)}\t${parseFloat(face.points[25].y).toFixed(3)}\n`;
                // RightEyebrow1Data += `\t${feameId}\t${parseFloat(face.points[20].x).toFixed(3)}\t${parseFloat(face.points[20].y).toFixed(3)}\n`;
                // RightEyebrow2Data += `\t${feameId}\t${parseFloat(face.points[18].x).toFixed(3)}\t${parseFloat(face.points[18].y).toFixed(3)}\n`;
                // MidNostrilData += `\t${feameId}\t${parseFloat(face.points[33].x).toFixed(3)}\t${parseFloat(face.points[33].y).toFixed(3)}\n`;
                // NostrilR1Data += `\t${feameId}\t${parseFloat(face.points[32].x).toFixed(3)}\t${parseFloat(face.points[32].y).toFixed(3)}\n`;
                // NostrilL1Data += `\t${feameId}\t${parseFloat(face.points[34].x).toFixed(3)}\t${parseFloat(face.points[34].y).toFixed(3)}\n`;
                // MouthRightMidDataTop += `\t${feameId}\t${parseFloat(face.points[49].x).toFixed(3)}\t${parseFloat(face.points[49].y).toFixed(3)}\n`;
                // MouthRightTopData += `\t${feameId}\t${parseFloat(face.points[50].x).toFixed(3)}\t${parseFloat(face.points[50].y).toFixed(3)}\n`;
                // MouthLeftMidDataTop += `\t${feameId}\t${parseFloat(face.points[53].x).toFixed(3)}\t${parseFloat(face.points[53].y).toFixed(3)}\n`;
                // MouthLeftTopData += `\t${feameId}\t${parseFloat(face.points[52].x).toFixed(3)}\t${parseFloat(face.points[52].y).toFixed(3)}\n`;
                // MouthRightMidDataBottom += `\t${feameId}\t${parseFloat(face.points[59].x).toFixed(3)}\t${parseFloat(face.points[59].y).toFixed(3)}\n`;
                // MouthRightBottomData += `\t${feameId}\t${parseFloat(face.points[58].x).toFixed(3)}\t${parseFloat(face.points[58].y).toFixed(3)}\n`;
                // MouthLeftMidDataBottom += `\t${feameId}\t${parseFloat(face.points[55].x).toFixed(3)}\t${parseFloat(face.points[55].y).toFixed(3)}\n`;
                // MouthLeftBottomData += `\t${feameId}\t${parseFloat(face.points[56].x).toFixed(3)}\t${parseFloat(face.points[56].y).toFixed(3)}\n`;
                // MouthTopInner1Data += `\t${feameId}\t${parseFloat(face.points[62].x).toFixed(3)}\t${parseFloat(face.points[62].y).toFixed(3)}\n`;
                // MouthTopInner2Data += `\t${feameId}\t${parseFloat(face.points[66].x).toFixed(3)}\t${parseFloat(face.points[66].y).toFixed(3)}\n`;
                // JawLeftData += `\t${feameId}\t${parseFloat(face.points[10].x).toFixed(3)}\t${parseFloat(face.points[10].y).toFixed(3)}\n`;
                // JawRightData += `\t${feameId}\t${parseFloat(face.points[6].x).toFixed(3)}\t${parseFloat(face.points[6].y).toFixed(3)}\n`;
                // let xData = parseFloat(face.rotationX).toFixed(3) >= 0 ? ` ${parseFloat(face.rotationX).toFixed(3)}` : parseFloat(face.rotationX).toFixed(3);
                // let yData = parseFloat(face.rotationY).toFixed(3) >= 0 ? ` ${parseFloat(face.rotationY).toFixed(3)}` : parseFloat(face.rotationY).toFixed(3);
                // let zData = parseFloat(face.rotationZ).toFixed(3) >= 0 ? ` ${parseFloat(face.rotationZ).toFixed(3)}` : parseFloat(face.rotationZ).toFixed(3);
                // ScaleData += `\t${feameId}\t${parseFloat(face.scale).toFixed(3)}\n`;
                // MaskPositionData += `\t${feameId}\t${parseFloat(face.translationX).toFixed(3)}\t${parseFloat(face.translationY).toFixed(3)}\n`
                // RotationData += `\t${feameId}\t${xData}\t${yData}\t${zData}\n`

                this.facePoints.filter(facePoint => (
                    facePoint.key.push({
                    frame: feameId,
                    x_pixel: parseFloat(face.points[facePoint.val].x).toFixed(3),
                    y_pixel: parseFloat(face.points[facePoint.val].y).toFixed(3),
                })));


                this.RotationData.push({
                  frame: feameId,
                  xData:  parseFloat(face.rotationX).toFixed(3) >= 0 ? ` ${parseFloat(face.rotationX).toFixed(3)}` : parseFloat(face.rotationX).toFixed(3),
                  yData:  parseFloat(face.rotationY).toFixed(3) >= 0 ? ` ${parseFloat(face.rotationY).toFixed(3)}` : parseFloat(face.rotationY).toFixed(3),
                  zData:  parseFloat(face.rotationZ).toFixed(3) >= 0 ? ` ${parseFloat(face.rotationZ).toFixed(3)}` : parseFloat(face.rotationZ).toFixed(3)
                })

                this.ScaleData.push({
                    frame: feameId,
                    x_scale: parseFloat(face.scale).toFixed(3),
                })

                this.MaskPositionData.push({
                    frame: feameId,
                    x_pixel: parseFloat(face.translationX).toFixed(3),
                    y_pixel: parseFloat(face.translationY).toFixed(3)
                })



                // let xData = parseFloat(face.rotationX).toFixed(3) >= 0 ? ` ${parseFloat(face.rotationX).toFixed(3)}` : parseFloat(face.rotationX).toFixed(3);
                // let yData = parseFloat(face.rotationY).toFixed(3) >= 0 ? ` ${parseFloat(face.rotationY).toFixed(3)}` : parseFloat(face.rotationY).toFixed(3);
                // let zData = parseFloat(face.rotationZ).toFixed(3) >= 0 ? ` ${parseFloat(face.rotationZ).toFixed(3)}` : parseFloat(face.rotationZ).toFixed(3);
                // ScaleData += `\t${feameId}\t${parseFloat(face.scale).toFixed(3)}\n`;
                // MaskPositionData += `\t${feameId}\t${parseFloat(face.translationX).toFixed(3)}\t${parseFloat(face.translationY).toFixed(3)}\n`
                // RotationData += `\t${feameId}\t${xData}\t${yData}\t${zData}\n`







            }
            if (!_config__yawn) {
                drawCircles(_ctx, face.points, "#00a0ff", 2);
            } else {
                // Yawn Detection - Or: How wide open is the mouth?
                function calcDistance(x0, y0, x1, y1) {
                    return Math.sqrt((x1 - x0) * (x1 - x0) + (y1 - y0) * (y1 - y0));
                }

                var eyeDist = calcDistance(face.points[42].x, face.points[42].y, face.points[39].x, face.points[39].y);
                var mouthOpen = calcDistance(face.points[62].x, face.points[62].y, face.points[66].x, face.points[66].y);
                var yawnFactor = mouthOpen / eyeDist;

                yawnFactor -= 0.35; // remove smiling

                if (yawnFactor < 0) yawnFactor = 0;

                yawnFactor *= 2.0; // scale up a bit

                if (yawnFactor < 0.0) { yawnFactor = 0.0; }
                if (yawnFactor > 1.0) { yawnFactor = 1.0; }

                // Let the color show you how much you yawn.

                var color =
                    (((0xff * (1.0 - yawnFactor) & 0xff) << 16)) +
                    (((0xff * yawnFactor) & 0xff) << 8);

                // Face Tracking results: 68 facial feature points.

                drawCircles(_ctx, face.points, '#' + color.toString(16), 2);
            }

        } else {
            // _brfManager.reset();
        }
    }

    var points = _brfManager.getOpticalFlowPoints();
    // console.log('points: ', points);
    var states = _brfManager.getOpticalFlowPointStates();
    // console.log('states: ', states);
    let prevX = '';
    let prevY = '';

    if (captureFaceDetails && points.length != 0) {

        var additionalPoints = [];
        points.map((point) => {
            if (point.x != prevX && point.y != prevY) {
                prevX = point.x;
                prevY = point.y;
                return additionalPoints.push({
                    x: parseFloat(point.x).toFixed(3),
                    y: parseFloat(point.y).toFixed(3)
                });
            }
        });

        pointsPerFrame.push({
            frameId: feameId,
            points: additionalPoints
        })
        // console.log('pointsPerFrame: ', pointsPerFrame);
        // // console.log('additionalPoints: ', additionalPoints);
    }

    if (captureFaceDetails && points.length === 0) {
        pointsPerFrame = [];
    }


    // Draw points by state: green valid, red invalid

    for (i = 0; i < points.length; i++) {

        if (states[i]) { // green: valid
            drawCircle(_ctx, points[i].x, points[i].y, "#00ff00", 2);
        } else { // red: invalid: tracking point lost in last frame
            drawCircle(_ctx, points[i].x, points[i].y, "#ff0000", 2); //revert here TODO
            // drawCircle(_ctx, points[i].x, points[i].y, "#00c4ff", 2);
        }
    }
}

window.onload = onHTMLLoadedCompletely;
function startWebcam() {
    // if (!navigator.mediaDevices.getUserMedia) {
    //     alert('navigator.mediaDevices.getUserMedia not supported on your browser, use the latest version of Firefox or Chrome');
    // } else {
    //     if (window.MediaRecorder == undefined) {
    //         alert('MediaRecorder not supported on your browser, use the latest version of Firefox or Chrome');
    //     } else {
    //         console.log("before stream");
    //         // setTimeout(() => {
    //         window.navigator.mediaDevices.getUserMedia(constraints)
    //             .then(function (stream) {
    //                 localStream = stream;

    //                 localStream.getTracks().forEach(function (track) {
    //                     if (track.kind == "audio") {
    //                         track.onended = function (event) {
    //                             // console.log("audio track.onended Audio track.readyState=" + track.readyState + ", track.muted=" + track.muted);
    //                         }
    //                     }
    //                     if (track.kind == "video") {
    //                         track.onended = function (event) {
    //                             // console.log("video track.onended Audio track.readyState=" + track.readyState + ", track.muted=" + track.muted);
    //                         }
    //                     }
    //                 });

    //                 // onHTMLLoadedCompletely().onVideoSizeKnown();
    //                 videoElement.srcObject = localStream;
    //                 videoElement.play();


    //                 // try {
    //                 //     window.AudioContext = window.AudioContext || window.webkitAudioContext;
    //                 //     window.audioContext = new AudioContext();
    //                 // } catch (e) {
    //                 //     log('Web Audio API not supported.');
    //                 // }

    //                 // soundMeter = window.soundMeter = new SoundMeter(window.audioContext);
    //                 // soundMeter.connectToSource(localStream, function (e) {
    //                 //     if (e) {
    //                 //         log(e);
    //                 //         return;
    //                 //     } else {
    //                 //         /*setInterval(function() {
    //                 //            log(Math.round(soundMeter.instant.toFixed(2) * 100));
    //                 //        }, 100);*/
    //                 //     }
    //                 // });

    //             }).catch(function (err) {
    //                 /* handle the error */
    //                 console.log('navigator.getUserMedia error: ' + err);
    //             });

    //     }
    // }
}

function getAdditionalPoint() {
    if (pointsPerFrame.length != 0) {
        let maxLength = pointsPerFrame[pointsPerFrame.length - 1].points.length;
        // console.log('pointsPerFrame.length: ', pointsPerFrame.length);
        // console.log('maxLength: ', maxLength);
        let headers = [];
        for (let i = 0; i < maxLength; i++) {
            headers.push(`Effects Face Track Points #1 Additional Point${i + 1}\n\tFrame\tX pixels\tY pixels\n`);
        }

        let deb = [];

        for (let outerIndex = 0; outerIndex < pointsPerFrame.length; outerIndex++) {
            const data = pointsPerFrame[outerIndex];

            for (let index = 0; index < data.points.length; index++) {
                const element = {
                    ...data.points[index]
                }
                let a = `${headers[index]} \t${data.frameId}\t${element.x}\t${element.y}\n`;
                // console.log('element: ', a, element.x, element.y);
                headers[index] = a;
            }
        }

        // pointsPerFrame.forEach((data, outerIndex) => {
        //     console.log('data.points: ', data.points);
        //     data.points.forEach((element, index) => {
        //         deb.push(element);
        //     });
        // });

        console.log('headers : ', headers);
        return headers.join("");
    } else {
        return '';
    }

}
// startWebcam();
// });
function onBtnRecordClicked() {

    track = true;
    if (track == true) {
        let vid = document.getElementById("videoRV");
        //get framerate
        if (this.duration != 0 && totalFrame != 0) {
           this.frameRate = (totalFrame / this.duration).toFixed(2);
        }
        if (this.frameRate != 0) {
            if (localStream == null) {
                alert('Could not get local stream from mic/camera');
            } else {
        
                if (_config__use_webcam) {
                    // document.getElementById("orignalWebCam").style.display = "none";
                    // document.getElementById("trackedWebCam").style.display = "block";
                    recBtn.disabled = true;
                    // pauseResBtn.disabled = false;
                    stopBtn.disabled = false;
                    recBtn.style.display = "none";
                    stopBtn.style.display = "block";
                } else {
                   document.getElementById("videoRV").play();
                    recBtnRV.disabled = true;
                    // pauseResBtn.disabled = false;
                    stopBtnRV.disabled = false;
                    recBtnRV.style.display = "none";
                    // document.getElementById("Analyze").style.display = "none";
        
                    stopBtnRV.style.display = "block";
                }
        
                /* use the stream */
                // console.log('Start recording...');
                startTracking();
                
                if (typeof MediaRecorder.isTypeSupported == 'function') {
                    /*
                        MediaRecorder.isTypeSupported is a function announced in https://developers.google.com/web/updates/2016/01/mediarecorder and later introduced in the MediaRecorder API spec http://www.w3.org/TR/mediastream-recording/
                    */
                    if (MediaRecorder.isTypeSupported('video/webm;codecs=vp9')) {
                        var options = { mimeType: 'video/webm;codecs=vp9' };
                    } else if (MediaRecorder.isTypeSupported('video/webm;codecs=h264')) {
                        var options = { mimeType: 'video/webm;codecs=h264' };
                    } else if (MediaRecorder.isTypeSupported('video/webm;codecs=vp8')) {
                        var options = { mimeType: 'video/webm;' };
                    }
                    console.log('Using ' + options.mimeType);
                    // console.log('localStream: ', localStream);
                    delete mediaRecorder;
                    mediaRecorder = new MediaRecorder(localStream, options);
                } else {
                    console.log('isTypeSupported is not supported, using default codecs for browser');
                    delete mediaRecorder;
        
                    mediaRecorder = new MediaRecorder(localStream);
                }
        
                mediaRecorder.ondataavailable = function (e) {
                    // console.log('e: ', e);
                    //log('mediaRecorder.ondataavailable, e.data.size='+e.data.size);
                    chunks.push(e.data);
                    // if (e.data.size === 0) {
                    //     // mediaRecorder.stop();
                    //     console.log("It Should've stopped!");
                    // } else {
                    //     // console.log('e.data: ', e.data);
                    //     // console.log("Data recieved");
                    // }
                };
        
                mediaRecorder.onerror = function (e) {
                    console.log('mediaRecorder.onerror: ' + e);
                };
        
                mediaRecorder.onstart = function () {
                    // console.log('mediaRecorder.onstart, mediaRecorder.state = ' + mediaRecorder.state);
        
                    localStream.getTracks().forEach(function (track) {
                        if (track.kind == "audio") {
                            // console.log("onstart - Audio track.readyState=" + track.readyState + ", track.muted=" + track.muted);
                        }
                        if (track.kind == "video") {
                            // console.log("onstart - Video track.readyState=" + track.readyState + ", track.muted=" + track.muted);
                        }
                    });
        
                };
        
        
                mediaRecorder.onstop = function () {
                    // console.log("MR STOPPED________________________>>>>>>>>>");
                    // console.log('mediaRecorder.onstop, mediaRecorder.state = ' + mediaRecorder.state);
        
                    // console.log('Before Creating the blob chunks: ', chunks);
        
                };
        
                mediaRecorder.onpause = function () {
                    // console.log('mediaRecorder.onpause, mediaRecorder.state = ' + mediaRecorder.state);
                }
        
                mediaRecorder.onresume = function () {
                    // console.log('mediaRecorder.onresume, mediaRecorder.state = ' + mediaRecorder.state);
                }
        
                mediaRecorder.onwarning = function (e) {
                    console.log('mediaRecorder.onwarning: ' + e);
                };
        
                // pauseResBtn.textContent = "Pause";
        
                mediaRecorder.start(10);
        
        
                localStream.getTracks().forEach(function (track) {
                    console.log(track.kind + ":" + JSON.stringify(track.getSettings()));
                    console.log(track.getSettings());
                })
            }
        }
    }

/////////////////////////////////////////////////////////////////////////////////////////
    
////////////////////////////////////////////////////////////////////////////////////////
}

function onBtnAnalyzeClicked() {
    analyze = true;
    // stopBtnRV.disabled = false;
    document.getElementById("videoRV").play();
    // recBtnRV.style.display = "none";
    // stopBtnRV.style.display = "block";
    document.getElementById("Analyze").style.display = "none";
    document.getElementById("Analytic_stop").style.display = "block";
    captureFaceDetails = true;
}

function onBtnStopClicked() {
    // getAdditionalPoint();
    // mediaRecorder.state = "inactive"
    /** *******************************  Code to create video file start ************************************* **/
    track = false;
    // console.log('Before Creating the blob chunks: ', chunks);
    if (!analyze) {
        mediaRecorder.stop();
        var blob = new Blob(chunks, { type: "video/webm;codecs=vp9;" });
        console.log('blob: ', blob);
        chunks = [];
        console.log('After chunks: ', chunks);

        var videoURL = window.URL.createObjectURL(blob);
        console.log('videoURL: ', videoURL);
        if (_config__use_webcam) {
            downloadLink.href = videoURL;
            // videoElement.src = videoURL;
            downloadLink.innerHTML = 'Download video file';

            var rand = Math.floor((Math.random() * 10000000));
            // var name = "video_" + rand + ".webm";
            var name = sessionName + ".webm";

            downloadLink.setAttribute("download", name);
            downloadLink.setAttribute("name", name);
        } else {
            downloadLinkRV.href = videoURL;
            // videoElement.src = videoURL;
            downloadLinkRV.innerHTML = 'Download video file';

            var rand = Math.floor((Math.random() * 10000000));
            // var name = "video_" + rand + ".webm";
            var name = sessionName + ".webm";

            downloadLinkRV.setAttribute("download", name);
            downloadLinkRV.setAttribute("name", name);
        }
    }
    /** *******************************  Code to create video file ends ************************************* **/

    // console.log("STOP: After stopping media recorder!");
    stopTracking();
    feameId = 0;
    initializeText()
    if (_config__use_webcam) {

        // document.getElementById("orignalWebCam").style.display = "block";
        // document.getElementById("trackedWebCam").style.display = "none";
        recBtn.disabled = false;
        // pauseResBtn.disabled = false;
        stopBtn.disabled = true;
        videoElement.controls = true;
        recBtn.style.display = "block";
        stopBtn.style.display = "none";
        setTimeout(() => {
            document.getElementById('a').click();
            document.getElementById('downloadLink').click();
        }, 1000);
    } else {
        // console.log("In else");
        recBtnRV.disabled = false;
        // pauseResBtn.disabled = false;
        stopBtnRV.disabled = true;
        recBtnRV.style.display = "block";
        document.getElementById("Analyze").style.display = "block";
        stopBtnRV.style.display = "none";
        if (analyze) {
            analyze = false;
        }
        setTimeout(() => {
            document.getElementById('aRV').click();
            document.getElementById('downloadLinkRV').click();
            location.reload();                                                              //:TODO uncomment this
        }, 1000);
    }
}



function onBtnStopClickedA() {
    // getAdditionalPoint();
    // mediaRecorder.state = "inactive"

    // console.log("STOP: After stopping media recorder!");
    stopTracking();
    feameId = 0;
    initializeText()
    if (_config__use_webcam) {

        // document.getElementById("orignalWebCam").style.display = "block";
        // document.getElementById("trackedWebCam").style.display = "none";
        // recBtn.disabled = false;
        // pauseResBtn.disabled = false;
        // stopBtn.disabled = true;
        videoElement.controls = true;
        // recBtn.style.display = "block";
        // document.getElementById('Analyze').style.display = "block";
        // document.getElementById('stopRVA').style.display = "none";

        setTimeout(() => {
            document.getElementById('a').click();
            document.getElementById('downloadLink').click();
        }, 1000);
    } else {
        // console.log("In else");
        // recBtnRV.disabled = false;
        // pauseResBtn.disabled = false;
        // stopBtnRV.disabled = true;
        // recBtnRV.style.display = "block";
        document.getElementById("Analyze").style.display = "block";
        document.getElementById('Analytic_stop').style.display = "none";
        // stopBtnRV.style.display = "none";
        if (analyze) {
            analyze = false;
        }
        setTimeout(() => {
            document.getElementById('aRV').click();
            document.getElementById('downloadLinkRV').click();
            location.reload();                                                              //:TODO uncomment this
        }, 1000);
    }
}

function get_aspect_ratio(val, lim) {

    var lower = [0, 1];
    var upper = [1, 0];

    while (true) {
        var mediant = [lower[0] + upper[0], lower[1] + upper[1]];

        if (val * mediant[1] > mediant[0]) {
            if (lim < mediant[1]) {
                return upper;
            }
            lower = mediant;
        } else if (val * mediant[1] == mediant[0]) {
            if (lim >= mediant[1]) {
                return mediant;
            }
            if (lower[1] < upper[1]) {
                return lower;
            }
            return upper;
        } else {
            if (lim < mediant[1]) {
                return lower;
            }
            upper = mediant;
        }
    }
}

function stopTracking() {

    let finalStr = '';
    // for(i = 0; i < this.facePoints.length; i++)
    // {
    //     //finalStr.concat(this.facePoints[i].caption);
    //     finalStr += this.facePoints[i].caption;
        
    //     for(let j = 0; j < this.facePoints[i].key.length; j++)
    //     {
    //         // debugger

    //         // finalStr += `\t${this.facePoints[i].key[j].frame}\t${parseFloat(this.facePoints[i].key[j].x_pixel).toFixed(3)}\t${parseFloat(this.facePoints[i].key[j].y_pixel).toFixed(3)}\n`;

    //         if (this.facePoints[i].key[j+1]) {
    //             let thisFrame = this.facePoints[i].key[j].frame;
    //             let nextFrame = this.facePoints[i].key[j+1].frame;
    
    //             if (((nextFrame - thisFrame) == 1) || ((nextFrame - thisFrame) > 10 )) {
    //                 finalStr += `\t${this.facePoints[i].key[j].frame}\t${parseFloat(this.facePoints[i].key[j].x_pixel).toFixed(3)}\t${parseFloat(this.facePoints[i].key[j].y_pixel).toFixed(3)}\n`;
    //             } else if ( ((nextFrame - thisFrame) < 10) && ((nextFrame - thisFrame) > 1))  {
    //                 for (let index = thisFrame; index < nextFrame; index++) {
    //                     finalStr += `\t${index}\t${parseFloat(this.facePoints[i].key[j].x_pixel).toFixed(3)}\t${parseFloat(this.facePoints[i].key[j].y_pixel).toFixed(3)}\n`;   
    //                 }
    //             }                
    //         } else {
    //             finalStr += `\t${this.facePoints[i].key[j].frame}\t${parseFloat(this.facePoints[i].key[j].x_pixel).toFixed(3)}\t${parseFloat(this.facePoints[i].key[j].y_pixel).toFixed(3)}\n`;
    //         }

    //     }
    // }


    for(i = 0; i < this.facePoints.length-1; i++)
    {
        //finalStr.concat(this.facePoints[i].caption);
        finalStr += this.facePoints[i].caption;
        
        for(let j = this.facePoints[i].key[0].frame; j < this.facePoints[i].key[this.facePoints[i].key.length-1].frame; j++)
        {
            // debugger
            if (this.facePoints[i].key[j]) {
                finalStr += `\t${this.facePoints[i].key[j].frame}\t${parseFloat(this.facePoints[i].key[j].x_pixel).toFixed(3)}\t${parseFloat(this.facePoints[i].key[j].y_pixel).toFixed(3)}\n`;                
            }
        }
    }
    
    for(i = 0; i < this.ScaleData.length; i++)
    {
        ScaleDataStr += `\t${this.ScaleData[i].frame}\t${this.ScaleData[i].x_scale}\n`;
        MaskPositionDataStr += `\t${this.MaskPositionData[i].frame}\t${this.MaskPositionData[i].x_pixel}\t${this.MaskPositionData[i].y_pixel}\n`;
        RotationDataStr += `\t${this.RotationData[i].frame}\t${this.RotationData[i].xData}\t${this.RotationData[i].yData}\t${this.RotationData[i].zData}\n`;                
    }


    // for (let i = 0; i < this.ScaleData.length; i++) {

    //     // const element = array[i];
    //     if (this.ScaleData[i+1]) {
    //         let thisFrame = this.ScaleData[i].frame;
    //         let nextFrame = this.ScaleData[i+1].frame;
    //         if (((nextFrame - thisFrame) == 1) || ((nextFrame - thisFrame) > 10 )) {
    //             ScaleDataStr += `\t${this.ScaleData[i].frame}\t${this.ScaleData[i].x_scale}\n`;
    //             MaskPositionDataStr += `\t${this.MaskPositionData[i].frame}\t${this.MaskPositionData[i].x_pixel}\t${this.MaskPositionData[i].y_pixel}\n`;
    //             RotationDataStr += `\t${this.RotationData[i].frame}\t${this.RotationData[i].xData}\t${this.RotationData[i].yData}\t${this.RotationData[i].zData}\n`;                    
    //         } else if ( ((nextFrame - thisFrame) < 10) && ((nextFrame - thisFrame) > 1))  {
    //             for (let index = thisFrame; index < nextFrame; index++) {
    //                 ScaleDataStr += `\t${index}\t${this.ScaleData[i].x_scale}\n`;
    //                 MaskPositionDataStr += `\t${index}\t${this.MaskPositionData[i].x_pixel}\t${this.MaskPositionData[i].y_pixel}\n`;
    //                 RotationDataStr += `\t${index}\t${this.RotationData[i].xData}\t${this.RotationData[i].yData}\t${this.RotationData[i].zData}\n`;                
    //             }
    //         }

    //     } else {
            // ScaleDataStr += `\t${this.ScaleData[i].frame}\t${this.ScaleData[i].x_scale}\n`;
            // MaskPositionDataStr += `\t${this.MaskPositionData[i].frame}\t${this.MaskPositionData[i].x_pixel}\t${this.MaskPositionData[i].y_pixel}\n`;
            // RotationDataStr += `\t${this.RotationData[i].frame}\t${this.RotationData[i].xData}\t${this.RotationData[i].yData}\t${this.RotationData[i].zData}\n`;                
    //     }
    
    
    // }
    // testFaceArray
    console.log('testFaceArray: ', testFaceArray);
// debugger
    if (!_config__use_webcam) {
        document.getElementById("videoRV").pause();
        videoRV.pause();
    }
    captureFaceDetails = false;
    var a = _config__use_webcam ? document.getElementById("a") : document.getElementById("aRV");
    // a.style.display = "block";
    var resolutionWidth = !_config__use_webcam ? videoRV.videoWidth : "640";
    var resolutionHeight = !_config__use_webcam ? videoRV.videoHeight : "480";
    var aspectX = 4, aspectY = 3;
    if (!_config__use_webcam) {
        let resolution = get_aspect_ratio(videoRV.videoWidth / videoRV.videoHeight, 50)
        console.log('resolution: ', resolution);
        aspectX = resolution[0];
        aspectY = resolution[1];
    }

    let additionalPoints = getAdditionalPoint();

    const Header = `Rig Vadar Facial Peformance Analysis\n\n\tUnits Per Second	${frameRate}\n\tSource Width	${resolutionWidth}\n\tSource Height	${resolutionHeight}\n\tSource Pixel Aspect Ratio	${aspectX}\n\tComp Pixel Aspect Ratio	${aspectY}\n\n`;
    var fileData = `${Header}${finalStr}${RotationDataStr}${ScaleDataStr}${MaskPositionDataStr} End of Keyframe Data`;
    // console.log('faceData: ', faceData);
    var file = new Blob([fileData], { type: 'text/plain' });
    a.href = URL.createObjectURL(file);
    a.download = `${sessionName}.txt`;
}

window.addEventListener("load", startup);

// document.getElementById("trackedWebCam").style.display = "block";

function startup() {
    document.getElementById("orignalWebCam").style.display = "none";

    var _video = document.getElementById("_video");

    initializeText();
    _container = document.getElementById("_container");
    _imageData = document.getElementById("_imageData");
    var _clickArea = document.getElementById("_clickArea");


    // videoRV = document.getElementById("videoRV");
    videoRV = document.getElementById("testVid");
    // _videoSource = document.getElementById("_videoSource");
    _inputFile = document.getElementById("_inputFile");


    _containerRV = document.getElementById("_containerRV");
    _imageDataRV = document.getElementById("_imageDataRV");
    videoElement = document.getElementById("_video");
    recBtn = document.querySelector('button#rec');
    stopBtn = document.querySelector('button#stop');
    recBtnRV = document.querySelector('button#recRV');
    stopBtnRV = document.querySelector('button#stopRV');
    downloadLink = document.querySelector('a#downloadLink');
    downloadLinkRV = document.querySelector('a#downloadLinkRV');
    var webcamTab = document.getElementById("web-cam-tab");
    var loadVideoTab = document.getElementById("load-video-tab");

    navigator.mediaDevices.getUserMedia = navigator.mediaDevices.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia;

    webcamTab.addEventListener("click", function abc(e) {
        // alert(addWeb);
        firstLoaded = true;
        sessionName = prompt("Please Provide an Session Name");
        localStream = null;
        videoRV.pause();
        document.getElementById("videoRV").pause();
        // videoRV.load();
        // _imageDataRV.style.display = "none";
        _pointsToAdd = [];
        console.log("WEB CAM TAB");
        onHTMLLoadedCompletely({}, true);

    }, true);

    loadVideoTab.addEventListener("click", function xyz(e) {
        // alert(addLoadVideo);
        firstLoaded = true;
        sessionName = prompt("Please Provide an Session Name");
        if (localStream) {
            localStream.getTracks()[0].stop();
            localStream.getTracks()[1].stop();
        }
        _pointsToAdd = [];
        console.log("LOAD VIDEO TAB");
        localStream = null;
        onHTMLLoadedCompletely({}, false);

    }, true);

}









function initializeText() {
    // LeftEyebrowInnerData = "Effects Face Track Points #1    Left Eyebrow Inner #22 \n\tFrame\tX pixels\tY pixels\n"
    // LeftEyebrowMiddleData = "Effects Face Track Points #1    Left Eyebrow Middle #24 \n\tFrame\tX pixels\tY pixels\n";
    // LeftEyebrowOuterData = "Effects Face Track Points #1    Left Eyebrow Outer #26 \n\tFrame\tX pixels\tY pixels\n";
    // LeftEyeInnerData = "Effects Face Track Points #1    Left Eye Inner #42 \n\tFrame\tX pixels\tY pixels\n";
    // LeftEyeOuterData = "Effects Face Track Points #1    Left Eye Outer #45 \n\tFrame\tX pixels\tY pixels\n";

    // RightEyebrowInnerData = "Effects Face Track Points #1    Right Eyebrow Inner #21 \n\tFrame\tX pixels\tY pixels\n";

    // RightEyebrowMiddleData = "Effects Face Track Points #1    Right Eyebrow Middle #19 \n\tFrame\tX pixels\tY pixels\n";

    // RightEyebrowOuterData = "Effects Face Track Points #1    Right Eyebrow Outer #17 \n\tFrame\tX pixels\tY pixels\n";

    // RightEyeInnerData = "Effects Face Track Points #1    Right Eye Inner #39 \n\tFrame\tX pixels\tY pixels\n";
    // RightEyeOuterData = "Effects Face Track Points #1    Right Eye Outer #36 \n\tFrame\tX pixels\tY pixels\n";
    // NoseBridgeData = "Effects Face Track Points #1    Nose Bridge #27 \n\tFrame\tX pixels\tY pixels\n";
    // NoseTipData = "Effects Face Track Points #1    Nose Tip #30 \n\tFrame\tX pixels\tY pixels\n";
    // LeftNostrilData = "Effects Face Track Points #1    Left Nostril #35 \n\tFrame\tX pixels\tY pixels\n";
    // RightNostrilData = "Effects Face Track Points #1    Right Nostril #31 \n\tFrame\tX pixels\tY pixels\n";
    // MouthLeftData = "Effects Face Track Points #1    Mouth Left #54 \n\tFrame\tX pixels\tY pixels\n";
    // MouthTopData = "Effects Face Track Points #1    Mouth Top #51 \n\tFrame\tX pixels\tY pixels\n";
    // MouthRightData = "Effects Face Track Points #1    Mouth Right #48 \n\tFrame\tX pixels\tY pixels\n";
    // MouthBottomData = "Effects Face Track Points #1    Mouth Bottom #57 \n\tFrame\tX pixels\tY pixels\n";
    // LeftCheekTopData = "Effects Face Track Points #1    Left Cheek Top #15 \n\tFrame\tX pixels\tY pixels\n";
    // LeftCheekMiddleData = "Effects Face Track Points #1    Left Cheek Middle #13 \n\tFrame\tX pixels\tY pixels\n";
    // RightCheekTopData = "Effects Face Track Points #1    Right Cheek Top #1 \n\tFrame\tX pixels\tY pixels\n";
    // RightCheekMIddleData = "Effects Face Track Points #1    Right Cheek MIddle #3 \n\tFrame\tX pixels\tY pixels\n";
    // ChinData = "Effects Face Track Points #1    Chin #8 \n\tFrame\tX pixels\tY pixels\n";

    // RightEyeUpper1Data = "Effects Face Track Points #1    Right Eye Upper1 #37 \n\tFrame\tX pixels\tY pixels\n";

    // RightEyeUpper2Data = "Effects Face Track Points #1    Right Eye Upper2 #38 \n\tFrame\tX pixels\tY pixels\n";
    // RightEyeLower1Data = "Effects Face Track Points #1    Right Eye Lower1 #41 \n\tFrame\tX pixels\tY pixels\n";
    // RightEyeLower2Data = "Effects Face Track Points #1    Right Eye Lower2 #40 \n\tFrame\tX pixels\tY pixels\n";
    // LeftEyeUpper1Data = "Effects Face Track Points #1    Left Eye Upper1 #43 \n\tFrame\tX pixels\tY pixels\n";
    // LeftEyeUpper2Data = "Effects Face Track Points #1    Left Eye Upper2 #44 \n\tFrame\tX pixels\tY pixels\n";
    // LeftEyeLower1Data = "Effects Face Track Points #1    Left Eye Lower1 #47 \n\tFrame\tX pixels\tY pixels\n";
    // LeftEyeLower2Data = "Effects Face Track Points #1    Left Eye Lower2 #46 \n\tFrame\tX pixels\tY pixels\n";
    // LeftEyebrow1Data = "Effects Face Track Points #1    Left Eyebrow1 #23 \n\tFrame\tX pixels\tY pixels\n";
    // LeftEyebrow2Data = "Effects Face Track Points #1    Left Eyebrow2 #25 \n\tFrame\tX pixels\tY pixels\n";
    // RightEyebrow1Data = "Effects Face Track Points #1    Right Eyebrow1 #20 \n\tFrame\tX pixels\tY pixels\n";
    // RightEyebrow2Data = "Effects Face Track Points #1    Right Eyebrow2 #18 \n\tFrame\tX pixels\tY pixels\n";
    // MidNostrilData = "Effects Face Track Points #1    Mid Nostril #33 \n\tFrame\tX pixels\tY pixels\n";
    // NostrilR1Data = "Effects Face Track Points #1    Nostil R1 #32 \n\tFrame\tX pixels\tY pixels\n";
    // NostrilL1Data = "Effects Face Track Points #1    Nostril L1 #34 \n\tFrame\tX pixels\tY pixels\n";
    // MouthRightMidDataTop = "Effects Face Track Points #1    Mouth Right Mid Top #49 \n\tFrame\tX pixels\tY pixels\n";
    // MouthRightTopData = "Effects Face Track Points #1    Mouth Right Top #50 \n\tFrame\tX pixels\tY pixels\n";
    // MouthLeftMidDataTop = "Effects Face Track Points #1    Mouth Left Mid Top #53 \n\tFrame\tX pixels\tY pixels\n";
    // MouthLeftTopData = "Effects Face Track Points #1    Mouth Left Top #52 \n\tFrame\tX pixels\tY pixels\n";
    // MouthRightMidDataBottom = "Effects Face Track Points #1    Mouth Right Mid Bottom #59 \n\tFrame\tX pixels\tY pixels\n";
    // MouthRightBottomData = "Effects Face Track Points #1    Mouth Right Bottom #58 \n\tFrame\tX pixels\tY pixels\n";
    // MouthLeftMidDataBottom = "Effects Face Track Points #1    Mouth Left Mid Bottom #55 \n\tFrame\tX pixels\tY pixels\n";
    // MouthLeftBottomData = "Effects Face Track Points #1    Mouth Left Bottom #56 \n\tFrame\tX pixels\tY pixels\n";
    // MouthTopInner1Data = "Effects Face Track Points #1    Mouth Top Inner1 #62 \n\tFrame\tX pixels\tY pixels\n";
    // MouthTopInner2Data = "Effects Face Track Points #1    Mouth Top Inner2 #66 \n\tFrame\tX pixels\tY pixels\n";
    // JawLeftData = "Effects Face Track Points #1    Jaw Left #10 \n\tFrame\tX pixels\tY pixels\n";
    // JawRightData = "Effects Face Track Points #1    Jaw Right #6 \n\tFrame\tX pixels\tY pixels\n";
    // ScaleData = "Scale Data\n\tFrame\tScale\n";
    // MaskPositionData = "Mask Position Data\n\tFrame\tX pixels\tY pixels\n";
    // RotationData = "Rotation Data\n\tFrame\tXRot\tYRot\tZRot\n";
    // AdditionalPointData = "Additional Point Data\n";
}