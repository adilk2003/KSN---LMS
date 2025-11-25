
import io from 'socket.io-client';

const SOCKET_URL = 'http://localhost:5000';

class SocketService {
  constructor() {
    this.socket = null;
  }

  connect() {
    if (!this.socket) {
      this.socket = io(SOCKET_URL);
      console.log('🔌 Connecting to socket...');
    }
    return this.socket;
  }

  joinRoom(room) {
    if (this.socket) {
      this.socket.emit('join_room', room);
    }
  }

  leaveRoom(room) {
    if (this.socket) {
      this.socket.emit('leave_room', room);
    }
  }

  sendMessage(data) {
    if (this.socket) {
      this.socket.emit('send_message', data);
    }
  }

  subscribeToMessages(cb) {
    if (!this.socket) return;
    this.socket.on('receive_message', (msg) => {
      cb(msg);
    });
  }

  subscribeToRoomData(cb) {
    if (!this.socket) return;
    this.socket.on('room_data', (data) => {
      cb(data);
    });
  }
  
  subscribeToNotifications(cb) {
    if(!this.socket) return;
    this.socket.on('notification', (data) => {
        cb(data);
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }
}

export const socketService = new SocketService();
