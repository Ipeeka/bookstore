import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
        credentials: true,
    },
    transports: ['websocket', 'polling'],
})
export class NotificationService {
    @WebSocketServer() server: Server;

    sendNotificationToAdmin(notification: any) {
        this.server.emit('adminNotification', notification);
    }
}
