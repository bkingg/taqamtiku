import { defineField, defineType } from "sanity"

export default defineType({
    title: 'Menus',
    name: 'menu',
    type: 'document',
    fields: [
        defineField({
            title: 'Titre',
            name: 'title',
            type: 'string',
        }),
        defineField({
            name: 'handle',
            title: 'Handle',
            type: 'slug',
            options: {
              source: 'title',
              maxLength: 96,
            },
        }),
        defineField({
            title: 'Menus',
            name: 'items',
            type: 'array',
            of: [{ type: 'menuItem' }],
            options: {
                sortable: true, // Enable sorting
            },
        }),
    ],
});