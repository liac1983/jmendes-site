import type {StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Conteúdo')
    .items([
      S.listItem()
        .title('Projetos do Portefólio')
        .schemaType('project')
        .child(
          S.documentTypeList('project')
            .title('Projetos do Portefólio')
        ),

      S.listItem()
        .title('Projetos em Destaque')
        .schemaType('featuredProject')
        .child(
          S.documentTypeList('featuredProject')
            .title('Projetos em Destaque')
            .defaultOrdering([{field: 'order', direction: 'asc'}])
        ),

      S.listItem()
        .title('Produtos das Linhas')
        .schemaType('productLine')
        .child(
          S.documentTypeList('productLine')
            .title('Produtos das Linhas')
            .defaultOrdering([{field: 'orderRank', direction: 'asc'}])
        ),

      S.listItem()
        .title('Catálogos')
        .schemaType('catalogo')
        .child(
          S.documentTypeList('catalogo')
            .title('Catálogos')
            .defaultOrdering([{field: 'dataPublicacao', direction: 'desc'}])
        ),

      S.listItem()
        .title('Renders')
        .schemaType('grupoRender')
        .child(
          S.documentTypeList('grupoRender')
            .title('Renders')
            .defaultOrdering([{field: 'ordem', direction: 'asc'}])
        ),

      S.listItem()
        .title('Tecidos e acabamentos')
        .schemaType('material')
        .child(
          S.documentTypeList('material')
            .title('Tecidos e acabamentos')
            .defaultOrdering([{field: 'ordem', direction: 'asc'}])
        ),

      S.divider(),

      S.listItem()
        .title('Textos do site')
        .schemaType('textoSite')
        .child(S.documentTypeList('textoSite').title('Textos do site')),

      S.listItem()
        .title('Imagens do site')
        .schemaType('imagemSite')
        .child(S.documentTypeList('imagemSite').title('Imagens do site')),
    ])
