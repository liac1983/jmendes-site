import {defineArrayMember, defineField, defineType} from 'sanity'
import {materialCategories} from '../../../lib/material-categories'


const traducoes = defineField({
  name: 'traducoes',
  title: 'Traduções (opcional)',
  type: 'object',
  options: {collapsible: true, collapsed: true},
  description: 'Se ficar vazio, aparece o texto em português.',
  fields: (['en', 'fr', 'es'] as const).map((lang) =>
    defineField({
      name: lang,
      title: {en: 'Inglês', fr: 'Francês', es: 'Espanhol'}[lang],
      type: 'object',
      fields: [
        defineField({name: 'nome', title: 'Nome', type: 'string'}),
        defineField({name: 'descricao', title: 'Descrição', type: 'text', rows: 3}),
      ],
    }),
  ),
})

export const materialType = defineType({
  name: 'material',
  title: 'Tecidos e acabamentos',
  type: 'document',
  fields: [
    defineField({
      name: 'nome',
      title: 'Nome',
      type: 'string',
      description: 'Ex.: Veludo Bellagio, Carvalho natural, Mármore Calacatta',
      validation: (Rule) => Rule.required().min(2),
    }),
    defineField({
      name: 'categoria',
      title: 'Categoria',
      type: 'string',
      options: {list: materialCategories, layout: 'radio'},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'marca',
      title: 'Marca / fornecedor',
      type: 'string',
      description: 'Opcional. Ex.: Elastron',
    }),
    defineField({
      name: 'referencia',
      title: 'Referência',
      type: 'string',
      description: 'Código do catálogo, se existir. Aparece no pedido de orçamento.',
    }),
    defineField({
      name: 'descricao',
      title: 'Descrição',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'imagem',
      title: 'Imagem principal (textura)',
      type: 'image',
      options: {hotspot: true},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'cores',
      title: 'Cores disponíveis',
      type: 'array',
      description: 'Cada cor pode ter uma fotografia da amostra ou só a cor.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'cor',
          fields: [
            defineField({
              name: 'nome',
              title: 'Nome / referência da cor',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'imagem',
              title: 'Fotografia da amostra',
              type: 'image',
              options: {hotspot: true},
            }),
            defineField({
              name: 'hex',
              title: 'Cor (código, se não houver fotografia)',
              type: 'string',
              description: 'Ex.: #8B6A4B',
              validation: (Rule) =>
                Rule.regex(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, {name: 'código de cor'}),
            }),
          ],
          preview: {select: {title: 'nome', media: 'imagem', subtitle: 'hex'}},
        }),
      ],
    }),
    traducoes,
    defineField({
      name: 'ordem',
      title: 'Ordem',
      type: 'number',
      description: 'Números mais baixos aparecem primeiro.',
      initialValue: 100,
    }),
    defineField({
      name: 'visivel',
      title: 'Visível no site',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  orderings: [{title: 'Ordem', name: 'ordem', by: [{field: 'ordem', direction: 'asc'}]}],
  preview: {
    select: {title: 'nome', categoria: 'categoria', marca: 'marca', media: 'imagem'},
    prepare({title, categoria, marca, media}) {
      const cat = materialCategories.find((c) => c.value === categoria)?.title
      return {title, subtitle: [cat, marca].filter(Boolean).join(' · '), media}
    },
  },
})
