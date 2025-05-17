import {defineType, defineField} from 'sanity'

export default defineType({
  title: 'Pages',
  name: 'page',
  type: 'document',
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
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
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
      title: 'Sections',
      name: 'sections',
      type: 'array',
      of: [
        {type: 'rich_text'},
        {type: 'media_text'},
        {type: 'slider'},
        {type: 'faq'},
        {type: 'logo_list'},
        {type: 'latest_articles'},
        {type: 'call_to_action'},
        {type: 'temoignages'},
        {type: 'video'},
      ],
      options: {
        sortable: true,
      },
    }),
  ],
})
