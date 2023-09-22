//https://teachablemachine.withgoogle.com/models/_uo6fKePD/
Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality:90

})

camera = document.getElementById('camera');
Webcam.attach(camera);

function takeSnapshot() {
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = "<img id='capture_image' src='" + data_uri +"'>"
    }
    )
}
console.log("ml5 version",ml5.version);
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/_uo6fKePD/model.json",modelloaded)

function modelloaded() {
    console.log("Model is ready");
}

Prediction1 = "";
Prediction2 = "";

function Speak(){
    var synth = window.speechSynthesis;
    var speakData1 = "The First Prediction is " + Prediction1 ;
    var speakData2 = "And The Second Prediction is " + Prediction2 ;
    var utterThis = new SpeechSynthesisUtterance(speakData1 + speakData2) ;
    synth.speak(utterThis) ;

}
function Check() {
    img = document.getElementById("capture_image");
    classifier.classify(img, gotresult);
  }
  
  function gotresult(error, results) {
    if (error) {
      console.log(error);
    } else {
      console.log(results);
      document.getElementById("result_emotion_name1").innerHTML = results[0].label;
      document.getElementById("result_emotion_name2").innerHTML = results[1].label;
      Prediction1 = results[0].label;
      Prediction2 = results[1].label;
      Speak();
      if (results[0].label == "Perfect") {
        document.getElementById("update_emoji1").innerHTML = "&#128076;";
      }
      if (results[0].label == "Best") {
        document.getElementById("update_emoji1").innerHTML = "&#128077;";
      }
      if (results[0].label == "victory") {
        document.getElementById("update_emoji1").innerHTML = "&#9996;";
      }
      if (results[1].label == "Perfect") {
        document.getElementById("update_emoji2").innerHTML = "&#128076;";
      }
      if (results[1].label == "Best") {
        document.getElementById("update_emoji2").innerHTML = "&#128077;";
      }
      if (results[1].label == "victory") {
        document.getElementById("update_emoji2").innerHTML = "&#9996;";
      }
    }
  }
  