import type { Template } from '../types.js';

export const testButtonTemplate: Template = {
  id: 'test-button',
  structure: {
    tag: 'button',
    baseClasses: ['btn', 'btn-primary'],
    children: true,
  },
  props: [
    {
      name: 'label',
      type: 'string',
      required: false,
      description: 'Button label text',
    },
    {
      name: 'onClick',
      type: '() => void',
      required: false,
      description: 'Click handler',
    },
    {
      name: 'disabled',
      type: 'boolean',
      required: false,
      description: 'Whether the button is disabled',
    },
  ],
  validation: {
    requiredProps: [],
    allowChildren: true,
  },
};
