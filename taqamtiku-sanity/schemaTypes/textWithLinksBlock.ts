import { defineField, defineType } from "sanity";

export default defineType({
  title: 'Text with Links',
  name: 'textWithLinksBlock',
  type: 'block',
  styles: [],
  lists: [], // Disable lists
  marks: {
    decorators: [
      {title: 'Bold', value: 'strong'},
      {title: 'Italic', value: 'em'},
    ],
    annotations: [
      {
        name: 'link',
        type: 'object',
        title: 'Lien',
        fields: [
          {
            title: 'URL',
            name: 'href',
            type: 'url',
            validation: (rule) => rule
                .required()
                .uri({
                    allowRelative: true,
                    scheme: ['http', 'https', 'mailto', 'tel']
                }),
          },
          {
            title: 'Ouvrir dans un nouvel onglet',
            name: 'blank',
            type: 'boolean',
          },
        ],
      },
    ],
  },
});
