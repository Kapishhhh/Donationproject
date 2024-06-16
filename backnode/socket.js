import { Server } from 'socket.io';
import { createServer } from 'http';
import dotenv from 'dotenv';
import User from './src/model/Userprofile.js';
import Post from './src/model/Post.js';
import Notification from "./src/model/Notification.js";



dotenv.config();


const initializeSocket = (app) => {
   
  const httpServer = createServer(app);

  const io = new Server(httpServer, {
    cors: {
      origin:"http://localhost:5173", // Replace with your frontend URL
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });

  io.on('connection', (socket) => {
    
    console.log('A user connected');
    // io.emit("notification",'testing connection')
    socket.on('notification', async ({postId,userId})=>{
      console.log(userId,'sender user id')
      
      const post = await Post.findById(postId)
      console.log(post,'user post')

      const user = await User.findById(userId)

      const postUserId = post.userId._id.toString()
      console.log(postUserId,'receiver user id')

      if (postUserId !== userId) {
         const notification = new Notification({
             sender: userId,
             receiver: postUserId,
             type: 'comment',
             message: `${user.username} commented on your post`,
             postId:postId
         });
         console.log(notification,'notification to send user and save')
         await notification.save();
   
         io.to(postUserId).emit('notification', notification);
        // console.log(postId,'post id')
        // io.emit('notification',postId)
      }
    })
  

    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });

  return io;
};

export default initializeSocket;


