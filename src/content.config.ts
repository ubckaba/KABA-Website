// 1. Import utilities from `astro:content`
import { defineCollection } from 'astro:content';

// 2. Import loader(s)
import { glob, file } from 'astro/loaders';

// 3. Import Zod
import { z } from 'astro/zod';

// 4. Define your collection(s)

const kabamilya = defineCollection({
    loader: file('src/data/kabamilya.json'),
    schema: z.object({
        id: z.string(),
        description: z.string()
    })
})

const presidential = defineCollection({
    loader: file('src/data/kabamilya/presidential.json'),
    schema: z.object({
        id: z.string(),
        position: z.string(),
        year: z.string(),
        major: z.string(),
        headshot: z.string()
    })
});

const finance = defineCollection({
    loader: file('src/data/kabamilya/finance.json'),
    schema: z.object({
        id: z.string(),
        position: z.string(),
        year: z.string(),
        major: z.string(),
        headshot: z.string()
    })
});

const internals = defineCollection({
    loader: file('src/data/kabamilya/internals.json'),
    schema: z.object({
        id: z.string(),
        position: z.string(),
        year: z.string(),
        major: z.string(),
        headshot: z.string()
    })
});

const externals = defineCollection({
    loader: file('src/data/kabamilya/externals.json'),
    schema: z.object({
        id: z.string(),
        position: z.string(),
        year: z.string(),
        major: z.string(),
        headshot: z.string()
    })
});

const academic = defineCollection({
    loader: file('src/data/kabamilya/academic.json'),
    schema: z.object({
        id: z.string(),
        position: z.string(),
        year: z.string(),
        major: z.string(),
        headshot: z.string()
    })
});

const stulife = defineCollection({
    loader: file('src/data/kabamilya/stulife.json'),
    schema: z.object({
        id: z.string(),
        position: z.string(),
        year: z.string(),
        major: z.string(),
        headshot: z.string()
    })
});

const communications = defineCollection({
    loader:file('src/data/kabamilya/communications.json'),
    schema: z.object({
        id: z.string(),
        position: z.string(),
        year: z.string(),
        major: z.string(),
        headshot: z.string()
    })
});

// 5. Export a single `collections` object to register your collection(s)
export const collections = { kabamilya, presidential, finance, internals, externals, academic, stulife, communications };