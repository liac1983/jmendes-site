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
        .title('Produtos das Linhas')
        .schemaType('productLine')
        .child(
          S.documentTypeList('productLine')
            .title('Produtos das Linhas')
            .defaultOrdering([{field: 'orderRank', direction: 'asc'}])
        ),
    ])