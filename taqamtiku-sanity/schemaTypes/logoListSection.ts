import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'logo_list',
  type: 'object',
  title: 'Liste de Logos',
  fields: [
    defineField({
      title: 'Titre',
      name: 'title',
      type: 'string',
    }),
    defineField({
      title: 'Description',
      name: 'description',
      type: 'text',
    }),
    defineField({
      title: 'Logos',
      name: 'logos',
      type: 'array',
      of: [
        defineField({
          type: 'object',
          name: 'logo',
          fields: [
            defineField({
              title: 'Image',
              name: 'image',
              type: 'image',
              options: {
                hotspot: true, // <-- Defaults to false
              },
            }),
            defineField({
              title: 'Titre',
              name: 'title',
              type: 'string',
            }),
            defineField({
              title: 'URL',
              name: 'url',
              type: 'url',
              initialValue: '#',
              validation: (rule) =>
                rule.uri({
                  allowRelative: true,
                }),
            }),
          ],
        }),
      ],
    }),
  ],
})
