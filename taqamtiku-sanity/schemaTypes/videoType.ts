import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'video',
  title: 'Video',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'url',
      title: 'URL Video',
      type: 'url',
      validation: (Rule) => Rule.uri({scheme: ['http', 'https'], allowRelative: false}),
    }),
  ],
})
