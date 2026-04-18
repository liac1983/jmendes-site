import {projectType} from './project'
import {productLineType} from './documents/productLine'

export const schemaTypes = [projectType, productLineType]

export const schema = {
  types: schemaTypes,
}
