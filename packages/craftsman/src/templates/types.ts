export interface PropDefinition {
  name: string;
  type: string;
  required: boolean;
  defaultValue?: unknown;
  description?: string;
}

export interface ComponentStructure {
  tag: string;
  baseClasses: string[];
  variants?: Record<string, string[]>;
  children?: boolean;
}

export interface Template {
  id: string;
  structure: ComponentStructure;
  props: PropDefinition[];
  validation?: Record<string, unknown>;
}

export interface TemplateStore {
  get(id: string): Promise<Template | null>;
  set(id: string, template: Template): Promise<void>;
  has(id: string): Promise<boolean>;
  delete(id: string): Promise<boolean>;
}

// Common structure used in requests
export interface ComponentStructureRequest {
  tag?: string;
  baseClasses?: string[];
  children?: boolean;
}
