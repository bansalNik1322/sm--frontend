'use client';
import React, { createContext, ReactNode, useCallback, useContext, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';

interface SocketContextType {
  socket: Socket;
}

export const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const useSocket = (): Socket => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context.socket;
};

interface SocketProviderProps {
  children: ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const socket = io(process.env.NEXT_PUBLIC_SOCKET_BACKEND as string);

  const handleSocketConnection = useCallback(() => {
    socket.on('connect', () => {
      console.log('Connection successful', socket.id);
    });
  }, [socket]);

  useEffect(() => {
    handleSocketConnection();

    return () => {
      socket.off('connect');
    };
  }, [handleSocketConnection, socket]);

  return <SocketContext.Provider value={{ socket }}>{children}</SocketContext.Provider>;
};
