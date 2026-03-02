import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://coding_standards.c65llc.com',
  integrations: [
    starlight({
      title: 'Coding Standards',
      description: 'Unified coding standards for every AI coding assistant.',
      social: {
        github: 'https://github.com/c65llc/coding_standards',
      },
      defaultLocale: 'root',
      locales: {
        root: { label: 'English', lang: 'en' },
      },
      sidebar: [
        {
          label: 'Getting Started',
          items: [
            { label: 'Quick Start', slug: 'getting-started/quick-start' },
            { label: 'Installation', slug: 'getting-started/installation' },
            { label: 'Project Structure', slug: 'getting-started/project-structure' },
          ],
        },
        {
          label: 'Standards',
          collapsed: true,
          items: [
            {
              label: 'Architecture',
              autogenerate: { directory: 'standards/architecture' },
            },
            {
              label: 'Languages',
              autogenerate: { directory: 'standards/languages' },
            },
            {
              label: 'Process',
              autogenerate: { directory: 'standards/process' },
            },
          ],
        },
        {
          label: 'Guides',
          items: [
            { label: 'Multi-Agent Setup', slug: 'guides/multi-agent-setup' },
            { label: 'CI/CD Integration', slug: 'guides/ci-cd-integration' },
            { label: 'Customization', slug: 'guides/customization' },
            { label: 'Cursor Commands', slug: 'guides/cursor-commands' },
          ],
        },
        {
          label: 'Reference',
          items: [
            { label: 'Makefile Targets', slug: 'reference/makefile-targets' },
            { label: 'Scripts', slug: 'reference/scripts' },
            { label: 'Agent Configs', slug: 'reference/agent-configs' },
          ],
        },
      ],
      customCss: [],
      head: [
        {
          tag: 'meta',
          attrs: {
            property: 'og:image',
            content: 'https://coding_standards.c65llc.com/og-image.png',
          },
        },
      ],
    }),
  ],
});
