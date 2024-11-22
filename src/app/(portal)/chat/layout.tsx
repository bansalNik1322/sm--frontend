import React from 'react';

import { ChatProvider } from '@/providers/ChatProvider';
import { SocketProvider } from '@/providers/SocketProvider';
const ChatLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <SocketProvider>
      <ChatProvider>{children}</ChatProvider>
    </SocketProvider>
  );
};

export default ChatLayout;
