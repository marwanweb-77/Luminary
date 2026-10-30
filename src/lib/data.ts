export interface Comment {
  id: string;
  author: string;
  avatar: string;
  content: string;
  timestamp: string;
  likes: number;
}

export interface Post {
  id: string;
  type: "article" | "poem" | "thought" | "insight" | "news" | "story";
  title: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    avatar: string;
    role: string;
    bio?: string;
  };
  tags: string[];
  readTime: number;
  publishedAt: string;
  likes: number;
  bookmarks: number;
  featured?: boolean;
  gradient?: string;
  comments?: Comment[];
}

export const SAMPLE_POSTS: Post[] = [
  {
    id: "1",
    type: "article",
    title: "The Art of Slow Thinking in a Fast World",
    excerpt:
      "We've built machines that think faster than us. But wisdom was never about speed — it was always about depth.",
    content: `We live in an epoch obsessed with throughput. Every metric we track—from response latency to algorithmic feed refresh rates—prizes the immediate over the profound. Yet history’s most enduring breakthroughs were rarely the fruit of velocity. They germinated in silent pauses, in walks taken without destination, in notebooks filled with unhurried scribbles.

When Blaise Pascal famously wrote that "all of humanity's problems stem from man's inability to sit quietly in a room alone," he could not have foreseen our hyper-connected, dopamine-engineered landscape. Today, sitting quietly in a room requires an act of conscious rebellion.

### The Tyranny of the Immediate
The modern digital ecosystem is constructed around a singular imperative: the continuous capture and monetization of human attention. Every infinite scroll, notification banner, and autoplay loop is optimized to bypass our prefrontal cortex and trigger instinctive, reactive responses. In doing so, we have traded contemplation for reaction, synthesis for surveillance.

Slow thinking is not merely the absence of speed; it is the deliberate cultivation of cognitive margin. It is the refusal to form opinions before examining evidence. It is the humility to acknowledge that understanding complex systems—whether geopolitical tensions, ecological balances, or the human soul—cannot be compressed into twenty-second video clips.

### Reclaiming the Sanctuary of Mind
To reclaim depth, we must institute boundaries that protect our interiority:
1. **Sacred Offline Intervals**: Treat undisturbed morning hours as inviolable intellectual territory.
2. **Deep Reading Rituals**: Engage with texts that resist casual skimming—works with intricate argumentation, poetic subtlety, or historical density.
3. **Intentional Silence**: Allow thoughts to complete their arcs before drowning them in fresh stimuli.

True wisdom was never a sprint. It is an enduring communion with reality, conducted at the speed of contemplation.`,
    author: {
      name: "Aisha Patel",
      avatar: "AP",
      role: "Philosopher & Writer",
      bio: "Writes on cognitive ecology, contemplative philosophy, and the future of human consciousness in high-tech environments.",
    },
    tags: ["Philosophy", "Mindfulness", "Culture"],
    readTime: 8,
    publishedAt: "2 days ago",
    likes: 2847,
    bookmarks: 412,
    featured: true,
    gradient: "from-violet-600 via-purple-500 to-indigo-600",
    comments: [
      {
        id: "c1",
        author: "Julian Vance",
        avatar: "JV",
        content: "Pascal's quote resonates so deeply today. Thank you for articulating the quiet rebellion of slowing down.",
        timestamp: "Yesterday",
        likes: 42,
      },
      {
        id: "c2",
        author: "Elena Rostova",
        avatar: "ER",
        content: "The concept of 'cognitive margin' is brilliantly stated. Going to bookmark and re-read this tomorrow morning.",
        timestamp: "12 hours ago",
        likes: 19,
      },
    ],
  },
  {
    id: "2",
    type: "poem",
    title: "Starlight Grammar",
    excerpt:
      "Between the consonants of constellations / and the vowels of silence / I learned to speak in the language of absence.",
    content: `Between the consonants of constellations
and the vowels of lunar silence,
I learned to speak in the syntax of absence.

The night sky is not empty;
it is an ancient letter written in silver ink,
sealed with gravitational patience.

We measure light by the years it took to reach us,
forgetting that what touches our retinas
is a ghost that set sail when mammoths roamed the tundra.

Look up tonight.
Do not ask what the darkness holds.
Ask what light was brave enough
to travel through four billion miles of emptiness
just to be held
in the palm of your iris.`,
    author: {
      name: "Elias Crane",
      avatar: "EC",
      role: "Poet",
      bio: "Poet and celestial observer based in Maine. Author of 'Vowels of the Tide' and recipient of the 2025 Horizon Lyric Prize.",
    },
    tags: ["Poetry", "Cosmos", "Language"],
    readTime: 3,
    publishedAt: "4 hours ago",
    likes: 1203,
    bookmarks: 287,
    gradient: "from-amber-500 via-orange-500 to-rose-500",
    comments: [
      {
        id: "c3",
        author: "Mira Thorne",
        avatar: "MT",
        content: "'The night sky is not empty; it is an ancient letter written in silver ink.' Pure chills. Breathless.",
        timestamp: "2 hours ago",
        likes: 31,
      },
    ],
  },
  {
    id: "3",
    type: "insight",
    title: "Why Boredom is a Design Choice",
    excerpt:
      "Every app optimized you for engagement. But the greatest thoughts in history emerged from the fertile soil of doing nothing.",
    content: `Neuroscience has long recognized the Default Mode Network (DMN)—the synchronized brain regions that activate specifically when a person is not engaged in goal-oriented, externally directed tasks.

When you stare blankly out the window of a moving train, when you sit quietly under an arbor, when you wash dishes without a podcast in your ears: the DMN ignites. It connects disparate memories, consolidates subconscious epiphanies, and stitches together lateral intuitions that linear focus could never uncover.

Modern software eradicated this state. Every micro-gap—the 30 seconds waiting for an elevator, the line at the grocery store, the pause between meetings—is immediately filled by pulling out a glowing rectangle. 

We engineered boredom out of our lives, and in doing so, we unwittingly paved over the fertile topsoil where original creative synthesis occurs. If you want better insights, don't read more books: spend thirty minutes every afternoon looking at a wall with nothing in your hands.`,
    author: {
      name: "Marcus Webb",
      avatar: "MW",
      role: "Cognitive Scientist",
      bio: "Cognitive scientist studying attention fragmentation and neuro-ergonomics at Oxford Mind Lab.",
    },
    tags: ["Psychology", "Technology", "Creativity"],
    readTime: 6,
    publishedAt: "1 day ago",
    likes: 3421,
    bookmarks: 891,
    featured: true,
    gradient: "from-emerald-500 via-teal-500 to-cyan-600",
    comments: [
      {
        id: "c4",
        author: "Clara Chen",
        avatar: "CC",
        content: "I started leaving my phone in another room during lunch breaks. The first week felt unbearable, but now it's my most creative window of the day.",
        timestamp: "18 hours ago",
        likes: 56,
      },
    ],
  },
  {
    id: "4",
    type: "thought",
    title: "On the Weight of Unread Books",
    excerpt:
      "A library is not a collection of what you've read. It's an atlas of who you intended to become.",
    content: `The Japanese have a word for it: *tsundoku* (積ん読)—the act of acquiring reading materials and letting them pile up in one's home without having read them yet.

For years, people view their unread stacks with guilt, as monuments to procrastination or wastefulness. But the essayist Nassim Nicholas Taleb introduced the antithetical concept of the **Antilibrary**: a private collection of unread books that serves as a humble reminder of everything you do not know.

Read books are far less valuable than unread ones. The library should contain as much of what you do not know as your financial means allow you to put there. You will accumulate more knowledge and more books as you grow older, and the growing number of unread books on the shelves will look at you menacingly. Indeed, the more you know, the larger the rows of unread books.

Let the unread volumes surround you not with shame, but with the quiet grandeur of infinite possibility.`,
    author: {
      name: "Sophia Lin",
      avatar: "SL",
      role: "Bibliophile & Essayist",
      bio: "Literary essayist, archivist, and host of the 'Margin Notes' symposium.",
    },
    tags: ["Books", "Identity", "Reflection"],
    readTime: 4,
    publishedAt: "3 days ago",
    likes: 1876,
    bookmarks: 543,
    gradient: "from-rose-500 via-pink-500 to-fuchsia-600",
  },
  {
    id: "5",
    type: "news",
    title: "The Renaissance of Long-Form Journalism",
    excerpt:
      "Amid algorithmic noise, readers are returning to the 5,000-word essay. Depth is making a comeback.",
    content: `Across global independent publishing networks, a remarkable counter-trend is quietly taking root. Despite predictions that human attention spans would permanently diminish to the length of a swipeable video, reader metrics across decentralized literary platforms show reader retention on long-form essays (3,000 to 10,000 words) has climbed by over 47% in the past eighteen months.

Readers are fatigued by outrage-driven news feeds designed to elevate tension without providing resolution. The emerging preference is not for brief summaries, but for comprehensive, deeply researched pieces that treat the reader as an intelligent co-investigator.

Publication collectives from Berlin to Kyoto report that subscribers are deliberately scheduling weekend "reading hours"—treating long-form investigation like literature rather than transactional news. Depth is not an obsolete luxury; it is becoming the ultimate differentiator in an ocean of synthetic sludge.`,
    author: {
      name: "David Okonkwo",
      avatar: "DO",
      role: "Media Critic",
      bio: "Investigative journalist and media analyst examining digital culture and independent news networks.",
    },
    tags: ["Journalism", "Culture", "Media"],
    readTime: 7,
    publishedAt: "5 hours ago",
    likes: 892,
    bookmarks: 234,
    gradient: "from-blue-500 via-cyan-500 to-sky-600",
  },
  {
    id: "6",
    type: "story",
    title: "The Last Cartographer",
    excerpt:
      "In a world where satellites had mapped everything, she kept drawing maps of places that didn't exist yet.",
    content: `The planetary satellites could measure the curvature of a granite cobblestone in Samarkand to within three micrometers. Every square meter of terrestrial soil had been photographed, cataloged, elevation-mapped, and indexed into the global mesh. There were no blank corners left on the globe.

Except in the studio of Karen Vael.

Her atelier smelled of beeswax, crushed lapis lazuli, and raw parchment paper imported from an old mill in the Pyrenees. Along her cedar drawing tables lay calipers, compasses of burnished brass, and inks derived from walnut shells.

"What are you mapping, Karen?" the inspectors would ask with courteous bewilderment. "The orbital grid is complete. There is nothing unlocated."

"You map where things are," Karen said without lifting her goose quill. "I map where things yearn to be."

Her maps charted the valleys between regret and forgiveness. They showed the shoreline where childhood memories slowly turn to sea salt. They gave coordinates to forgotten friendships and drafted topographical contour lines around loneliness. And when travelers held her maps against the moonlight, they whispered that their compass needles stopped pointing magnetic north—and began pointing directly toward home.`,
    author: {
      name: "Nadia Frost",
      avatar: "NF",
      role: "Fiction Writer",
      bio: "Novelist exploring magical realism, cartography of memory, and speculative futures.",
    },
    tags: ["Fiction", "Wonder", "Maps"],
    readTime: 12,
    publishedAt: "6 days ago",
    likes: 4201,
    bookmarks: 1102,
    featured: true,
    gradient: "from-indigo-500 via-violet-500 to-purple-600",
  },
];

export const POST_TYPE_CONFIG = {
  article: {
    label: "Article",
    color: "text-violet-400",
    bg: "bg-violet-500/10",
    border: "border-violet-500/20",
    icon: "📝",
  },
  poem: {
    label: "Poem",
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    icon: "✨",
  },
  insight: {
    label: "Insight",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    icon: "💡",
  },
  thought: {
    label: "Thought",
    color: "text-rose-400",
    bg: "bg-rose-500/10",
    border: "border-rose-500/20",
    icon: "💭",
  },
  news: {
    label: "News",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    icon: "📰",
  },
  story: {
    label: "Story",
    color: "text-indigo-400",
    bg: "bg-indigo-500/10",
    border: "border-indigo-500/20",
    icon: "📖",
  },
} as const;
