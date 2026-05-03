import {defineField, defineType} from 'sanity'

const translationLocales = [
  {name: 'en', title: 'Inglês'},
  {name: 'fr', title: 'Francês'},
  {name: 'es', title: 'Espanhol'},
]

function translatedProductLineFields(localeTitle: string) {
  return [
    defineField({
      name: 'title',
      title: `Título (${localeTitle})`,
      type: 'string',
    }),
    defineField({
      name: 'subtitle',
      title: `Subtítulo (${localeTitle})`,
      type: 'string',
      validation: (Rule) => Rule.max(120),
    }),
    defineField({
      name: 'aboutText',
      title: `Texto "Sobre o Modelo" (${localeTitle})`,
      type: 'text',
      rows: 6,
    }),
    defineField({
      name: 'highlights',
      title: `Destaques da listagem (${localeTitle})`,
      type: 'array',
      of: [{type: 'string'}],
      validation: (Rule) => Rule.max(6),
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
    defineField({
      name: 'dimensions',
      title: `Dimensões (${localeTitle})`,
      type: 'object',
      fields: [
        defineField({
          name: 'width',
          title: 'Largura',
          type: 'string',
        }),
        defineField({
          name: 'height',
          title: 'Altura',
          type: 'string',
        }),
        defineField({
          name: 'depth',
          title: 'Profundidade',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'technicalFeatures',
      title: `Ficha Técnica (${localeTitle})`,
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'advantages',
      title: `Vantagens (${localeTitle})`,
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'idealFor',
      title: `Ideal Para (${localeTitle})`,
      type: 'array',
      of: [{type: 'string'}],
    }),
  ]
}

export const productLineType = defineType({
  name: 'productLine',
  title: 'Produtos das Linhas',
  type: 'document',
  initialValue: {
    availability: 'available',
    isActive: true,
    orderRank: 100,
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
      name: 'category',
      title: 'Categoria',
      type: 'string',
      options: {
        list: [
          {title: 'Cozinhas Modulares', value: 'cozinhas-modulares'},
          {title: 'Roupeiros Modulares', value: 'roupeiros-modulares'},
          {title: 'Mobiliário de Sala', value: 'mobiliario-de-sala'},
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'availability',
      title: 'Disponibilidade',
      type: 'string',
      options: {
        list: [
          {title: 'Disponível', value: 'available'},
          {title: 'Indisponível', value: 'unavailable'},
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'subtitle',
      title: 'Subtítulo',
      type: 'string',
      validation: (Rule) => Rule.required().max(120),
    }),

    defineField({
      name: 'aboutText',
      title: 'Texto "Sobre o Modelo"',
      type: 'text',
      rows: 6,
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
          fields: translatedProductLineFields(locale.title),
        })
      ),
    }),

    defineField({
      name: 'heroImage',
      title: 'Imagem principal',
      type: 'image',
      options: {hotspot: true},
      validation: (Rule) => Rule.required(),
      fields: [
        defineField({
          name: 'alt',
          title: 'Texto alternativo',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),

    defineField({
      name: 'aboutImage',
      title: 'Imagem da secção Sobre',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Texto alternativo',
          type: 'string',
        }),
      ],
    }),

    defineField({
      name: 'gallery',
      title: 'Galeria',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {hotspot: true},
          fields: [
            defineField({
              name: 'alt',
              title: 'Texto alternativo',
              type: 'string',
            }),
          ],
        },
      ],
    }),

    defineField({
      name: 'highlights',
      title: 'Destaques da listagem',
      type: 'array',
      of: [{type: 'string'}],
      validation: (Rule) => Rule.max(6),
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
      name: 'dimensions',
      title: 'Dimensões',
      type: 'object',
      fields: [
        defineField({
          name: 'width',
          title: 'Largura',
          type: 'string',
        }),
        defineField({
          name: 'height',
          title: 'Altura',
          type: 'string',
        }),
        defineField({
          name: 'depth',
          title: 'Profundidade',
          type: 'string',
        }),
      ],
    }),

    defineField({
      name: 'technicalFeatures',
      title: 'Ficha Técnica',
      type: 'array',
      of: [{type: 'string'}],
    }),

    defineField({
      name: 'advantages',
      title: 'Vantagens',
      type: 'array',
      of: [{type: 'string'}],
    }),

    defineField({
      name: 'idealFor',
      title: 'Ideal Para',
      type: 'array',
      of: [{type: 'string'}],
    }),

    defineField({
      name: 'orderRank',
      title: 'Ordem',
      type: 'number',
      validation: (Rule) => Rule.required().integer().min(1),
    }),

    defineField({
      name: 'isActive',
      title: 'Mostrar no site',
      type: 'boolean',
    }),
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      media: 'heroImage',
    },
  },
})
