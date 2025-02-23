"use client";
import { useState } from "react";
import EmailPreview from "@/components/EmailPreview";

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [view, setView] = useState("preview");
  const [code, setCode] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [recipient, setRecipient] = useState("");
  const [subject, setSubject] = useState("");
  const [html, setHtml] = useState(""); // State for rendered HTML

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await response.json();
      if (data.error) throw new Error(data.error);

      setCode(data.code);
      setMessages([...newMessages, { role: "assistant", content: data.code }]);
    } catch (error) {
      console.error("Error generating code:", error);
      setMessages([
        ...newMessages,
        { role: "assistant", content: `Error: ${error.message}` },
      ]);
    }
  };

  const handleSendEmail = async () => {
    if (!recipient || !subject || !html) {
      alert("Please fill in all fields and generate an email first.");
      return;
    }

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recipient, subject, html }),
      });
      const data = await response.json();
      if (data.error) throw new Error(data.error);
      alert("Email sent successfully!");
    } catch (error) {
      alert(`Error: ${error.message}`);
    } finally {
      setIsModalOpen(false);
      setRecipient("");
      setSubject("");
    }
  };

  return (
    <div className="flex h-screen bg-black text-white">
      {/* Chat Window */}
      <div className="w-1/2 p-4 bg-gray-900 rounded-lg m-4">
        <div className="h-[calc(100%-3rem)] overflow-auto mb-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`mb-2 flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <span
                className={`inline-block p-3 rounded-lg max-w-[80%] ${
                  msg.role === "user"
                    ? "bg-gray-700 text-white"
                    : "bg-gray-800 text-gray-300"
                }`}
              >
                {msg.role === "user" ? (
                  msg.content
                ) : (
                  <pre className="whitespace-pre-wrap">{msg.content}</pre>
                )}
              </span>
            </div>
          ))}
        </div>
        <div className="flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 p-3 bg-gray-800 text-white border border-gray-700 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Describe your email..."
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <button
            onClick={handleSendMessage}
            className="bg-blue-400 text-white px-4 py-3 rounded-r-lg hover:bg-blue-500 transition duration-200"
          >
            Send
          </button>
        </div>
      </div>
      {/* Preview Area */}
      <div className="w-1/2 p-4 bg-gray-900 rounded-lg m-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white">Preview</h2>
          <div>
            <button
              onClick={() => setView("code")}
              className={`px-4 py-2 mr-2 rounded-lg transition duration-200 ${
                view === "code"
                  ? "bg-blue-400 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              Code View
            </button>
            <button
              onClick={() => setView("preview")}
              className={`px-4 py-2 rounded-lg transition duration-200 ${
                view === "preview"
                  ? "bg-blue-400 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              Preview View
            </button>
          </div>
        </div>
        {view === "code" ? (
          <pre className="bg-gray-800 text-gray-300 p-4 rounded-lg overflow-auto h-[calc(100%-4rem)] break-words">
            <code>{code || "// No code generated yet"}</code>
          </pre>
        ) : (
          <div className="border border-gray-700 p-4 rounded-lg h-[calc(100%-4rem)] overflow-auto bg-gray-800">
            {code ? (
              <EmailPreview code={code} setHtml={setHtml} />
            ) : (
              <p className="text-gray-400">No preview available.</p>
            )}
          </div>
        )}
      </div>
      {/* Send Button */}
      <nav className="fixed bottom-7 right-5">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-400 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-500 transition duration-200"
        >
          Send Email
        </button>
      </nav>
      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center">
          <div className="bg-gray-800 p-6 rounded-lg shadow-xl w-96">
            <h2 className="text-2xl font-bold text-white mb-4">Send Email</h2>
            <div className="mb-4">
              <label className="block mb-2 text-gray-300">
                Recipient Email:
              </label>
              <input
                type="email"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="recipient@example.com"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-gray-300">Subject:</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Email subject"
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-600 text-white px-4 py-2 rounded-lg mr-2 hover:bg-gray-700 transition duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleSendEmail}
                className="bg-blue-400 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition duration-200"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
