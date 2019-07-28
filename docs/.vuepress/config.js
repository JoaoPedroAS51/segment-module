module.exports = {
  title: 'Segment Analytics Module',
  description: 'Segment Analytics module for Nuxt',
  themeConfig: {
    repo: 'nuxt-community/segment-module',
    docsDir: 'docs',
    editLinks: true,
    editLinkText: 'Edit this page on GitHub',
    sidebarDepth: 2,
    sidebar: {
      '/': [
        {
          title: 'Guide',
          collapsable: false,
          children: [
            '/',
            '/guide/setup',
            '/guide/client',
            '/guide/server'
          ]
        }
      ],
    },
    nav: [
      {
        text: 'Guide',
        link: '/'
      }
    ]
  }
}
