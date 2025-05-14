import {defineField, defineType} from 'sanity'

// schemas/siteSettings.js
export default defineType({
  name: 'siteSettings',
  type: 'document',
  title: 'Paramètres',
  groups: [
    {
      name: 'header',
      title: 'En Tête',
    },
    {
      name: 'footer',
      title: 'Pied de Page',
    },
    {
      name: 'contact',
      title: 'Contact',
    },
    {
      name: 'social',
      title: 'Social',
    },
  ],
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: 'logo',
      type: 'image',
      title: 'Logo',
      group: 'header',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'mainMenu',
      type: 'reference',
      to: [{type: 'menu'}],
      title: 'Menu Principal',
      group: 'header',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      title: 'Titre',
      name: 'contactPageTitle',
      type: 'string',
      group: 'contact',
    }),
    defineField({
      title: 'Contact - Image',
      name: 'contactPageImage',
      type: 'image',
      group: 'contact',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      title: 'Lien Google Maps Embed',
      name: 'map',
      type: 'string',
      description: `Sur Google maps:
                    Partagez la carte,
                    Intégrer une carte,
                    Copier et extraire la partie <iframe src="LIEN GOOGLE MAPS EMBED" ...>`,
      group: 'contact',
    }),
    defineField({
      title: 'Sous-Titre',
      name: 'contactPageSubTitle',
      type: 'string',
      group: 'contact',
    }),
    defineField({
      title: 'Description',
      name: 'contactPageDescription',
      type: 'text',
      group: 'contact',
    }),
    defineField({
      title: 'Tél',
      name: 'phone',
      group: 'contact',
      type: 'array',
      of: [{type: 'textWithLinksBlock'}],
    }),
    defineField({
      title: 'Adresse',
      name: 'address',
      type: 'array',
      of: [{type: 'textWithLinksBlock'}],
      group: 'contact',
    }),
    defineField({
      title: 'Email',
      name: 'email',
      type: 'array',
      of: [{type: 'textWithLinksBlock'}],
      group: 'contact',
    }),
    defineField({
      title: 'Facebook URL',
      name: 'facebook',
      type: 'url',
      group: 'social',
    }),
    defineField({
      title: 'Twitter URL',
      name: 'twitter',
      type: 'url',
      group: 'social',
    }),
    defineField({
      title: 'Instagram URL',
      name: 'instagram',
      type: 'url',
      group: 'social',
    }),
    defineField({
      title: 'LinkedIn URL',
      name: 'linkedin',
      type: 'url',
      group: 'social',
    }),
    defineField({
      name: 'footerBgImage',
      type: 'image',
      title: 'Arrière Plan du Pied de Page',
      group: 'footer',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'footerLogo',
      type: 'image',
      title: 'Logo de Pied de Page',
      group: 'footer',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'footerDescription',
      type: 'text',
      title: 'Description',
      group: 'footer',
    }),
    defineField({
      title: 'Menus du Pied de page',
      name: 'footerMenus',
      group: 'footer',
      type: 'array',
      validation: (rule) => rule.max(3),
      of: [
        defineField({
          title: 'Menu de Pied de Page',
          name: 'footerMenu',
          type: 'object',
          fields: [
            defineField({
              title: 'Titre',
              name: 'title',
              type: 'string',
            }),
            defineField({
              title: 'Menu',
              name: 'menu',
              type: 'reference',
              to: [{type: 'menu'}],
              validation: (rule) => rule.required(),
            }),
          ],
        }),
      ],
      options: {
        sortable: true, // Enable sorting
      },
    }),
  ],
  initialValue: {
    title: 'Paramètres du Site',
    contactPageTitle: 'Contact',
  },
})
