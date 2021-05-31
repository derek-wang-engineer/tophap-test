export default {
  type: 'object',
  properties: {
    bedsCount: {
      type: 'number'
    },
    bathsDecimal: {
      type: 'number'
    }
  },
  required: [
    'bedsCount',
    'bathsDecimal'
  ]
} as const;
