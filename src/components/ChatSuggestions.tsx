import { Button } from "@/components/ui/button";

interface ChatSuggestionsProps {
  onSuggestionClick: (suggestion: string) => void;
}

export const ChatSuggestions = ({ onSuggestionClick }: ChatSuggestionsProps) => {
  const suggestions = [
    "What's your most popular drink?",
    "Tell me about your coffee beans",
    "What are today's specials?",
    "Do you have any seasonal drinks?",
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {suggestions.map((suggestion) => (
        <Button
          key={suggestion}
          variant="outline"
          className="bg-coffee-light text-coffee-dark hover:bg-coffee-medium hover:text-coffee-light transition-colors"
          onClick={() => onSuggestionClick(suggestion)}
        >
          {suggestion}
        </Button>
      ))}
    </div>
  );
};