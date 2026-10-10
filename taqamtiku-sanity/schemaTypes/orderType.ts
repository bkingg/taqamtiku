import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'order',
  type: 'document',
  title: 'Commande',
  fields: [
    defineField({
      name: 'orderNumber',
      type: 'string',
      title: 'Numéro de commande',
      readOnly: true,
    }),
    defineField({
      name: 'table',
      type: 'reference',
      to: [{type: 'restaurantTable'}],
      title: 'Table',
    }),
    defineField({
      name: 'items',
      type: 'array',
      of: [{type: 'orderLineItem'}],
      title: 'Articles',
    }),
    defineField({name: 'note', type: 'text', title: 'Note client'}),
    defineField({
      name: 'subtotal',
      type: 'number',
      title: 'Sous-total',
      readOnly: true,
    }),
    defineField({name: 'total', type: 'number', title: 'Total', readOnly: true}),
    defineField({
      name: 'status',
      type: 'string',
      title: 'Statut',
      options: {
        list: [
          {title: 'Reçue', value: 'received'},
          {title: 'En préparation', value: 'preparing'},
          {title: 'Prête', value: 'ready'},
          {title: 'Servie', value: 'served'},
        ],
        layout: 'radio',
      },
      initialValue: 'received',
    }),
    defineField({
      name: 'paymentMethod',
      type: 'string',
      title: 'Méthode de paiement',
      options: {
        list: [
          {title: 'Wave', value: 'wave'},
          {title: 'Comptoir', value: 'counter'},
        ],
      },
    }),
    defineField({
      name: 'paymentStatus',
      type: 'string',
      title: 'Statut du paiement',
      options: {
        list: [
          {title: 'En attente', value: 'pending'},
          {title: 'Payée', value: 'paid'},
          {title: 'Échouée', value: 'failed'},
        ],
        layout: 'radio',
      },
      initialValue: 'pending',
    }),
    defineField({
      name: 'waveCheckoutId',
      type: 'string',
      title: 'ID Wave Checkout',
      readOnly: true,
    }),
    defineField({
      name: 'posSyncStatus',
      type: 'string',
      title: 'Statut synchro POS',
      description: 'Réservé à la future synchronisation Loyverse.',
      options: {
        list: [
          {title: 'Non synchronisée', value: 'not_synced'},
          {title: 'Synchronisée', value: 'synced'},
          {title: 'Erreur', value: 'error'},
        ],
      },
      initialValue: 'not_synced',
    }),
    defineField({
      name: 'externalPosId',
      type: 'string',
      title: 'ID POS externe (Loyverse)',
      readOnly: true,
    }),
  ],
  orderings: [
    {
      title: 'Plus récentes',
      name: 'createdDesc',
      by: [{field: '_createdAt', direction: 'desc'}],
    },
  ],
  preview: {
    select: {
      orderNumber: 'orderNumber',
      status: 'status',
      total: 'total',
      tableNumber: 'table.number',
    },
    prepare({orderNumber, status, total, tableNumber}) {
      return {
        title: `Commande #${orderNumber ?? '?'} — Table ${tableNumber ?? '?'}`,
        subtitle: [status, total ? `${total} F CFA` : null].filter(Boolean).join(' · '),
      }
    },
  },
})
