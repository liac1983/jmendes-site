import {projectType} from './project'
import {featuredProjectType} from './documents/featuredProject'
import {productLineType} from './documents/productLine'
import {catalogoType} from './documents/catalogo'
import {grupoRenderType} from './documents/grupoRender'
import {textoSiteType} from './documents/textoSite'
import {imagemSiteType} from './documents/imagemSite'
import {materialType} from './documents/material'

export const schemaTypes = [projectType, featuredProjectType, productLineType, catalogoType, grupoRenderType, materialType, textoSiteType, imagemSiteType]

export const schema = {
  types: schemaTypes,
}
