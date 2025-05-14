import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'media_text',
  type: 'object',
  title: 'Texte et Media',
  groups: [
    {
      name: 'text',
      title: 'Texte',
    },
    {
      name: 'media',
      title: 'Média',
    },
  ],
  fields: [
    defineField({
      name: 'layout',
      type: 'string',
      title: 'Disposition',
      options: {
        list: [
          {title: 'Media | Texte', value: 'media_text'},
          {title: 'Texte | Media', value: 'text_media'},
        ],
        layout: 'radio', // Displays options as radio buttons
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'layoutColor',
      type: 'string',
      title: 'Couleur',
      options: {
        list: [
          {title: 'Clair', value: 'light'},
          {title: 'Sombre', value: 'dark'},
        ],
        layout: 'radio', // Displays options as radio buttons
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: 'Titre',
      name: 'title',
      type: 'string',
      group: 'text',
    }),
    defineField({
      title: 'Description',
      name: 'description',
      type: 'array',
      of: [{type: 'block'}],
      group: 'text',
    }),
    defineField({
      name: 'showCta',
      type: 'boolean',
      title: "Afficher le Boutton d'appel à l'action",
      group: 'text',
      initialValue: false,
    }),
    defineField({
      title: "Texte de l'appel à l'action",
      name: 'ctaText',
      type: 'string',
      group: 'text',
      hidden: ({parent}) => !parent?.showCta,
    }),
    defineField({
      name: 'linkType',
      type: 'string',
      title: 'Type de lien',
      group: 'text',
      options: {
        list: [
          {title: 'URL Interne', value: 'internal'},
          {title: 'URL Externe', value: 'external'},
        ],
        layout: 'radio', // Displays options as radio buttons
      },
      initialValue: 'internal',
      hidden: ({parent}) => !parent?.showCta,
    }),
    defineField({
      name: 'internalLink',
      type: 'reference',
      title: 'Internal Page/Post',
      group: 'text',
      description: 'Select an internal page or post',
      to: [{type: 'page'}, {type: 'service'}, {type: 'projet'}, {type: 'article'}],
      hidden: ({parent}) => !parent?.showCta || parent?.linkType !== 'internal',
    }),
    defineField({
      name: 'externalUrl',
      type: 'url',
      title: 'External URL',
      group: 'text',
      description: 'Enter an external URL',
      validation: (Rule) => Rule.uri({allowRelative: true}),
      hidden: ({parent}) => !parent?.showCta || parent?.linkType !== 'external',
    }),
    defineField({
      name: 'mediaType',
      type: 'string',
      title: 'Type de Media',
      group: 'media',
      options: {
        list: [
          {title: 'Image', value: 'image'},
          {title: 'Video', value: 'video'},
        ],
        layout: 'radio', // Displays options as radio buttons
      },
      initialValue: 'image',
    }),
    defineField({
      title: 'Image',
      name: 'image',
      type: 'image',
      group: 'media',
      options: {
        hotspot: true, // <-- Defaults to false
      },
      hidden: ({parent}) => parent?.mediaType !== 'image',
    }),
    defineField({
      name: 'video',
      title: 'Video',
      type: 'video',
      group: 'media',
      hidden: ({parent}) => parent?.mediaType !== 'video',
    }),
  ],
})
