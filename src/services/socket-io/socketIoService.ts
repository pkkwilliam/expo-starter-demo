import {io, Socket} from 'socket.io-client';

export class SocketIoService {
  hostUrl: string = '';
  handlers: any;
  socket: Socket | any = null;

  constructor(hostUrl: string) {
    this.hostUrl = hostUrl;
  }

  initialConnection = (
    handlers: any = {
      onConnectedHandler: (connected: boolean) => {},
      systemHandler: () => {},
      privateSystemHandler: () => {},
    },
  ): any => {
    console.log('INITIALIZE');
    if (!this.socket) {
      this.socket = io(this.hostUrl, {
        transports: ['websocket'],
        timeout: 5000, // 5 seconds connection timeout
      });

      // Listen for successful connection
      this.socket.on('connect', () => {
        console.log('Connected to the server');
        handlers.onConnectedHandler(true);
      });

      // Listen for connection errors
      this.socket.on('connect_error', (err: any) => {
        console.error('Connection Error:', err);
        // Handle connection error (e.g., retry logic or display error message)
      });

      // Listen for connection timeout
      this.socket.on('connect_timeout', () => {
        console.error('Connection timed out');
        // Handle connection timeout (e.g., retry or notify user)
      });

      // Listen for generic errors
      this.socket.on('error', (err: any) => {
        console.error('Socket Error:', err);
        // Handle other types of errors
      });

      // Listen for disconnection
      this.socket.on('disconnect', (reason: any) => {
        console.log('Disconnected from server:', reason);
        if (reason === 'io server disconnect') {
          // The server disconnected the socket, attempt reconnection if needed
          this.socket.connect();
        }
      });

      this.socket.on('SYSTEM', (data: any) => {
        console.log('----- SYSTEM -----');
        handlers.systemHandler(data);
        console.log(data);
      });

      this.socket.on('PRIVATE_SYSTEM', (data: any) => {
        console.log('----- PRIVATE_SYSTEM -----');
        handlers.privateSystemHandler(data);
        console.log(data);
      });
    }
  };

  // Send an event to the server
  emitEvent = (eventName: any, data: any) => {
    if (this.socket) {
      this.socket.emit(eventName, data);
    }
  };

  // Register an event listener
  registerEventListener = (eventName: any, callback: any) => {
    if (this.socket) {
      this.socket.on(eventName, callback);
    }
  };

  // Unregister an event listener
  unregisterEventListener = (eventName: any) => {
    if (this.socket) {
      this.socket.off(eventName);
    }
  };

  // Manually disconnect the socket
  disconnect = (): any => {
    if (this.socket) {
      console.log('in disconnect');
      this.socket.disconnect();
      this.socket.removeAllListeners();
      this.socket = null;
    }
  };
}
