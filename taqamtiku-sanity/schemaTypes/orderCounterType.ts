import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'orderCounter',
  type: 'document',
  title: 'Compteur de commandes',
  description:
    "Document technique interne utilisé pour générer les numéros de commande. Un seul document de ce type doit exister — ne pas en créer d'autre ni modifier la valeur manuellement.",
  fields: [
    defineField({
      name: 'value',
      type: 'number',
      title: 'Dernier numéro utilisé',
      initialValue: 0,
      readOnly: true,
    }),
  ],
})
