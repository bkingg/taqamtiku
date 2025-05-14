import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'services',
  type: 'object',
  title: 'Services',
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
      name: 'services',
      title: 'Services',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'service'}],
        },
      ],
      validation: (Rule) => Rule.max(8).warning('Vous ne pouvez ajouter que 8 services.'),
    }),
    defineField({
      title: 'CTA Texte',
      name: 'ctaText',
      type: 'string',
    }),
    defineField({
      title: 'CTA URL',
      name: 'ctaUrl',
      type: 'url',
      initialValue: '#',
      validation: (rule) =>
        rule.required().uri({
          allowRelative: true,
        }),
    }),
  ],
  initialValue: {
    title: 'Nos Services',
    description: 'Découvrez nos services',
  },
})
