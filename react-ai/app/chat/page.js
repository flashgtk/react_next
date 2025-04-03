"use client";
import React, { useState } from "react";
import { PencilIcon, FileIcon, ShareIcon, AlarmCheck, PlusIcon, MessageSquareIcon } from "lucide-react";

export default function ChatPage() {
  const [conversations, setConversations] = useState([]);
  const [activeConvo, setActiveConvo] = useState({});
  const [userQue, setUserQue] = useState("");

  async function getAIResponse() {
    const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models";
    const MODEL_NAME = "gemini-2.0-flash";
    const apiKey = "AIzaSyA1e-o97mxLIrmwF6i4bCd7wa-eCTvnYlA";

    const response = await fetch(
      `${GEMINI_API_URL}/${MODEL_NAME}:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `
                     Return response as json array strictly no markdown formatting
                      Act as a Japanese Language Trainer, I want you to teach me Japanese Language by stories.
                      1. I want you to generate a small English Story
                      2. Convert it into japanese language
                      3. Explain line by line by translating english story into Japanese language
                  `,
                },
              ],
            },
          ],
        }),
      }
    );
    const data = await response.json();
    let content = data.candidates[0].content.parts[0].text;
    content = content.replace("```", "");

    setActiveConvo((prevConvo) => ({
      ...prevConvo,
      messages: [
        ...(prevConvo.messages || []),
        {
          role: "assistant",
          content: content,
        },
      ],
    }));
  }

  return (
    <div className="flex flex-row min-h-screen bg-gray-900 p-4">
      <div className="flex flex-col w-[250px] bg-gray-800 text-white rounded-lg shadow-md p-4">
        <button
          className="flex flex-row text-white items-center justify-center bg-gray-600 p-3 rounded-md shadow hover:bg-blue-700 transition-colors duration-300 mb-4"
          onClick={() => {
            setConversations([
              ...conversations,
              {
                title: "Conversation",
                messages: [],
              },
            ]);
          }}
        >
          <PlusIcon />
          <div className="ml-2">New Chat</div>
        </button>

        <hr className="border-gray-600 mb-4" />
        {conversations.map((convo, index) => (
          <div
            key={index}
            onClick={() => {
              setActiveConvo(convo);
            }}
            className="flex flex-row bg-gray-700 text-white rounded-md p-3 mb-2 cursor-pointer hover:bg-gray-600"
          >
            <MessageSquareIcon width={24} />
            <div className="ml-2">{convo.title}</div>
          </div>
        ))}
      </div>

      <div className="flex flex-col w-full bg-gray-200 text-black rounded-lg shadow-lg">
        <nav className="flex flex-row p-4 bg-gray-600 text-white items-center justify-between rounded-t-lg">
          <div className="flex flex-row items-center">
            <h1 className="text-2xl font-bold">LanBuddy</h1>
            <PencilIcon className="m-2 text-white" />
            <FileIcon className="m-2 text-white" />
          </div>

          <div className="flex flex-row text-white">
            <ShareIcon className="m-2" />
            <AlarmCheck className="m-2" />
          </div>
        </nav>

        <div className="flex flex-col bg-gray-50 p-4 overflow-y-auto flex-grow">
          {activeConvo?.messages?.map((message, i) => (
            <div
              key={i}
              className={`flex flex-row ${
                message.role === "user" ? "justify-end" : "justify-start"
              } py-2`}
            >
              <div
                className={`px-4 py-2 max-w-[80%] rounded-lg ${
                  message.role === "user" ? "bg-gray-500 text-white" : "bg-gray-200 text-black"
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-row items-center p-4 bg-gray-50 rounded-b-lg text-black">
          <input
            type="text"
            onChange={(e) => setUserQue(e.target.value)}
            placeholder="Type a message..."
            className="w-full h-[50px] border-2 border-gray-300 rounded-full px-4"
          />
          <button
            className="bg-green-500 text-black font-bold p-3 rounded-full ml-4 hover:bg-gray-700 transition-colors duration-300"
            onClick={() => {
              setActiveConvo((prevConvo) => ({
                ...prevConvo,
                messages: [
                  ...(prevConvo?.messages ?? []),
                  {
                    role: "user",
                    content: userQue,
                  },
                ],
              }));
              getAIResponse();
            }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
