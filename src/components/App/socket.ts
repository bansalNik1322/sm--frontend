// import { io, Socket } from 'socket.io-client';

// class SocketService {
//   private socket: Socket | null = null;
//   url = 'http://localhost:8080';

//   connect = (options: Record<string, unknown> = {}): void => {
//     if (!this.socket) {
//       this.socket = io(this.url, options);

//       console.log('🚀 ~ SocketService ~ this.socket.on ~ this.socket?.id2:', this.socket?.id);
//       this.socket.on('connect', () => {
//         console.log('🚀 ~ SocketService ~ this.socket.on ~ id:', this.socket?.id);
//       });

//       this.socket.on('disconnect', () => {
//         console.log('��� ~ SocketService ~ this.socket.on ~ disconnect');
//       });

//       this.socket.on('connect_error', (err: Error) => {
//         console.error('Socket connection error:', err);
//       });
//     }
//   };

//   emit = (event: string, data: unknown): void => {
//     if (this.socket) {
//       this.socket.emit(event, data);
//     } else {
//       console.error('Socket is not initialized. Call connect() first.');
//     }
//   };

//   on<T>(event: string, callback: (data: T) => void): void {
//     if (this.socket) {
//       this.socket.on(event, callback);
//     } else {
//       console.error('Socket is not initialized. Call connect() first.');
//     }
//   }

//   off(event: string, callback?: (data: unknown) => void): void {
//     if (this.socket) {
//       this.socket.off(event, callback);
//     } else {
//       console.error('Socket is not initialized. Call connect() first.');
//     }
//   }

//   disconnect(): void {
//     if (this.socket) {
//       this.socket.disconnect();
//       this.socket = null;
//     }
//   }
// }

// const socketService = new SocketService();
// export default socketService;
