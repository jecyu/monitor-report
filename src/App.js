import React, { useState, useEffect } from "react";
import { record } from "rrweb";

function App() {
  const [recording, setRecording] = useState(false);
  const [events, setEvents] = useState([]);

  const startRecording = () => {
    if (!recording) {
      record({
        // TODO可以过滤掉一些事件
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
    fetch("/upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ events }),
    }).then((response) => {
      if (response.ok) {
        console.log("Data uploaded successfully!");
      } else {
        console.log("Failed to upload data.");
      }
    });
  };

  // TODO
  // const simulateError = () => {
  //   try {
  //     console.log("".add());
  //   } catch (err) {
  //     console.log("err ->", err);
  //   }
  // };

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
      {/* <button onClick={simulateError}>Simulate Error</button> */}
    </div>
  );
}

export default App;
