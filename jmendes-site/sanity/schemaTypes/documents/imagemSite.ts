import {defineField, defineType} from 'sanity'
import {siteImageSlots} from '../../../lib/site-image-slots'

const byKey = new Map(siteImageSlots.map((slot) => [slot.key, slot]))

export const imagemSiteType = defineType({
  name: 'imagemSite',
  title: 'Imagens do site',
  type: 'document',
  fields: [
    defineField({
      name: 'chave',
      title: 'Imagem a trocar',
      type: 'string',
      description: 'Escolha o sítio do site onde esta imagem vai aparecer.',
      options: {list: siteImageSlots.map((slot) => ({title: slot.label, value: slot.key}))},
      validation: (Rule) =>
        Rule.required().custom(async (value, context) => {
          if (!value) return true
          const id = (context.document?._id ?? '').replace(/^drafts\./, '')
          const client = context.getClient({apiVersion: '2024-01-01'})
          const repetidos = await client.fetch<number>(
            'count(*[_type == "imagemSite" && chave == $chave && !(_id in [$id, $draft])])',
            {chave: value, id, draft: `drafts.${id}`},
          )
          return repetidos > 0 ? 'Já existe outro documento para esta imagem. Edite esse.' : true
        }),
    }),
    defineField({
      name: 'imagem',
      title: 'Imagem',
      type: 'image',
      options: {hotspot: true},
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {chave: 'chave', media: 'imagem'},
    prepare({chave, media}) {
      return {title: (chave && byKey.get(chave)?.label) || 'Imagem por escolher', media}
    },
  },
})
