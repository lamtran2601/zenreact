#!/usr/bin/env node
import {
  Server,
  StdioServerTransport,
  CallToolRequestSchema,
  ErrorCode,
  ListToolsRequestSchema,
  McpError,
  type ToolResponse,
  type ToolRequest,
} from '@modelcontextprotocol/sdk';
import { ComponentGenerator, type GenerateRequest } from './templates/generator.js';

// Extend GenerateRequest to include variant
interface ComponentRequest extends GenerateRequest {
  variant?: string;
}

class CraftsmanServer {
  private server: Server;
  private generator: ComponentGenerator;

  constructor() {
    this.server = new Server(
      {
        name: 'craftsman',
        version: '0.1.0',
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.generator = new ComponentGenerator();

    this.setupHandlers();

    // Error handling
    this.server.onerror = (error: Error) => console.error('[Craftsman Error]', error);
    process.on('SIGINT', async () => {
      await this.server.close();
      process.exit(0);
    });
  }

  private setupHandlers(): void {
    // List available tools
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: [
        {
          name: 'generate_component',
          description: 'Generate a React component with DaisyUI integration',
          inputSchema: {
            type: 'object',
            properties: {
              description: {
                type: 'string',
                description: 'Natural language description of the component',
              },
              type: {
                type: 'string',
                description: 'Component type (for standard components)',
              },
              variant: {
                type: 'string',
                description: 'Component variant (e.g. primary, secondary)',
              },
              props: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    name: { type: 'string' },
                    type: { type: 'string' },
                    required: { type: 'boolean' },
                    description: { type: 'string' },
                  },
                  required: ['name', 'type', 'required'],
                },
                description: 'Component props configuration',
              },
              structure: {
                type: 'object',
                properties: {
                  tag: { type: 'string' },
                  baseClasses: {
                    type: 'array',
                    items: { type: 'string' },
                  },
                  children: { type: 'boolean' },
                },
                description: 'Component structure configuration',
              },
            },
          },
        },
      ],
    }));

    // Handle component generation requests
    this.server.setRequestHandler(
      CallToolRequestSchema,
      async (request: ToolRequest): Promise<ToolResponse> => {
        if (request.params.name !== 'generate_component') {
          throw new McpError(ErrorCode.MethodNotFound, `Unknown tool: ${request.params.name}`);
        }

        try {
          const componentRequest = request.params.arguments as ComponentRequest;

          // Add variant to baseClasses if specified
          if (componentRequest.variant && componentRequest.structure?.baseClasses) {
            componentRequest.structure.baseClasses.push(componentRequest.variant);
          }

          const component = await this.generator.generate(componentRequest);

          return {
            content: [
              {
                type: 'text',
                text: component,
              },
            ],
          };
        } catch (error: unknown) {
          const errorMessage = error instanceof Error ? error.message : String(error);
          throw new McpError(
            ErrorCode.InternalError,
            `Failed to generate component: ${errorMessage}`
          );
        }
      }
    );
  }

  async run(): Promise<void> {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('Craftsman MCP server running on stdio');
  }
}

// Start server
const server = new CraftsmanServer();
server.run().catch((error: Error) => console.error(error));
