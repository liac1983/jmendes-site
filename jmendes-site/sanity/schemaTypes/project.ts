import {defineField, defineType} from 'sanity'

const translationLocales = [
  {name: 'en', title: 'Inglês'},
  {name: 'fr', title: 'Francês'},
  {name: 'es', title: 'Espanhol'},
]

function translatedProjectFields(localeTitle: string) {
  return [
    defineField({
      name: 'title',
      title: `Título (${localeTitle})`,
      type: 'string',
    }),
    defineField({
      name: 'categoryLabel',
      title: `Etiqueta da Categoria (${localeTitle})`,
      type: 'string',
    }),
    defineField({
      name: 'location',
      title: `Localização (${localeTitle})`,
      type: 'string',
    }),
    defineField({
      name: 'typeLabel',
      title: `Tipo (${localeTitle})`,
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: `Descrição (${localeTitle})`,
      type: 'text',
      rows: 5,
    }),
    defineField({
      name: 'challenge',
      title: `Desafio (${localeTitle})`,
      type: 'text',
      rows: 5,
    }),
    defineField({
      name: 'solution',
      title: `Solução (${localeTitle})`,
      type: 'text',
      rows: 5,
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
      name: 'testimonialAuthor',
      title: `Autor do Testemunho (${localeTitle})`,
      type: 'string',
    }),
    defineField({
      name: 'testimonialText',
      title: `Texto do Testemunho (${localeTitle})`,
      type: 'text',
      rows: 4,
    }),
  ]
}

export const projectType = defineType({
  name: 'project',
  title: 'Projetos',
  type: 'document',
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
      description: 'Slug da categoria (minúsculas, hífens). Ex: cozinhas, roupeiros, comercial, casas-completas, escritorios.',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'categoryLabel',
      title: 'Etiqueta da Categoria',
      type: 'string',
      initialValue: 'Por Medida',
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
      name: 'typeLabel',
      title: 'Tipo',
      type: 'string',
      initialValue: 'Por Medida',
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
          fields: translatedProjectFields(locale.title),
        })
      ),
    }),

    defineField({
      name: 'heroImage',
      title: 'Imagem Principal',
      type: 'image',
      options: {hotspot: true},
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'overviewImage',
      title: 'Imagem de Introdução',
      type: 'image',
      options: {hotspot: true},
    }),

    defineField({
      name: 'gallery',
      title: 'Galeria',
      type: 'array',
      of: [{type: 'image', options: {hotspot: true}}],
    }),

    defineField({
      name: 'description',
      title: 'Descrição',
      type: 'text',
      rows: 5,
    }),

    defineField({
      name: 'challenge',
      title: 'Desafio',
      type: 'text',
      rows: 5,
    }),

    defineField({
      name: 'solution',
      title: 'Solução',
      type: 'text',
      rows: 5,
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
      name: 'testimonialAuthor',
      title: 'Autor do Testemunho',
      type: 'string',
    }),

    defineField({
      name: 'testimonialText',
      title: 'Texto do Testemunho',
      type: 'text',
      rows: 4,
    }),

    defineField({
      name: 'instagramImages',
      title: 'Imagens do Instagram',
      type: 'array',
      of: [{type: 'image', options: {hotspot: true}}],
    }),

    defineField({
      name: 'instagramUrl',
      title: 'URL do Instagram',
      type: 'url',
    }),

    defineField({
      name: 'published',
      title: 'Publicado',
      type: 'boolean',
      initialValue: true,
    }),

    defineField({
      name: 'featured',
      title: 'Em Destaque',
      type: 'boolean',
      initialValue: false,
    }),

    defineField({
      name: 'order',
      title: 'Ordem',
      type: 'number',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'heroImage',
      subtitle: 'location',
    },
  },
})
