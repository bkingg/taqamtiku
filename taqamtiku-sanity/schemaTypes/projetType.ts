import {defineType, defineField} from 'sanity'

export default defineType({
  title: 'Projets',
  name: 'projet',
  type: 'document',
  groups: [
    {
      name: 'info',
      title: 'Infos',
    },
    {
      name: 'images',
      title: 'Images',
    },
    {
      name: 'address',
      title: 'Addresse',
    },
  ],
  fields: [
    defineField({
      title: 'Titre',
      name: 'title',
      type: 'string',
      group: 'info',
    }),
    defineField({
      title: 'Ville',
      name: 'ville',
      type: 'string',
      group: 'info',
    }),
    defineField({
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      group: 'info',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      title: 'Description',
      name: 'description',
      type: 'text',
      group: 'info',
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Image',
      group: 'images',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      title: 'Propriétés',
      name: 'proprietes',
      type: 'array',
      group: 'info',
      of: [
        defineField({
          type: 'object',
          name: 'propriete',
          fields: [
            defineField({
              title: 'Titre',
              name: 'title',
              type: 'string',
            }),
            defineField({
              title: 'Sous-titre',
              name: 'subtitle',
              type: 'string',
            }),
          ],
        }),
      ],
      options: {
        sortable: true,
      },
    }),
    defineField({
      title: 'Gallerie',
      name: 'gallery',
      type: 'array',
      group: 'images',
      of: [
        defineField({
          name: 'image',
          type: 'image',
          title: 'Image',
          options: {
            hotspot: true,
          },
        }),
      ],
      options: {
        sortable: true,
      },
    }),
    defineField({
      name: 'map',
      type: 'url',
      title: 'Lien Google maps Embed',
      group: 'address',
      validation: (Rule) =>
        Rule.uri({
          allowRelative: true,
        }),
    }),
    defineField({
      title: 'Adresse',
      name: 'address',
      group: 'address',
      type: 'array',
      of: [{type: 'textWithLinksBlock'}],
    }),
    defineField({
      title: 'Plans',
      name: 'plans',
      type: 'array',
      group: 'images',
      of: [
        defineField({
          name: 'plan',
          type: 'object',
          title: 'Plan',
          fields: [
            defineField({
              name: 'title',
              type: 'string',
              title: 'Type de Plan',
            }),
            defineField({
              name: 'image',
              type: 'image',
              title: 'Image',
              options: {
                hotspot: true,
              },
            }),
          ],
        }),
      ],
      options: {
        sortable: true,
      },
    }),
    defineField({
      title: 'Brochure',
      name: 'brochure',
      type: 'file',
      fields: [],
      options: {
        accept: 'application/pdf',
      },
    }),
  ],
})
