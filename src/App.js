import React, { useState } from "react";
import { record } from "rrweb";

function App() {
  const [recording, setRecording] = useState(false);
  const [events, setEvents] = useState([]);

  const startRecording = () => {
    if (!recording) {
      record({
        emit(event) {
          setEvents((prevEvents) => [...prevEvents, event]);
        },
      });
      setRecording(true);
    }
  };

  const stopRecording = () => {
    if (recording) {
      record({
        emit() {
          // Do nothing to stop recording
        },
      });
      setRecording(false);
    }
  };

  const uploadData = () => {
    fetch("http://localhost:3000/upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ events }),
    }).then((response) => {
      if (response.ok) {
        alert("Data uploaded successfully!");
      } else {
        alert("Failed to upload data.");
      }
    });
  };

  return (
    <div>
      <h1>User Behavior Recording</h1>
      <button onClick={startRecording} disabled={recording}>
        Start Recording
      </button>
      <button onClick={stopRecording} disabled={!recording}>
        Stop Recording
      </button>
      <button onClick={uploadData}>Upload Data</button>
    </div>
  );
}

export default App;
