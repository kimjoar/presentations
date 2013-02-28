package nobs;

import javax.servlet.http.HttpServletRequest;

import org.eclipse.jetty.websocket.WebSocket;
import org.eclipse.jetty.websocket.WebSocketHandler;

import java.io.IOException;
import java.util.Set;
import java.util.concurrent.CopyOnWriteArraySet;

public class ChatWebSocketHandler extends WebSocketHandler {

    private final Set<ChatWebSocket> webSockets = new CopyOnWriteArraySet<ChatWebSocket>();

    @Override
    public WebSocket doWebSocketConnect(HttpServletRequest request, String protocol) {
        return new ChatWebSocket();
    }

    private class ChatWebSocket implements WebSocket.OnTextMessage {

        private Connection connection;

        public void onOpen(Connection connection) {
            System.out.println("opening connection");

            this.connection = connection;

            webSockets.add(this);
        }

        public void onMessage(String data) {
            System.out.println("message received");

            try {
                for (ChatWebSocket webSocket : webSockets) {
                    // send a message to the current client WebSocket.
                    webSocket.connection.sendMessage(data);
                }
            } catch (IOException x) {
                // Error was detected, close the ChatWebSocket client side
                this.connection.close();
            }

        }

        public void onClose(int closeCode, String message) {
            // Remove ChatWebSocket in the global list of ChatWebSocket
            // instance.
            webSockets.remove(this);
        }
    }

}
