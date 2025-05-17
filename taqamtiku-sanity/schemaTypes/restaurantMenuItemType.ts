import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'restaurantMenuItem',
  type: 'object',
  title: 'Élément du menu',
  fields: [
    defineField({name: 'title', type: 'string', title: 'Nom du plat'}),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Image',
      options: {
        hotspot: true,
      },
    }),
    defineField({name: 'description', type: 'text', title: 'Description'}),
    defineField({name: 'price', type: 'number', title: 'Prix'}),
    defineField({
      name: 'category',
      type: 'string',
      title: 'Catégorie',
      options: {
        list: ['Entrées', 'Plats', 'Desserts', 'Bières', 'Softs', 'Vins', 'Liqueurs'],
      },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      price: 'price',
    },
    prepare({title, price}) {
      const priceString = price + ' F CFA'
      return {
        title,
        subtitle: price ? `Prix: ${priceString}` : 'N/A',
      }
    },
  },
})
