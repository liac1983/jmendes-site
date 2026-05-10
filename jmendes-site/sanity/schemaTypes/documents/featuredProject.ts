import {defineField, defineType} from 'sanity'

const translationLocales = [
  {name: 'en', title: 'Inglês'},
  {name: 'fr', title: 'Francês'},
  {name: 'es', title: 'Espanhol'},
]

const styleVariants = [
  {title: 'Blend - claro e acolhedor', value: 'blend'},
  {title: 'Mavrommatis - clássico contemporâneo', value: 'mavrommatis'},
  {title: 'Mr Chow - vermelho cinematográfico', value: 'mr-chow'},
  {title: 'Poissonchat - luminoso e fluido', value: 'poissonchat'},
  {title: 'Sense - orgânico e intimista', value: 'sense'},
]

const factFields = [
  defineField({
    name: 'label',
    title: 'Etiqueta',
    type: 'string',
  }),
  defineField({
    name: 'value',
    title: 'Valor',
    type: 'string',
  }),
]

function translatedFeaturedProjectFields(localeTitle: string) {
  return [
    defineField({
      name: 'title',
      title: `Título (${localeTitle})`,
      type: 'string',
    }),
    defineField({
      name: 'categoryLabel',
      title: `Categoria (${localeTitle})`,
      type: 'string',
    }),
    defineField({
      name: 'subtitle',
      title: `Subtítulo (${localeTitle})`,
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'location',
      title: `Localização (${localeTitle})`,
      type: 'string',
    }),
    defineField({
      name: 'intro',
      title: `Introdução (${localeTitle})`,
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'description',
      title: `Descrição (${localeTitle})`,
      type: 'text',
      rows: 5,
    }),
    defineField({
      name: 'conceptTitle',
      title: `Título do conceito (${localeTitle})`,
      type: 'string',
    }),
    defineField({
      name: 'conceptText',
      title: `Texto do conceito (${localeTitle})`,
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'facts',
      title: `Detalhes rápidos (${localeTitle})`,
      type: 'array',
      of: [{type: 'object', fields: factFields}],
    }),
    defineField({
      name: 'highlights',
      title: `Destaques (${localeTitle})`,
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'materials',
      title: `Materiais (${localeTitle})`,
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'finishes',
      title: `Acabamentos (${localeTitle})`,
      type: 'array',
      of: [{type: 'string'}],
    }),
  ]
}

function imageWithAltField() {
  return {
    type: 'image' as const,
    options: {hotspot: true},
    fields: [
      defineField({
        name: 'alt',
        title: 'Texto alternativo',
        type: 'string',
      }),
    ],
  }
}

export const featuredProjectType = defineType({
  name: 'featuredProject',
  title: 'Projetos em Destaque',
  type: 'document',
  initialValue: {
    categoryLabel: 'Restauração',
    published: true,
    order: 100,
    styleVariant: 'blend',
  },
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: (Rule) => Rule.required().min(3),
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'categoryLabel',
      title: 'Categoria',
      type: 'string',
      initialValue: 'Restauração',
    }),

    defineField({
      name: 'subtitle',
      title: 'Subtítulo',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'location',
      title: 'Localização',
      type: 'string',
    }),

    defineField({
      name: 'year',
      title: 'Ano',
      type: 'string',
    }),

    defineField({
      name: 'styleVariant',
      title: 'Design da Página',
      type: 'string',
      description:
        'Controla a composição e a paleta da página de detalhe deste projeto.',
      options: {
        list: styleVariants,
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'translations',
      title: 'Traduções',
      type: 'object',
      description:
        'Textos opcionais por idioma. Quando um campo fica vazio, o site usa o texto base em português.',
      options: {
        collapsible: true,
        collapsed: true,
      },
      fields: translationLocales.map((locale) =>
        defineField({
          name: locale.name,
          title: locale.title,
          type: 'object',
          options: {
            collapsible: true,
            collapsed: true,
          },
          fields: translatedFeaturedProjectFields(locale.title),
        })
      ),
    }),

    defineField({
      name: 'heroImage',
      title: 'Imagem Principal',
      ...imageWithAltField(),
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'cardImage',
      title: 'Imagem do Card',
      description:
        'Opcional. Quando fica vazio, o site usa a imagem principal no card da Home.',
      ...imageWithAltField(),
    }),

    defineField({
      name: 'overviewImage',
      title: 'Imagem de Introdução',
      ...imageWithAltField(),
    }),

    defineField({
      name: 'gallery',
      title: 'Galeria',
      type: 'array',
      of: [imageWithAltField()],
    }),

    defineField({
      name: 'intro',
      title: 'Introdução',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'description',
      title: 'Descrição',
      type: 'text',
      rows: 5,
    }),

    defineField({
      name: 'conceptTitle',
      title: 'Título do Conceito',
      type: 'string',
    }),

    defineField({
      name: 'conceptText',
      title: 'Texto do Conceito',
      type: 'text',
      rows: 4,
    }),

    defineField({
      name: 'facts',
      title: 'Detalhes Rápidos',
      type: 'array',
      of: [{type: 'object', fields: factFields}],
      validation: (Rule) => Rule.max(4),
    }),

    defineField({
      name: 'highlights',
      title: 'Destaques',
      type: 'array',
      of: [{type: 'string'}],
    }),

    defineField({
      name: 'materials',
      title: 'Materiais',
      type: 'array',
      of: [{type: 'string'}],
    }),

    defineField({
      name: 'finishes',
      title: 'Acabamentos',
      type: 'array',
      of: [{type: 'string'}],
    }),

    defineField({
      name: 'published',
      title: 'Publicado',
      type: 'boolean',
      initialValue: true,
    }),

    defineField({
      name: 'order',
      title: 'Ordem',
      type: 'number',
      validation: (Rule) => Rule.integer().min(1),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'categoryLabel',
      media: 'heroImage',
    },
  },
})
