import { type Template, type TemplateStore } from './types.js';

export class InMemoryTemplateStore implements TemplateStore {
  private templates: Map<string, Template>;

  constructor() {
    this.templates = new Map();
  }

  async get(id: string): Promise<Template | null> {
    const template = this.templates.get(id);
    return template || null;
  }

  async set(id: string, template: Template): Promise<void> {
    this.templates.set(id, template);
  }

  async has(id: string): Promise<boolean> {
    return this.templates.has(id);
  }

  async delete(id: string): Promise<boolean> {
    return this.templates.delete(id);
  }

  // Helper method to generate a normalized ID from a description
  static normalizeId(description: string): string {
    return description
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');
  }
}
