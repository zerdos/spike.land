import  { useState } from "react";
import { Send, Bot, X, Check, X as XMark } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const mockResponses = [
  "Hello! How can I assist you today?",
  "That's an interesting question. Let me think about it for a moment.",
  "I'm sorry, I don't have enough information to answer that question accurately.",
  "Is there anything else you'd like to know?",
  "That's a great point! I hadn't considered that perspective before.",
];

const ChatMessage = ({ message, isUser, onDoubleClick, isSelected, onEdit }: { message: string, isUser: boolean, onDoubleClick: () => void, isSelected: boolean, onEdit: (newText: string) => void }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedMessage, setEditedMessage] = useState(message);

  const handleDoubleClick = () => {
    if (isUser) {
      setIsEditing(true);
    } else {
      onDoubleClick();
    }
  };

  const handleSaveEdit = () => {
    onEdit(editedMessage);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditedMessage(message);
    setIsEditing(false);
  };

  return (
    <div
      className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}
      onDoubleClick={handleDoubleClick}>
      <div
        className={`max-w-[80%] p-3 rounded-lg ${
          isUser
            ? "bg-primary text-primary-foreground"
            : isSelected
              ? "bg-secondary text-secondary-foreground ring-2 ring-primary"
              : "bg-secondary text-secondary-foreground"
        }`}>
        {isEditing ? (
          <div className="flex flex-col space-y-2">
            <Input
              value={editedMessage}
              onChange={(e) => setEditedMessage(e.target.value)}
              className="bg-background text-foreground"
            />
            <div className="flex justify-end space-x-2">
              <Button size="sm" onClick={handleSaveEdit}>
                <Check className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="outline" onClick={handleCancelEdit}>
                <XMark className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ) : (
          message   
        )}
      </div>
    </div>
  );
};

const ChatWindow = () => {
  const [messages, setMessages] = useState<{ id: number; text: string; isUser: boolean; }[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<null|number>(null);

  const handleSendMessage = () => {
    if (inputMessage.trim() === "") return;

    const newMessages = [
      ...messages,
      { id: Date.now(), text: inputMessage, isUser: true },
    ];
    setMessages(newMessages);
    setInputMessage("");

    setTimeout(() => {
      const aiResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)];
      setMessages([...newMessages, { id: Date.now(), text: aiResponse, isUser: false }]);
    }, 1000);
  };

  const handleMessageSelection = (id: number) => {
    setSelectedMessage(selectedMessage === id ? null : id);
  };

  const handleMessageEdit = (id: number, newText: string) => {
    setMessages(messages.map((msg) => (msg.id === id ? { ...msg, text: newText } : msg)));
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 rounded-full w-12 h-12 p-0">
        <Bot className="h-6 w-6" />
      </Button>

      <div
        className={`fixed inset-y-0 right-0 w-96 max-w-full bg-background shadow-lg transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex flex-col h-full border-l border-input">
          <div className="bg-secondary p-4 font-bold flex justify-between items-center">
            <span>Chat Window</span>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <ScrollArea className="flex-1 p-4">
            {messages.map((message) => (
              <ChatMessage
                key={message.id}
                message={message.text}
                isUser={message.isUser}
                isSelected={selectedMessage === message.id}
                onDoubleClick={() => handleMessageSelection(message.id)}
                onEdit={(newText) => handleMessageEdit(message.id, newText)}
              />
            ))}
          </ScrollArea>
          <div className="p-4 bg-background">
            <div className="flex items-center space-x-2">
              <Input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Type a message..."
                className="flex-1"
              />
              <Button onClick={handleSendMessage} size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatWindow;
