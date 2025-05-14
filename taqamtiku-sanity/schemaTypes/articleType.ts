import { defineType, defineField } from 'sanity';

export default defineType({
  title: 'Blog',
  name: 'article',
  type: 'document',
  fields: [
    defineField({
      title: 'Titre',
      name: 'title',
      type: 'string',
    }),
    defineField({
      title: 'Résumé',
      name: 'excerpt',
      type: 'text',
    }),
    defineField({
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
        name: 'tags',
        title: 'Balises',
        type: 'tags',
        options: {
          includeFromRelated: 'tags'
        }
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
        title: 'Description',
        name: 'description',
        type: 'array',
        of: [
          {type: 'block'},
          {type: 'image'}
        ]
    }),
    defineField({
      title: 'Sections',
      name: 'sections',
      type: 'array',
      of: [
        { type: 'slider' },
        { type: 'logo_list' },
      ],
      options: {
        sortable: true,
      },
    }),
  ],
});