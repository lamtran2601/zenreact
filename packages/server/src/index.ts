import express from 'express';
import { Server as WebSocketServer } from 'ws';
import { createServer } from 'http';
import { MetricsServerOptions, MetricsUpdate, WebSocketClient } from './types';

export class MetricsServer {
  private wss: WebSocketServer;
  private readonly options: Required<MetricsServerOptions>;
  private clients: Set<WebSocketClient> = new Set();

  constructor(options: MetricsServerOptions = {}) {
    this.options = {
      port: options.port || 3001,
      path: options.path || '/metrics',
      maxClients: options.maxClients || 100,
      enableCompression: options.enableCompression ?? true,
    };

    const app = express();
    const server = createServer(app);

    // Create WebSocket server
    this.wss = new WebSocketServer({
      server,
      path: this.options.path,
      maxPayload: 1024 * 1024, // 1MB max message size
      perMessageDeflate: this.options.enableCompression,
    });

    this.setupWebSocketServer();

    // Start HTTP server
    server.listen(this.options.port, () => {
      console.log(`Metrics server listening on port ${this.options.port}`);
    });
  }

  /**
   * Broadcast metrics update to all connected clients
   */
  public broadcast(update: MetricsUpdate): void {
    const message = JSON.stringify(update);
    this.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  }

  /**
   * Stop the metrics server
   */
  public stop(): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        // Close all client connections
        this.clients.forEach((client) => {
          client.close();
        });
        this.clients.clear();

        // Close WebSocket server
        this.wss.close((err: Error | undefined) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  private setupWebSocketServer(): void {
    this.wss.on('connection', (ws: WebSocketClient) => {
      // Check max clients limit
      if (this.clients.size >= this.options.maxClients) {
        ws.close(1013, 'Maximum number of clients reached');
        return;
      }

      // Add to clients set
      this.clients.add(ws);

      // Setup connection handlers
      ws.on('close', () => {
        this.clients.delete(ws);
      });

      ws.on('error', (error: Error) => {
        this.handleWsError(error);
        ws.close();
        this.clients.delete(ws);
      });

      // Handle incoming metrics from client
      ws.on('message', (data: string) => {
        try {
          const message = JSON.parse(data) as MetricsUpdate;

          // Validate message structure
          if (!this.isValidMetricsUpdate(message)) {
            console.warn('Invalid metrics update received:', message);
            return;
          }

          // Process metrics
          this.handleMetrics(message);

          // Broadcast to other clients
          this.broadcastToOthers(ws, message);
        } catch (error) {
          console.error('Error processing metrics message:', error);
        }
      });

      // Send initial connection success message
      ws.send(JSON.stringify({ type: 'connected' }));
    });

    this.wss.on('error', (error: Error) => {
      this.handleWsError(error);
    });
  }

  private isValidMetricsUpdate(message: unknown): message is MetricsUpdate {
    if (!message || typeof message !== 'object') {
      return false;
    }

    const msg = message as Record<string, unknown>;

    return (
      'type' in msg &&
      typeof msg.type === 'string' &&
      ['render', 'memory', 'network', 'custom'].includes(msg.type) &&
      'timestamp' in msg &&
      typeof msg.timestamp === 'number' &&
      'metric' in msg &&
      typeof msg.metric === 'object' &&
      msg.metric !== null
    );
  }

  private handleMetrics(update: MetricsUpdate): void {
    // Here you could add additional processing logic like:
    // - Storing metrics in a database
    // - Aggregating metrics
    // - Triggering alerts based on thresholds
    // - etc.

    // For now, we'll just log the metrics
    console.log(`Received ${update.type} metrics:`, update.metric);
  }

  private broadcastToOthers(sender: WebSocketClient, update: MetricsUpdate): void {
    const message = JSON.stringify(update);
    this.clients.forEach((client) => {
      if (client !== sender && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  }

  private handleWsError(error: Error): void {
    console.error('WebSocket error:', error);
  }
}

// Export types
export * from './types';
