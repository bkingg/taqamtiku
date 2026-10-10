import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'staffUser',
  type: 'document',
  title: 'Compte du personnel',
  fields: [
    defineField({name: 'name', type: 'string', title: 'Nom'}),
    defineField({name: 'email', type: 'string', title: 'Email'}),
    defineField({
      name: 'passwordHash',
      type: 'string',
      title: 'Mot de passe (haché)',
      description:
        'Haché avec bcrypt côté serveur — ne jamais saisir de mot de passe en clair ici.',
    }),
    defineField({
      name: 'role',
      type: 'string',
      title: 'Rôle',
      options: {
        list: [
          {title: 'Administrateur', value: 'admin'},
          {title: 'Cuisine', value: 'kitchen'},
        ],
      },
      initialValue: 'kitchen',
    }),
    defineField({
      name: 'isActive',
      type: 'boolean',
      title: 'Actif',
      initialValue: true,
    }),
  ],
  preview: {
    select: {title: 'name', email: 'email', role: 'role'},
    prepare({title, email, role}) {
      return {title: title || email, subtitle: [email, role].filter(Boolean).join(' · ')}
    },
  },
})
