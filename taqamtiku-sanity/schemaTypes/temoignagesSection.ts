import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'temoignages',
  type: 'object',
  title: 'Témoignages',
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
      name: 'temoignages',
      title: 'Témoignages',
      type: 'array',
      of: [
        defineField({
          title: 'Témoignage',
          name: 'temoignage',
          type: 'object',
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
              title: 'Message',
              name: 'message',
              type: 'text',
            }),
            defineField({
              title: 'Nom',
              name: 'nom',
              type: 'string',
            }),
            defineField({
              title: 'Poste / Métier',
              name: 'position',
              type: 'string',
            }),
          ],
        }),
      ],
    }),
  ],
  initialValue: {
    title: 'Témoignages',
    description: 'Voir les Témoignages des clients',
  },
})
