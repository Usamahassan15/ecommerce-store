import { type SchemaTypeDefinition } from 'sanity'

import { Category } from './category'
import { Product } from './product'




export const schema: { types: SchemaTypeDefinition[] } = {
  types: [Product,Category],
}
