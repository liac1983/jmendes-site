import {defineField, defineType} from 'sanity'

export const catalogoType = defineType({
  name: 'catalogo',
  title: 'Catálogos',
  type: 'document',
  fields: [
    defineField({
      name: 'nome',
      title: 'Nome',
      type: 'string',
      validation: (Rule) => Rule.required().min(3),
    }),

    defineField({
      name: 'pdf',
      title: 'Ficheiro PDF',
      type: 'file',
      options: {accept: 'application/pdf'},
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'capa',
      title: 'Imagem de Capa',
      type: 'image',
      options: {hotspot: true},
      description: 'Imagem da primeira página do catálogo (screenshot ou export do PDF)',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'dataPublicacao',
      title: 'Data de Publicação',
      type: 'date',
    }),

    defineField({
      name: 'visivel',
      title: 'Visível no site',
      type: 'boolean',
      initialValue: true,
      description: 'Desative para ocultar este catálogo sem o apagar',
    }),
  ],

  preview: {
    select: {
      title: 'nome',
      media: 'capa',
      subtitle: 'dataPublicacao',
    },
  },
})
