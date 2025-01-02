import { Button } from "@/components/ui/button";

interface ChatSuggestionsProps {
  onSuggestionClick: (suggestion: string) => void;
}

export const ChatSuggestions = ({ onSuggestionClick }: ChatSuggestionsProps) => {
  const suggestions = [
    "What are today's specials?",
    "Show me the combo deals",
    "What seasonal drinks do you have?",
    "What do you recommend?",
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