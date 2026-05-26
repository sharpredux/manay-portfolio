// ─── Default Content ────────────────────────────────────────────────────────
// These are the hard-coded fallback values shown when localStorage is empty.

const DEFAULTS = {
  experience: [
    {
      id: "exp-1",
      period: "2020 - Present",
      title: "Principal Architect",
      company: "Mila Manay Studio",
      description:
        "Leading a multidisciplinary team to design award-winning residential and commercial projects. Specializing in minimalist architecture that integrates natural topography with brutalist geometric forms.",
      photo: "",
    },
    {
      id: "exp-2",
      period: "2015 - 2020",
      title: "Senior Architect",
      company: "Oculus Design Group",
      description:
        "Directed the creative vision for major urban developments. Pioneered sustainable design practices by integrating smart-glass technology and passive cooling systems into high-density office buildings.",
      photo: "",
    },
    {
      id: "exp-3",
      period: "2012 - 2015",
      title: "Architectural Designer",
      company: "Foster & Partners",
      description:
        "Assisted in the conceptualization and drafting of international civic centers. Focused on parametric modeling and the structural execution of complex steel-frame canopies.",
      photo: "",
    },
  ],

  projects: [
    {
      id: "proj-1",
      title: "The Apex Pavilion",
      year: "2023",
      description:
        "Project photos and interviews focus heavily on negative space and architectural void.",
      label: "Ink-wash charm",
      imageUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBTRTffio0yVwGUd1jDBXV_PZ_92WQJW_YEHrg49uaQz1jnVIB4FlJbp3ku_PsatRfo3Qh7rsQ4cGwkNJM2ucVN55TXE49cFVLP86ulqarOSnmLgGGuracUibfJC80JxWnfyNM4maRdbQUjjlWHsTzZ8TbCp8j0dsaGRRjLMGpQadbQghZl7BBlQi2rVz_TBTUq-6z1kV4mGL8MP7RuGWG0eCiqruV89kllLPZgUTtYkx53zpYTUyHgR7idQTqEozMn0uNudMhKWYA",
    },
    {
      id: "proj-2",
      title: "Lumina Towers",
      year: "2022",
      description:
        "A brutalist exploration of light and shadow intersecting over a bustling urban landscape.",
      label: "Concrete geometry",
      imageUrl:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: "proj-3",
      title: "Echo Valley Residence",
      year: "2021",
      description:
        "A serene residential project built seamlessly into the rocky hillside with natural stone.",
      label: "Organic integration",
      imageUrl:
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: "proj-4",
      title: "Solaris Museum",
      year: "2024",
      description:
        "Modern cultural center utilizing massive skylights to naturally illuminate the galleries.",
      label: "Luminous interior",
      imageUrl:
        "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop",
    },
  ],

  contact: {
    email: "inquiries@elara-vance.com",
    address: "128 Modernist Way, Suite 400",
    city: "Los Angeles, CA 90012",
  },
};

// ─── Storage Key ─────────────────────────────────────────────────────────────
const STORAGE_KEY = "manay_portfolio_content";

// ─── Public API ──────────────────────────────────────────────────────────────

/** Load content from localStorage, falling back to defaults. */
export function loadContent() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return structuredClone(DEFAULTS);
    return JSON.parse(raw);
  } catch {
    return structuredClone(DEFAULTS);
  }
}

/** Save full content object to localStorage. */
export function saveContent(content) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
}

/** Reset all content back to hard-coded defaults. */
export function resetContent() {
  localStorage.removeItem(STORAGE_KEY);
  return structuredClone(DEFAULTS);
}

/** Generate a simple unique ID for new entries. */
export function newId(prefix = "item") {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

export { DEFAULTS };
