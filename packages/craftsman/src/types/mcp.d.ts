declare module '@modelcontextprotocol/sdk' {
  export class Server {
    constructor(
      info: { name: string; version: string },
      config: { capabilities: { tools: Record<string, unknown> } }
    );
    setRequestHandler<T = unknown, R = unknown>(
      schema: unknown,
      handler: (request: T) => Promise<R>
    ): void;
    connect(transport: StdioServerTransport): Promise<void>;
    close(): Promise<void>;
    onerror: (error: Error) => void;
  }

  export class StdioServerTransport {
    constructor();
  }

  export const CallToolRequestSchema: unique symbol;
  export const ListToolsRequestSchema: unique symbol;

  export enum ErrorCode {
    InternalError = 'INTERNAL_ERROR',
    MethodNotFound = 'METHOD_NOT_FOUND',
    InvalidRequest = 'INVALID_REQUEST',
  }

  export class McpError extends Error {
    constructor(code: ErrorCode, message: string);
    code: ErrorCode;
  }

  export interface ToolRequest {
    params: {
      name: string;
      arguments: unknown;
    };
  }

  export interface ToolResponse {
    content: Array<{
      type: string;
      text: string;
    }>;
  }
}
