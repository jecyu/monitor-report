import React, { useState, useEffect, useRef } from "react";
import { record } from "rrweb";

// 模拟错误
function Demo2() {
  const eventRef = useRef([]);
  const uploadData = () => {
    fetch("/upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ events: eventRef.current }),
    }).then((response) => {
      if (response.ok) {
        console.log("Data uploaded successfully!");
      } else {
        console.log("Failed to upload data.");
      }
    });
  };

  const uploadError = (errorEvent) => {
    fetch("/error-report", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(errorEvent),
    });
  };
  useEffect(() => {
    record({
      emit(event) {
        // console.log("event");
        eventRef.current = [...eventRef.current, event];
      },
    });
    function errorHandler(event) {
      // 在 DEV 模式下的 React 会触发两次 https://stackoverflow.com/questions/50201345/javascript-react-window-onerror-fired-twice
      // if (event.error.hasBeenCaught !== undefined) {
      //   return false;
      // }
      // event.error.hasBeenCaught = true;
      const { error } = event;
      // Skip the first error, it is always irrelevant in the DEV mode.
      if (
        error.stack?.indexOf("invokeGuardedCallbackDev") >= 0 &&
        !error.alreadySeen
      ) {
        error.alreadySeen = true;
        event.preventDefault();
        return;
      }
      // 上报事件
      uploadData();
      const errorEvent = {
        type: "error",
        data: {
          message: event,
          // source,
          // lineno,
          // colno,
          stack: error ? error.stack : "no stack available",
        },
      };
      // TODO 后续用户行为和错误可以通过 uuid 进行关联
      uploadError(errorEvent);
    }
    window.addEventListener("error", errorHandler, {
      capture: true,
    });
    () => {
      // 移除事件和播放器
      window.removeEventListener("error", errorHandler);
    };
  }, []);
  return (
    <div>
      <h1>发生错误时上报用户行为记录</h1>
      <h1>依次点击1、2、3、error 按钮</h1>
      <button>1</button>
      <button>2</button>
      <button>3</button>
      <button
        onClick={() => {
          throw new Error("Simulated error");
        }}
      >
        Error
      </button>
    </div>
  );
}

// 手动记录
function Demo1() {
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

  return (
    <div>
      <h1>用户行为记录上报</h1>
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

function App() {
  const [tabActive, setTabActive] = useState("1");
  const toogleTab = (tabActive) => {
    setTabActive(tabActive);
  };
  return (
    <div>
      <button
        onClick={() => toogleTab("1")}
        style={{ color: tabActive === "1" && "red" }}
      >
        Tab 1
      </button>
      <button
        style={{ color: tabActive === "2" && "red" }}
        onClick={() => toogleTab("2")}
      >
        Tab 2
      </button>
      <div style={{ border: "1px solid #ccc", padding: "8px", margin: "8px" }}>
        {tabActive === "1" ? <Demo1 /> : <Demo2 />}
      </div>
    </div>
  );
}

export default App;
