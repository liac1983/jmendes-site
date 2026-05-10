import {projectType} from './project'
import {featuredProjectType} from './documents/featuredProject'
import {productLineType} from './documents/productLine'

export const schemaTypes = [projectType, featuredProjectType, productLineType]

export const schema = {
  types: schemaTypes,
}
