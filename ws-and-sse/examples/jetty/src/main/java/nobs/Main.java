package nobs;

import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.server.handler.DefaultHandler;

public class Main {
    public static void main(String[] args) {
        try {
            Server srv = new Server(8123);

            ChatWebSocketHandler chatWebSocketHandler = new ChatWebSocketHandler();
            chatWebSocketHandler.setHandler(new DefaultHandler());
            srv.setHandler(chatWebSocketHandler);

            srv.start();
            srv.join();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
