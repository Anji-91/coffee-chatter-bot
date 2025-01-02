import { cn } from "@/lib/utils";

interface ChatMessageProps {
  message: string;
  isBot: boolean;
}

export const ChatMessage = ({ message, isBot }: ChatMessageProps) => {
  return (
    <div
      className={cn(
        "flex w-full mb-4 animate-message-fade-in opacity-0",
        isBot ? "justify-start" : "justify-end"
      )}
    >
      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-4 py-2",
          isBot
            ? "bg-coffee-light text-coffee-dark"
            : "bg-coffee-dark text-coffee-light"
        )}
      >
        {message}
      </div>
    </div>
  );
};