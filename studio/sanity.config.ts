import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'sremyaar',
  title: 'sremyaar',

  projectId: 'rfjpgwo0',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Posts')
              .id('post')
              .child(
                S.documentList()
                  .title('All Posts')
                  .filter('_type == "post"')
                  .defaultOrdering([{field: 'publishedAt', direction: 'desc'}])
              ),
            S.listItem()
              .title('Categories')
              .id('category')
              .child(S.documentList().title('Categories').filter('_type == "category"')),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
