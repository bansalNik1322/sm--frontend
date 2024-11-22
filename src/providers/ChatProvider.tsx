'use client';
import { createContext, FC, useContext, useState } from 'react';

interface ChatContextType {
  chat: string;
  setChat: (chat: string) => void;
}
export const ChatContext = createContext<ChatContextType | undefined>(undefined);

interface ChatProviderProps {
  children: React.ReactNode;
}

export const ChatProvider: FC<ChatProviderProps> = ({ children }) => {
  const [chat, setChat] = useState('');

  return <ChatContext.Provider value={{ chat, setChat }}>{children}</ChatContext.Provider>;
};

export const useChat = (): ChatContextType => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};
