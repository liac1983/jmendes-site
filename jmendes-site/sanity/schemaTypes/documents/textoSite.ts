import {defineField, defineType} from 'sanity'
import {siteTextKeys, siteTextOptionTitle} from '../../../lib/site-text-keys'

const byKey = new Map(siteTextKeys.map((item) => [item.key, item]))

export const textoSiteType = defineType({
  name: 'textoSite',
  title: 'Textos do site',
  type: 'document',
  fields: [
    defineField({
      name: 'chave',
      title: 'Texto a alterar',
      type: 'string',
      description:
        'Escolha o texto que quer mudar. Na lista aparece a página e o texto que está hoje no site.',
      options: {
        list: siteTextKeys.map((item) => ({title: siteTextOptionTitle(item), value: item.key})),
      },
      validation: (Rule) =>
        Rule.required().custom(async (value, context) => {
          if (!value) return true
          const id = (context.document?._id ?? '').replace(/^drafts\./, '')
          const client = context.getClient({apiVersion: '2024-01-01'})
          const repetidos = await client.fetch<number>(
            'count(*[_type == "textoSite" && chave == $chave && !(_id in [$id, $draft])])',
            {chave: value, id, draft: `drafts.${id}`},
          )
          return repetidos > 0 ? 'Já existe outro documento para este texto. Edite esse.' : true
        }),
    }),
    defineField({
      name: 'pt',
      title: 'Português',
      type: 'text',
      rows: 4,
      description:
        'Deixe vazio para manter o texto atual. Se o texto atual tiver <brand>…</brand>, essa parte aparece a dourado.',
    }),
    defineField({name: 'en', title: 'Inglês', type: 'text', rows: 4, description: 'Vazio = mantém o texto atual em inglês.'}),
    defineField({name: 'fr', title: 'Francês', type: 'text', rows: 4, description: 'Vazio = mantém o texto atual em francês.'}),
    defineField({name: 'es', title: 'Espanhol', type: 'text', rows: 4, description: 'Vazio = mantém o texto atual em espanhol.'}),
  ],
  preview: {
    select: {chave: 'chave', pt: 'pt'},
    prepare({chave, pt}) {
      const item = chave ? byKey.get(chave) : undefined
      return {
        title: item ? item.section : chave || 'Texto por escolher',
        subtitle: pt || item?.current || '',
      }
    },
  },
})
