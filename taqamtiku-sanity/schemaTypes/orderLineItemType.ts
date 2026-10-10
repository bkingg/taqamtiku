import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'orderLineItem',
  type: 'object',
  title: 'Article commandé',
  description:
    "Copie figée (nom, prix) de l'article au moment de la commande, pour que l'historique ne bouge pas si le menu change ensuite.",
  fields: [
    defineField({name: 'itemKey', type: 'string', title: 'Clé article'}),
    defineField({name: 'categoryKey', type: 'string', title: 'Clé catégorie'}),
    defineField({name: 'title', type: 'string', title: 'Nom du plat'}),
    defineField({name: 'unitPrice', type: 'number', title: 'Prix unitaire'}),
    defineField({name: 'quantity', type: 'number', title: 'Quantité'}),
    defineField({name: 'lineNote', type: 'string', title: 'Note'}),
  ],
  preview: {
    select: {title: 'title', qty: 'quantity', price: 'unitPrice'},
    prepare({title, qty, price}) {
      return {
        title: `${qty ?? '?'}x ${title}`,
        subtitle: price ? `${price} F CFA / unité` : undefined,
      }
    },
  },
})
