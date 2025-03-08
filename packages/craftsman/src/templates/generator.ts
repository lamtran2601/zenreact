import { type Template, type ComponentStructure, type PropDefinition } from './types.js';
import { InMemoryTemplateStore } from './store.js';
import { TemplateCreator } from '../ai/template-creator.js';

export interface GenerateRequest {
  description?: string;
  type?: string;
  props?: PropDefinition[];
  structure?: {
    tag?: string;
    baseClasses?: string[];
    children?: boolean;
  };
}

export class ComponentGenerator {
  private store: InMemoryTemplateStore;
  private templateCreator: TemplateCreator;

  constructor() {
    this.store = new InMemoryTemplateStore();
    this.templateCreator = new TemplateCreator();
  }

  private formatComponentName(name: string): string {
    return name
      .split('-')
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join('');
  }

  private generateProps(props: PropDefinition[]): string {
    return props
      .map((prop) => {
        const type = prop.type === 'ReactNode' ? 'React.ReactNode' : prop.type;
        return `${prop.name}${prop.required ? '' : '?'}: ${type}`;
      })
      .join(',\n  ');
  }

  private generateContent(structure: ComponentStructure): string {
    const { tag, children } = structure;
    const content = [];

    // Add children if supported
    if (children) {
      content.push('{children}');
    }

    // Generate base structure based on tag type
    switch (tag) {
      case 'button':
        content.push('{props.label || children}');
        break;
      case 'input':
        // No content for input tags
        break;
      case 'div':
      default:
        // For container elements, just use children if available
        if (!children) {
          content.push('{/* Content */}');
        }
    }

    return content.join('\n');
  }

  async generateComponent(template: Template): Promise<string> {
    const componentName = this.formatComponentName(template.id);
    const propsInterface = `interface ${componentName}Props {
  ${this.generateProps(template.props)}
  className?: string;
}`;

    const component = `import React from 'react';

${propsInterface}

export const ${componentName}: React.FC<${componentName}Props> = ({
  ${template.props.map((p) => p.name).join(',\n  ')},
  className,
  ${template.structure.children ? 'children,' : ''}
  ...props
}) => (
  <${template.structure.tag}
    className={\`${template.structure.baseClasses.join(' ')} \${className || ''}\`}
    {...props}
  >
    ${this.generateContent(template.structure)}
  </${template.structure.tag}>
);
`;

    return component;
  }

  async generate(request: GenerateRequest): Promise<string> {
    const id = request.type || InMemoryTemplateStore.normalizeId(request.description || '');

    // Check if we have a cached template
    const existingTemplate = await this.store.get(id);
    if (existingTemplate) {
      return this.generateComponent(existingTemplate);
    }

    // Create a new template using AI
    const template = request.description
      ? await this.templateCreator.createFromDescription(request.description)
      : this.templateCreator.createProductCardTemplate(); // Fallback to example template

    // Cache the template
    await this.store.set(id, template);

    return this.generateComponent(template);
  }
}
