export class WebSocketManager {
    private static instance: WebSocketManager;
    public socket: WebSocket;

    private constructor(url: string) {
        this.socket = new WebSocket(url);
        this.configureSocket();
    }

    public static getInstance(url: string): WebSocketManager {
        if (!WebSocketManager.instance) {
            WebSocketManager.instance = new WebSocketManager(url);
        }
        return WebSocketManager.instance;
    }

    private configureSocket() {
        this.socket.onopen = (event) => {
            console.log('WebSocket Open', event);
        };
        this.socket.onmessage = (event) => {
            console.log('WebSocket Message', event.data);
        };
        this.socket.onerror = (event) => {
            console.error('WebSocket Error', event);
        };
        this.socket.onclose = (event) => {
            console.log('WebSocket Closed', event);
        };
    }

    public sendMessage(message: string) {
        if (this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(message);
        } else {
            console.error('WebSocket is not open.');
        }
    }

    // Можно добавить дополнительные методы для обработки событий WebSocket
}
