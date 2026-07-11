import {projectType} from './project'
import {featuredProjectType} from './documents/featuredProject'
import {productLineType} from './documents/productLine'
import {catalogoType} from './documents/catalogo'
import {grupoRenderType} from './documents/grupoRender'

export const schemaTypes = [projectType, featuredProjectType, productLineType, catalogoType, grupoRenderType]

export const schema = {
  types: schemaTypes,
}
