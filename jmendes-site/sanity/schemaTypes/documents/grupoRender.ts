import {defineField, defineType} from 'sanity'

const translationLocales = [
  {name: 'en', title: 'Inglês'},
  {name: 'fr', title: 'Francês'},
  {name: 'es', title: 'Espanhol'},
]

function translatedFields(localeTitle: string) {
  return [
    defineField({
      name: 'titulo',
      title: `Título (${localeTitle})`,
      type: 'string',
    }),
    defineField({
      name: 'descricao',
      title: `Descrição (${localeTitle})`,
      type: 'text',
      rows: 4,
    }),
  ]
}

export const grupoRenderType = defineType({
  name: 'grupoRender',
  title: 'Renders',
  type: 'document',
  fields: [
    defineField({
      name: 'titulo',
      title: 'Título',
      type: 'string',
      validation: (Rule) => Rule.required().min(3),
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'titulo', maxLength: 96},
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'capa',
      title: 'Imagem de Capa',
      type: 'image',
      options: {hotspot: true},
      description: 'Imagem principal que aparece no card da listagem',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'descricao',
      title: 'Descrição',
      type: 'text',
      rows: 4,
      description: 'Breve descrição dos móveis deste grupo de renders',
    }),

    defineField({
      name: 'galeria',
      title: 'Galeria de Renders',
      type: 'array',
      of: [{type: 'image', options: {hotspot: true}}],
    }),

    defineField({
      name: 'translations',
      title: 'Traduções',
      type: 'object',
      description:
        'Textos opcionais por idioma. Quando um campo fica vazio, o site usa o texto base em português.',
      options: {collapsible: true, collapsed: true},
      fields: translationLocales.map((locale) =>
        defineField({
          name: locale.name,
          title: locale.title,
          type: 'object',
          options: {collapsible: true, collapsed: true},
          fields: translatedFields(locale.title),
        })
      ),
    }),

    defineField({
      name: 'ordem',
      title: 'Ordem',
      type: 'number',
    }),

    defineField({
      name: 'visivel',
      title: 'Visível no site',
      type: 'boolean',
      initialValue: true,
      description: 'Desative para ocultar este grupo sem o apagar',
    }),
  ],

  preview: {
    select: {
      title: 'titulo',
      media: 'capa',
      subtitle: 'descricao',
    },
  },
})
