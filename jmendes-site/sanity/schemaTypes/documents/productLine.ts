import {defineField, defineType} from 'sanity'

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

