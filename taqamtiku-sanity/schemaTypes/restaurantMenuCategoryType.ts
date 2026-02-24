import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'restaurantMenuCategory',
  type: 'object',
  title: 'Catégorie du menu',
  fields: [
    defineField({name: 'title', type: 'string', title: 'Nom de la catégorie'}),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Image',
      options: {
        hotspot: true,
      },
    }),
    defineField({name: 'description', type: 'text', title: 'Description'}),
    defineField({
      title: 'Restaurant Menu Items',
      name: 'items',
      type: 'array',
      of: [{type: 'restaurantMenuItem'}],
      options: {
        sortable: true, // Enable sorting
      },
    }),
  ],
})
