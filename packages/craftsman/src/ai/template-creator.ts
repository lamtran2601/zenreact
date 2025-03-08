import { type Template } from '../templates/types.js';
import { AIAnalyzer, type ComponentAnalysis } from './analyzer.js';
import { InMemoryTemplateStore } from '../templates/store.js';

export class TemplateCreator {
  private analyzer: AIAnalyzer;

  constructor() {
    this.analyzer = new AIAnalyzer();
  }

  private generateId(analysis: ComponentAnalysis): string {
    return InMemoryTemplateStore.normalizeId(analysis.purpose);
  }

  private createValidation(analysis: ComponentAnalysis): Record<string, unknown> {
    return {
      requiredProps: analysis.props.filter((p) => p.required).map((p) => p.name),
      allowChildren: analysis.structure.children,
    };
  }

  async createFromDescription(description: string): Promise<Template> {
    // 1. Analyze the component requirements
    const analysis = await this.analyzer.analyzeComponent(description);

    // 2. Extract specific requirements
    const requirements = await this.analyzer.extractRequirements(description);

    // 3. Get style suggestions
    const additionalStyles = await this.analyzer.suggestStyles(requirements);

    // 4. Create the template
    return {
      id: this.generateId(analysis),
      structure: {
        tag: analysis.structure.tag,
        baseClasses: [...analysis.structure.className, ...additionalStyles],
        children: analysis.structure.children,
      },
      props: analysis.props,
      validation: this.createValidation(analysis),
    };
  }

  async createFromAnalysis(analysis: ComponentAnalysis): Promise<Template> {
    return {
      id: this.generateId(analysis),
      structure: {
        tag: analysis.structure.tag,
        baseClasses: analysis.structure.className,
        children: analysis.structure.children,
      },
      props: analysis.props,
      validation: this.createValidation(analysis),
    };
  }

  /**
   * Creates a template for a product card component as an example
   */
  createProductCardTemplate(): Template {
    return {
      id: 'product-card',
      structure: {
        tag: 'div',
        baseClasses: ['card', 'card-compact', 'shadow-lg', 'bg-base-100'],
        children: false,
      },
      props: [
        {
          name: 'title',
          type: 'string',
          required: true,
          description: 'Product title',
        },
        {
          name: 'price',
          type: 'number',
          required: true,
          description: 'Product price',
        },
        {
          name: 'image',
          type: 'string',
          required: false,
          description: 'Product image URL',
        },
        {
          name: 'onBuy',
          type: '() => void',
          required: false,
          description: 'Called when buy button is clicked',
        },
      ],
      validation: {
        requiredProps: ['title', 'price'],
        allowChildren: false,
      },
    };
  }
}
