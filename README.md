# Astro Starter Kit: Blog

```sh
npm create astro@latest -- --template blog
```

## structure

```text
├── public/
├── src/
│   ├── components/
│   ├── content/
│   ├── layouts/
│   └── pages/
├── astro.config.mjs
├── README.md
├── package.json
└── tsconfig.json
```

### front matters

```yaml
---
    title: zample
    description: zimple
    pubDate: 2025-12-30
    updatedDate: 2025-12-31
    heroImage: /img/2025/
    tags: 
    - exzimplzamp
    - word-salad
---
```

### VPS

```bash
ASTRO_DATABASE_FILE="file:db.sqlite" npm run build
pm2 restart all
```

## remind me how to git again

```bash
# Quick daily workflow for solo development
git add .
git commit -m "Fix mobile header responsiveness"
git push

# For larger features, create a branch
git checkout -b feature-name
# ... make changes ...
git add .
git commit -m "Descriptive commit message"
git checkout main
git merge feature-name
git push
git branch -d feature-name

# Emergency rollback if needed
git log --oneline  # Find commit hash
git revert <commit-hash>
```

```bash
git commit -m "Updated header to improve UX"
```

```bash
git checkout main
git merge update-header --ff
```

### or

```bash
git rebase main
```

### tag releases

```bash
git tag -a v1.2 -m "Version 1.2 release"
git push origin v1.2
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

The `src/content/` directory contains "collections" of related Markdown and MDX documents. Use `getCollection()` to retrieve posts from `src/content/blog/`, and type-check your frontmatter using an optional schema. See [Astro's Content Collections docs](https://docs.astro.build/en/guides/content-collections/) to learn more.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Check out [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).

## Credit

Astro template crew
