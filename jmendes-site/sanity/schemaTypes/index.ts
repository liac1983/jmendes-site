import {projectType} from './project'
import {featuredProjectType} from './documents/featuredProject'
import {productLineType} from './documents/productLine'
import {catalogoType} from './documents/catalogo'

export const schemaTypes = [projectType, featuredProjectType, productLineType, catalogoType]

export const schema = {
  types: schemaTypes,
}
