import {defineField, defineType, ValidationContext} from 'sanity'

export default defineType({
  title: 'Menu Item',
  name: 'menuItem',
  type: 'object',
  fields: [
    defineField({
      title: 'Titre',
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'linkType',
      type: 'string',
      title: 'Type de lien',
      options: {
        list: [
          {title: 'URL Interne', value: 'internal'},
          {title: 'URL Externe', value: 'external'},
        ],
        layout: 'radio', // Displays options as radio buttons
      },
      validation: (Rule) => Rule.required(),
      initialValue: 'internal',
    }),
    defineField({
      name: 'internalLink',
      type: 'reference',
      title: 'Internal Page/Post',
      description: 'Select an internal page or post',
      to: [{type: 'page'}, {type: 'service'}, {type: 'projet'}, {type: 'article'}],
      hidden: ({parent}) => parent?.linkType !== 'internal',
      validation: (Rule) =>
        Rule.custom((value, {parent}: any) => {
          if (parent?.linkType === 'internal' && !value) {
            return 'You must select an internal link'
          }
          return true
        }),
    }),
    defineField({
      name: 'externalUrl',
      type: 'url',
      title: 'External URL',
      description: 'Enter an external URL',
      hidden: ({parent}) => parent?.linkType !== 'external',
      validation: (Rule) =>
        Rule.uri({
          allowRelative: true,
        }).custom((value, {parent}: any) => {
          if (parent?.linkType === 'external' && !value) {
            return 'You must provide an external URL'
          }
          return true
        }),
    }),
    defineField({
      title: 'Sous-Menus',
      name: 'submenuItems',
      type: 'array',
      of: [{type: 'menuItem'}],
      options: {
        sortable: true, // Enable sorting
      },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      linkType: 'linkType',
      internalSlug: 'internalLink.slug.current',
      externalUrl: 'externalUrl',
      _type: 'internalLink._type',
    },
    prepare({title, linkType, internalSlug, externalUrl, _type}) {
      const url = linkType === 'internal' ? `/${_type}s/${internalSlug}` : externalUrl
      return {
        title,
        subtitle: url ? `URL: ${url}` : 'No URL set',
      }
    },
  },
})
