import { useContext, useEffect, useState } from "react";
import { WebsocketContext } from "../../contexts/WebsocketContext";

type MessagePayload = {
  content: string;
  msg: string;
};

export default function Websocket() {
  const socket = useContext(WebsocketContext);
  const [messages, setMessages] = useState<MessagePayload[]>([]);
  const [value, setValue] = useState("");

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected");
    });
    socket.on("onMessage", (data: MessagePayload) => {
      console.log("onMessage event recieved!");
      console.log(data);
      setMessages((prev) => [data, ...prev]);
    });

    return () => {
      console.log("Unregistering Events...");
      socket.off("connect");
      socket.off("onMessage");
    };
  }, []);

  const onSubmit = () => {
    socket.emit("addMessage", value);
    setValue("");
  };
  return (
    <div>
      <h1>Web socket component</h1>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button onClick={onSubmit}>Submit</button>

      <div>
        {messages.length === 0 ? (
          <div>No messages</div>
        ) : (
          <div>
            {messages?.map((mes, index) => (
              <div key={index}>{mes.content}</div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
