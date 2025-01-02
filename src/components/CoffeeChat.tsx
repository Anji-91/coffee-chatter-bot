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
  text: "Hello! Welcome to Coffee Chat. How can I help you today? Feel free to ask about our menu items, prices, seasonal specials, or recommendations!",
  isBot: true,
};

const MENU_PRICES = {
  hot: {
    "americano": "$3.50",
    "cappuccino": "$4.00",
    "espresso": "$3.00",
    "latte": "$4.00",
    "mocha": "$4.50",
  },
  iced: {
    "iced americano": "$4.00",
    "iced latte": "$4.50",
    "hazelnut mocha": "$4.50",
    "caramel cream": "$4.50",
    "cookies n cream": "$5.00",
  },
  tea: {
    "green tea": "$3.50",
    "black tea": "$3.50",
    "earl grey": "$4.00",
    "chai tea": "$4.00",
  },
  snacks: {
    "muffin": "$3.50",
    "croissant": "$3.50",
    "waffle": "$3.50",
    "sandwich": "$4.50",
  },
  seasonal: {
    "pumpkin spice latte": "$5.00",
    "mint chocolate mocha": "$5.00",
    "caramel apple cider": "$4.50",
    "gingerbread latte": "$5.00",
  },
  combos: {
    "breakfast combo": "Any hot coffee + croissant for $6.50",
    "afternoon delight": "Any iced drink + muffin for $7.00",
    "tea time special": "Any tea + waffle for $6.50",
    "lunch combo": "Any drink + sandwich for $8.00",
  }
};

export const CoffeeChat = () => {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const generateResponse = (message: string): string => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes("price") || lowerMessage.includes("cost") || lowerMessage.includes("how much")) {
      if (lowerMessage.includes("hot") || lowerMessage.includes("coffee")) {
        return "Here are our hot coffee prices:\n" +
          Object.entries(MENU_PRICES.hot)
            .map(([drink, price]) => `${drink.charAt(0).toUpperCase() + drink.slice(1)}: ${price}`)
            .join("\n");
      }
      if (lowerMessage.includes("iced") || lowerMessage.includes("cold")) {
        return "Here are our iced drink prices:\n" +
          Object.entries(MENU_PRICES.iced)
            .map(([drink, price]) => `${drink.charAt(0).toUpperCase() + drink.slice(1)}: ${price}`)
            .join("\n");
      }
      if (lowerMessage.includes("tea")) {
        return "Here are our tea prices:\n" +
          Object.entries(MENU_PRICES.tea)
            .map(([drink, price]) => `${drink.charAt(0).toUpperCase() + drink.slice(1)}: ${price}`)
            .join("\n");
      }
      if (lowerMessage.includes("snack") || lowerMessage.includes("food")) {
        return "Here are our snack prices:\n" +
          Object.entries(MENU_PRICES.snacks)
            .map(([item, price]) => `${item.charAt(0).toUpperCase() + item.slice(1)}: ${price}`)
            .join("\n");
      }
      if (lowerMessage.includes("seasonal") || lowerMessage.includes("special drinks")) {
        return "Here are our seasonal drink prices:\n" +
          Object.entries(MENU_PRICES.seasonal)
            .map(([drink, price]) => `${drink.charAt(0).toUpperCase() + drink.slice(1)}: ${price}`)
            .join("\n");
      }
      if (lowerMessage.includes("combo") || lowerMessage.includes("deal")) {
        return "Here are our combo deals:\n" +
          Object.entries(MENU_PRICES.combos)
            .map(([combo, details]) => `${combo.charAt(0).toUpperCase() + combo.slice(1)}: ${details}`)
            .join("\n");
      }
      return "We have various drinks and snacks available. You can ask about specific categories like:\n- Hot coffee prices\n- Iced drink prices\n- Tea prices\n- Snack prices\n- Seasonal specials\n- Combo deals";
    }

    if (lowerMessage.includes("popular")) {
      return "Our most popular items are:\n- Caramel Cream ($4.50)\n- Hazelnut Mocha ($4.50)\n- Pumpkin Spice Latte ($5.00)\n- Breakfast Combo (Any hot coffee + croissant for $6.50)";
    }
    if (lowerMessage.includes("menu")) {
      return "We offer:\n- Hot coffee drinks\n- Iced drinks\n- Teas\n- Snacks\n- Seasonal specials\n- Combo deals\n\nWould you like to know the prices for any specific category?";
    }
    if (lowerMessage.includes("seasonal") || lowerMessage.includes("special drinks")) {
      return "Our current seasonal drinks are:\n" +
        Object.entries(MENU_PRICES.seasonal)
          .map(([drink, price]) => `${drink.charAt(0).toUpperCase() + drink.slice(1)}: ${price}`)
          .join("\n");
    }
    if (lowerMessage.includes("combo") || lowerMessage.includes("deal")) {
      return "Here are our combo deals:\n" +
        Object.entries(MENU_PRICES.combos)
          .map(([combo, details]) => `${combo.charAt(0).toUpperCase() + combo.slice(1)}: ${details}`)
          .join("\n");
    }
    if (lowerMessage.includes("recommend")) {
      return "Based on our customers' favorites, I recommend:\n1. Hazelnut Mocha ($4.50) - Perfect balance of nutty and chocolate flavors\n2. Pumpkin Spice Latte ($5.00) - Our seasonal favorite\n3. Breakfast Combo - Any hot coffee + croissant for $6.50\n4. Caramel Cream ($4.50) - Sweet and refreshing";
    }
    return "I'd be happy to help you with our menu and prices! You can ask about:\n- Regular menu items and prices\n- Seasonal specials\n- Combo deals\n- Popular items\n- Recommendations";
  };

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