
const Message = require('./models/Message');

// Track active users per room
const roomUsers = {};

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('⚡ Client connected:', socket.id);

    // Join a specific room (e.g., 'course_101', 'global_chat')
    socket.on('join_room', (room) => {
      socket.join(room);
      
      // Update User Count
      if (!roomUsers[room]) roomUsers[room] = 0;
      roomUsers[room]++;
      
      // Emit updated count to everyone in room
      io.to(room).emit('room_data', { 
        room, 
        onlineCount: roomUsers[room] 
      });
      
      console.log(`User joined ${room}. Count: ${roomUsers[room]}`);
    });

    // Leave Room
    socket.on('leave_room', (room) => {
      socket.leave(room);
      if (roomUsers[room]) {
        roomUsers[room]--;
        io.to(room).emit('room_data', { 
            room, 
            onlineCount: roomUsers[room] 
        });
      }
    });

    // Handle Chat Messages
    socket.on('send_message', async (data) => {
      // data: { text, senderId, senderName, senderAvatar, room }
      try {
        // In a real app, save to DB here
        // const newMessage = await Message.create({ ... });
        
        // Broadcast to room
        io.to(data.room).emit('receive_message', {
          ...data,
          createdAt: new Date().toISOString()
        });
        
      } catch (err) {
        console.error('Message error:', err);
      }
    });

    // Handle Global Notifications (Admin only triggers this usually)
    socket.on('admin_notification', (data) => {
      socket.broadcast.emit('notification', {
        title: data.title,
        message: data.message,
        type: data.type || 'info'
      });
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
      // Cleanup user counts would be more complex in prod (need to track which rooms socket was in)
    });
  });
};
