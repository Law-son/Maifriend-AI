import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [itemId, setItemId] = useState(null);
  const [imageLink, setImageLink] = useState("");
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false); // Added loading state

  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    setItemId(searchParams.get("itemId"));
    setImageLink(searchParams.get("imageLink"));
    setRole(searchParams.get("role"));
    setName(searchParams.get("name"));
  }, [location.search]);

  const handleSendMessage = async () => {
    if (newMessage.trim() === "") {
      return; // Don't send empty messages
    }

    try {
      setLoading(true); // Set loading to true when sending the message

      const response = await fetch("http://localhost:3000/sendMessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: newMessage, role, name }),
      });

      if (!response.ok) {
        console.error(`Failed to send message. Status: ${response.status}`);
        // Handle error and return
        return;
      }

      const responseData = await response.json();

      // Assuming your response has a 'success' property
      const apiMessage = responseData.success;

      setMessages((prevMessages) => [
        ...prevMessages,
        { text: newMessage, sender: "user" },
        { text: apiMessage, sender: "receiver" },
      ]);

      setNewMessage("");
      setLoading(false); // Set loading back to false when the response is received

      console.log(responseData); // Log the entire response data for inspection
    } catch (error) {
      console.error("An error occurred while sending the message:", error);
      // Handle the error or provide user feedback
      setLoading(false); // Set loading back to false in case of an error
    }
  };

  return (
    <main className="chat-interface bg-primaryDark px-4 py-10 md:px-10">
      <div className="bg-lightDark mx-2 md:mx-32 rounded-lg">
        <div className="message-header flex justify-center items-center mb-16 rounded-t-lg bg-deepBlue">
          <img src={imageLink} className="w-10 h-10 rounded-full" alt="character image" />
          <h1 className="text-xl py-3 font-semibold text-white">{name}</h1>
        </div>
        <div className="message-container mx-2">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`message ${message.sender === "user" ? "text-mintGreen" : "text-lightBlue"}`}
            >
              {message.text}
            </div>
          ))}
        </div>
        <div className="input-container flex justify-center items-center mx-2 mt-10">
          <input
            type="text"
            placeholder="Type your message..."
            value={newMessage}
            className="rounded-l-lg flex-1 border-none mb-3"
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button
            className="bg-primaryDark text-white rounded-r-lg py-2 px-2 mb-3 flex-4"
            onClick={handleSendMessage}
            disabled={loading} // Disable the button when loading is true
          >
            {loading ? "..." : "Send"}
          </button>
        </div>
      </div>
    </main>
  );
};

export default ChatInterface;
