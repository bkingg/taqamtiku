import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'restaurantTable',
  type: 'document',
  title: 'Table',
  fields: [
    defineField({name: 'number', type: 'string', title: 'Numéro de table'}),
    defineField({
      name: 'qrSlug',
      type: 'slug',
      title: 'Identifiant QR',
      options: {source: 'number'},
    }),
    defineField({
      name: 'isActive',
      type: 'boolean',
      title: 'Active',
      initialValue: true,
    }),
  ],
  preview: {
    select: {title: 'number', active: 'isActive'},
    prepare({title, active}) {
      return {
        title: `Table ${title}`,
        subtitle: active ? 'Active' : 'Inactive',
      }
    },
  },
})
