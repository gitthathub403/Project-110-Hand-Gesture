Webcam.set ({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
})

camera=document.getElementById("camera");

Webcam.attach('#camera');

function take_snapshot() {
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    })

}

console.log('ml5 version', ml5.version);
classifier= ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/Ia8X1Ve3B/model.json', modelLoaded);

function modelLoaded() {
    console.log("Model Loaded");
}

function speak() {
    var synth= window.speechSynthesis;
    speak_data1 = "The first prediction is "+prediction1;
    speak_data2 = "The second prediction is "+prediction2;
    var utterThis = new SpeechSynthesisUtterance(speak_data1+speak_data2);
    synth.speak(utterThis);
}

function check() {
    img=document.getElementById("captured_image");
    classifier.classify(img, gotResult);
}


function gotResult(error, results) {
    if(error) {
        console.error("error");
    }
    else{
        console.log(results);
        document.getElementById("result_object_name").innerHTML = results[0].label;
        
        gesture = results[0].label;
        
        toSpeak="";

        if(gesture == "Peace") {
            document.getElementById("update_emoji").innerHTML = "&#9996;";
        }
        if(gesture == "Llama") {
            document.getElementById("update_emoji").innerHTML = "&#129304;";
        }
        if(gesture == "Italian Hand") {
            document.getElementById("update_emoji").innerHTML = "&#129292;";
        }
        if(gesture == "Surprised") {
            document.getElementById("update_emoji").innerHTML = "&#128070;";
        }
        
    }

}