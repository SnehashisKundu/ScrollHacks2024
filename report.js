
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.interimResults = false;
recognition.lang = "en-US";

let currentField = 0;
const fields = ["name", "email", "subject", "description"];
document.getElementById("startVoice").addEventListener("click", () => {
  speak(
    "Welcome to the report form. I'll assist you in filling out the form. Let's start with your full name.",
  );
  currentField = 0;
  recognition.start();
});

recognition.onresult = function (event) {
  const transcript = event.results[0][0].transcript.trim();
  document.getElementById(fields[currentField]).value = transcript;

  if (currentField < fields.length - 1) {
    currentField++;
    let nextQuestion = getNextQuestion(currentField);
    speak(nextQuestion);
    recognition.start(); 
  } else {
    speak(
      "Thank you! You have filled all the fields. Please review and submit the form.",
    );
  }
};

document.getElementById("reportForm").addEventListener("submit", function (e) {
  e.preventDefault();
  speak("Submitting your report. Thank you!");
});

function getNextQuestion(index) {
  switch (index) {
    case 1:
      return "What is your email address?";
    case 2:
      return "Please provide the subject of the report.";
    case 3:
      return "Describe the issue in a few sentences.";
    default:
      return "I'm sorry, I didn't understand that.";
  }
}

function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  window.speechSynthesis.speak(utterance);
}

recognition.onerror = function (event) {
  speak("I couldn't understand you. Can you please repeat that?");
  recognition.start();
};
