Webcam.set({
    width: 360,
    height: 250,
    image_format: 'png',
    png_quality: 90,
    flip_horiz: true
})

camera = document.getElementById("camera");

Webcam.attach('camera');

function take_snapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML = '<img style="width: 330px; height: 250px;" id="capture_image" src="' + data_uri + '"/>';
    });
}

console.log('ml5 version:', ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/Efb4IsNP8/model.json', modelLoaded);

function modelLoaded() {
    console.log('Model Loaded!');
}

function speak() {
    var synth = window.speechSynthesis;
    speak_data_1 = "The first prediction is " + prediction_1;
    speak_data_2 = "The second prediction is " + prediction_2;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(utterThis);
}

function check() {
    img = document.getElementById("capture_image");
    classifier.classify(img, gotResult);
}

function gotResult(error, result) {
    if (error) {
        console.error(error);
    } else {
        console.log(result);
        document.getElementById("result_emotion_name1").innerHTML = result[0].label;
        document.getElementById("result_emotion_name2").innerHTML = result[1].label;
        prediction_1 = result[0].label;
        prediction_2 = result[1].label;
        speak()
        if (result[0].label == "Happy") {
            document.getElementById("update_emoji").innerHTML = "&#128522;";
        }
        if (result[1].label == "Happy") {
            document.getElementById("update_emoji2").innerHTML = "&#128522;";
        }
        if (result[0].label == "Sad") {
            document.getElementById("update_emoji").innerHTML = "&#x1F614;";
        }
        if (result[1].label == "Sad") {
            document.getElementById("update_emoji2").innerHTML = "&#x1F614;";
        }
        if (result[0].label == "Angry") {
            document.getElementById("update_emoji").innerHTML = "&#128545;";
        }
        if (result[1].label == "Angry") {
            document.getElementById("update_emoji2").innerHTML = "&#128545;";
        }
    }
}