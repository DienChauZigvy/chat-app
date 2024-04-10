import { useContext, useEffect, useState } from "react";
import { WebsocketContext } from "../../contexts/WebsocketContext";
import { Profile } from "../../pages/Login";

type MessagePayload = {
  content: string;
  chatName: string;
};

export default function Websocket() {
  const [profile, setProfile] = useState<Profile>();

  useEffect(() => {
    const profileLocalStorage = localStorage.getItem("profile");
    if (profileLocalStorage) {
      const profile: Profile = JSON.parse(profileLocalStorage);
      setProfile(profile);
    }
  }, []);
  const socket = useContext(WebsocketContext);
  const [messages, setMessages] = useState<MessagePayload[]>([]);
  const [value, setValue] = useState("");

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected");
    });
    socket.on("onMessage", (data: MessagePayload) => {
      console.log("onMessage event recieved!");
      console.log(11, data);
      setMessages((prev) => [data, ...prev]);
    });

    socket.emit("join", { chatName: "chatroom7" });

    return () => {
      console.log("Unregistering Events...");
      socket.off("connect");
      socket.off("onMessage");
    };
  }, []);

  const onSubmit = () => {
    socket.emit("createMessage", { content: value, chatName: "chatroom7" });
    setValue("");
  };
  return (
    <div style={{ padding: "20px" }}>
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
              <div key={index} style={{ display: "flex", gap: 20 }}>
                <span>{profile?.username}: </span>
                <span>{mes.content}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
