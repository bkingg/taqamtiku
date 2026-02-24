import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'restaurantMenu',
  type: 'document',
  title: 'Menu du restaurant',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      initialValue: 'Restaurant Menu',
    }),
    defineField({
      name: 'categories',
      type: 'array',
      of: [{type: 'restaurantMenuCategory'}],
      title: 'Categories du menu',
    }),
  ],
  initialValue: {
    title: 'Restaurant Menu',
  },
})
