---
title: Image Usage
description: Embedding images and using Open Graph images in Nordlys
pubDate: 2024-10-17
heroImage: '/blog-placeholder-2.jpg'
tags:
  - documentation
---

This post provides a quick overview of image and Open Graph image usage in Nordlys. For more detailed information on how Astro handles images, please [consult the documentation](https://docs.astro.build/en/guides/images/).

import logo from '/src/assets/img/2024/logo.svg'
import { Image } from 'astro:assets'

## Embedding images

Astro, and by extension Nordlys, offers various ways to use images in your content.

### Images in Markdown

In all Markdown (`.md`) files, images can be embedded using the usual syntax. Astro will resolve local assets as the image source.

```markdown src/content/posts/my-post.md
![Nordlys logo](/src/assets/img/2024/logo.svg)
or
![Nordlys logo](../../assets/logo.svg)
or
![Nordlys logo](src/assets/logo.svg)
```

![Nordlys logo](/src/assets/img/2024/logo.svg)

### Images in MDX

In Astro (`.astro`) or MDX (`.mdx`) files, you can also use Astro's built-in `<Image>` component.

```astro src/pages/my-page.astro
---
import logo from '/src/assets/img/2024/logo.svg'
import { Image } from 'astro:assets'
---

<Image alt="Nordlys logo" src={logo} />
```

### Public images

In addition to local assets, we can also use images from the `public` directory or from the web.

```markdown src/pages/my-page.md
From the `public` folder:
![Nordlys favicon](/favicon.svg)

From the web:
![Nordlys favicon](https://nordlys.fjelloverflow.dev/favicon.svg)
```

## Open Graph Images

Images and image URLs can be used in frontmatter, for instance as `openGraphImage`. To use a local asset, use:

```md src/content/posts/my-post.md
openGraphImage: "/src/assets/img/2024/logo.svg"
or
openGraphImage: "../../assets/logo.svg"
or
openGraphImage: "src/assets/logo.svg"
```

To use a public image, use:

```md src/content/posts/my-post.md
openGraphImage: "/favicon.svg"
or
openGraphImage: "https://nordlys.fjelloverflow.dev/favicon.svg"
```

Note that supplying `openGraphImage` is entirely optional. If a post (any file in `src/content/posts`) does not have an `openGraphImage` provided, Nordlys will automatically generate and use a basic template, displaying the post `title`, `description`, `author`, and website `title`, which looks like this:

Similarly, when there is no global `openGraphImage` configured in `theme.config.ts`, Nordlys generates and uses a generic image that displays the site `title` and `description` on every page where none has been defined, looking like this:
