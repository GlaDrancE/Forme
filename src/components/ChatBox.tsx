
import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { MessageSquare, Send, User } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Message {
  id: string;
  sender: 'user' | 'other';
  content: string;
  timestamp: Date;
}

interface ChatBoxProps {
  recipientName?: string;
  productTitle?: string;
}

const ChatBox = ({ recipientName = 'Seller', productTitle = 'Item' }: ChatBoxProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messageInput, setMessageInput] = useState('');
  const chatBox = useRef<HTMLDivElement>();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'user',
      content: 'Hi, is this still available?',
      timestamp: new Date('2025-04-02T10:30:00'),
    },
    {
      id: '2',
      sender: 'other',
      content: 'Yes, it is! Are you interested?',
      timestamp: new Date('2025-04-02T10:32:00'),
    },
    {
      id: '3',
      sender: 'user',
      content: 'Great! Can we meet tomorrow to take a look at it?',
      timestamp: new Date('2025-04-02T10:35:00'),
    },
    {
      id: '4',
      sender: 'other',
      content: 'Sure, I\'m available in the afternoon. How does 3 PM sound?',
      timestamp: new Date('2025-04-02T10:40:00'),
    },
  ]);

  const toggleChat = () => setIsOpen(!isOpen);

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      // This would normally send the message to the backend
      console.log('Message sent:', messageInput);
      console.log(messages)
      // setMessages(prev => ({
      //   ...prev,
      //   id: 5,
      //   sender: 'user',
      //   content: messageInput,
      //   timestamp: new Date()
      // }))
      messages.push({
        id: (parseInt(messages[messages.length - 1].id) + 1).toString(),
        sender: 'user',
        content: messageInput,
        timestamp: new Date()
      })
      if (chatBox.current) {

        chatBox.current?.scrollIntoView({ behavior: 'smooth' });
      }
      // Clear input after sending
      setMessageInput('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat Button */}
      <Button
        onClick={toggleChat}
        className="rounded-full h-12 w-12 p-0 shadow-lg"
      >
        <MessageSquare className="h-5 w-5" />
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 md:w-96 bg-card rounded-lg shadow-xl border overflow-hidden">
          {/* Chat Header */}
          <div className="bg-primary text-primary-foreground p-3 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="bg-primary-foreground text-primary rounded-full p-1">
                <User className="h-4 w-4" />
              </div>
              <div>
                <p className="font-medium text-sm">{recipientName}</p>
                <p className="text-xs opacity-90">{productTitle}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleChat}
              className="text-primary-foreground h-8 w-8 p-0"
            >
              &times;
            </Button>
          </div>

          {/* Chat Messages */}
          <ScrollArea className="h-80 p-3" >
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] px-3 py-2 rounded-lg ${message.sender === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                      }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {new Date(message.timestamp).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div ref={chatBox} className='mb-24'>

            </div>
          </ScrollArea>

          {/* Message Input */}
          <div className="p-3 border-t">
            <div className="flex items-center space-x-2">
              <Textarea
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Type a message..."
                className="min-h-[40px] resize-none"
              />
              <Button
                onClick={handleSendMessage}
                size="icon"
                disabled={!messageInput.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBox;
