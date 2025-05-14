import { defineField, defineType } from "sanity";

export default defineType({
    title: "Bloc de Texte",
    name: "rich_text",
    type: "object",
    fields: [
        defineField({
            title: "Texte",
            name: "richText",
            type: "array",
            of: [
                { type: "block" },
                { type: "image" }
            ],
        }),
    ],
});