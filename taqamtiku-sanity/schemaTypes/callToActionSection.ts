import { defineField, defineType } from "sanity"

export default defineType({
    name: 'call_to_action', 
    type: 'object',
    title: 'Bannière Appel à l\'action',
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
            title: 'Image',
            name: 'image',
            type: 'image',
            description: 'Image d\'arrière plan',
            options: {
                hotspot: true // <-- Defaults to false
            }
        }),
        defineField({
            title: 'Texte de l\'appel à l\'action',
            name: 'ctaText',
            type: 'string',
        }),
        defineField({
            title: 'Brochure',
            name: 'brochure',
            type: 'file',
            fields: [],
            options: {
                accept: 'application/pdf'
            },
            hidden: ({ parent }) => !!parent?.ctaUrl,
        }),
        defineField({
            title: 'URL de l\'appel à l\'action',
            name: 'ctaUrl',
            type: 'url',
            initialValue: "#",
            hidden: ({ parent }) => !!parent?.brochure,
            validation: (rule) => rule
                .uri({
                    allowRelative: true
                }),
        })
    ]
});