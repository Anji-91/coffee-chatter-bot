import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChatMessage } from "./ChatMessage";
import { ChatSuggestions } from "./ChatSuggestions";
import { Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  text: string;
  isBot: boolean;
}

const INITIAL_MESSAGE = {
  text: "Hello! Welcome to Coffee Chat. How can I help you today?",
  isBot: true,
};

export const CoffeeChat = () => {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSend = async (message: string) => {
    if (!message.trim()) return;

    setMessages((prev) => [...prev, { text: message, isBot: false }]);
    setInput("");
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const response = generateResponse(message);
      setMessages((prev) => [...prev, { text: response, isBot: true }]);
      setIsLoading(false);
    }, 1000);
  };

  const generateResponse = (message: string): string => {
    const lowerMessage = message.toLowerCase();
    if (lowerMessage.includes("popular")) {
      return "Our most popular drink is our signature Caramel Macchiato, followed closely by our House Blend Coffee!";
    }
    if (lowerMessage.includes("beans")) {
      return "We source our beans from sustainable farms in Colombia and Ethiopia. They're medium-roasted to bring out the perfect balance of flavor!";
    }
    if (lowerMessage.includes("special")) {
      return "Today's special is our Vanilla Bean Latte at 20% off! We also have a new Pumpkin Spice Cold Brew.";
    }
    if (lowerMessage.includes("seasonal")) {
      return "For this season, we have our famous Pumpkin Spice Latte, Maple Pecan Cold Brew, and Cinnamon Roll Frappuccino!";
    }
    return "I'd be happy to help you with that! Could you please provide more details about what you'd like to know?";
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend(input);
    }
  };

  return (
    <div className="flex flex-col h-[600px] w-full max-w-2xl mx-auto bg-white rounded-xl shadow-xl">
      <div className="bg-coffee-dark text-coffee-light p-4 rounded-t-xl">
        <h1 className="text-2xl font-semibold text-center">Coffee Chat</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <ChatMessage
            key={index}
            message={message.text}
            isBot={message.isBot}
          />
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-coffee-light text-coffee-dark rounded-2xl px-4 py-2 animate-pulse">
              Typing...
            </div>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-gray-200">
        <ChatSuggestions onSuggestionClick={(suggestion) => handleSend(suggestion)} />
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1"
            disabled={isLoading}
          />
          <Button
            onClick={() => handleSend(input)}
            disabled={isLoading || !input.trim()}
            className="bg-coffee-dark text-coffee-light hover:bg-coffee-medium"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};