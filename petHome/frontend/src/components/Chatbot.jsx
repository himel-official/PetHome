import { useState } from 'react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'bot', text: "Hi there! 🐾 I'm Pawly, your PetHome assistant. How can I help you today?" }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages(prev => [...prev, { type: 'user', text: input }]);
    
    // Simple AI responses
    setTimeout(() => {
      let reply = "Thanks for your message! ";
      
      const lowerInput = input.toLowerCase();
      
      if (lowerInput.includes('adopt') || lowerInput.includes('adoption')) {
        reply = "Great! You can browse available pets in the 'Browse Pets' section 🐶";
      } else if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
        reply = "Hello! How can I help you find your perfect pet today? 😊";
      } else if (lowerInput.includes('caregiver') || lowerInput.includes('shelter')) {
        reply = "We have many caring shelters and individual caregivers. Would you like to see caregiver profiles?";
      } else if (lowerInput.includes('location') || lowerInput.includes('dhaka')) {
        reply = "Most of our pets are currently in Dhaka. You can filter by location on the browse page.";
      } else {
        reply = "I'm still learning! You can browse pets, register, or contact support@pethome.com for more help.";
      }
      
      setMessages(prev => [...prev, { type: 'bot', text: reply }]);
    }, 800);

    setInput('');
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-orange-500 hover:bg-orange-600 text-white rounded-full flex items-center justify-center shadow-2xl z-50 transition-all hover:scale-110"
      >
        🐾
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 bg-white rounded-3xl shadow-2xl overflow-hidden z-50 border border-gray-200">
          {/* Header */}
          <div className="bg-orange-500 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center text-2xl">
                🐾
              </div>
              <div>
                <p className="font-semibold">Pawly</p>
                <p className="text-xs opacity-90">PetHome Assistant</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-xl hover:bg-white/20 w-8 h-8 rounded-xl flex items-center justify-center">
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="h-96 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                    msg.type === 'user'
                      ? 'bg-orange-500 text-white rounded-br-none'
                      : 'bg-white shadow-sm rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-4 border-t bg-white">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about adoption, pets..."
                className="flex-1 border border-gray-300 rounded-2xl px-5 py-3 focus:outline-none focus:border-orange-500"
              />
              <button
                onClick={handleSend}
                className="bg-orange-500 text-white px-6 rounded-2xl hover:bg-orange-600 transition"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;