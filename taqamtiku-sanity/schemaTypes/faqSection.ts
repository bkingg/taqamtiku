import { defineField, defineType } from "sanity"

export default defineType({
    name: 'faq', 
    type: 'object',
    title: 'F.A.Q.',
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
            name: 'faq',
            title: 'Foire aux questions',
            type: 'array',
            of: [
                defineField({
                    title: 'Bloc Question / Réponse',
                    name: 'question_reponse',
                    type: 'object',
                    fields: [
                        defineField({
                            title: 'Question',
                            name: 'question',
                            type: 'string',
                        }),
                        defineField({
                            title: 'Réponse',
                            name: 'reponse',
                            type: 'array',
                            of: [{type: 'textWithLinksBlock'}],
                        }),
                    ]
                }),
            ],
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
            validation: (rule) => rule
                .uri({
                    allowRelative: true
                }),
        }),
    ],
    initialValue: {
        title: 'F.A.Q.',
        description: "Foire aux Questions"
    }
});