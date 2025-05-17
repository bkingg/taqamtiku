import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'restaurantMenu',
  type: 'document',
  title: 'Menu du restaurant',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      readOnly: true,
      hidden: true,
      initialValue: 'Restaurant Menu',
    }),
    defineField({
      name: 'items',
      type: 'array',
      of: [{type: 'restaurantMenuItem'}],
      title: 'Plats du menu',
    }),
  ],
  initialValue: {
    title: 'Restaurant Menu',
  },
})
