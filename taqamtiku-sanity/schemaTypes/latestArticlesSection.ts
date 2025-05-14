import { defineField, defineType } from "sanity"

export default defineType({
    name: 'latest_articles', 
    type: 'object',
    title: 'Actualités',
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
            title: 'CTA Texte',
            name: 'ctaText',
            type: 'string',
        }),
        defineField({
            title: 'CTA URL',
            name: 'ctaUrl',
            type: 'url',
            initialValue: "#",
            validation: (rule) => rule
                .required()
                .uri({
                    allowRelative: true
                }),
        }),
    ],
    initialValue: {
        title: 'Actualités',
        description: "Découvrez l'actualité de HEPO Dakar"
    }
});