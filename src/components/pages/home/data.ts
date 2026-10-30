/*
|-----------------------------------------
| setting up data.ts for the App
| @author: Toufiquer Rahman<toufiquer.0@gmail.com>
| @copyright: Toufiquer, 31 October, 2026
|-----------------------------------------
*/

export type HomeCard = { title: string; description: string };
export type HomeData = {
  forceUpdate: "true" | "false";
  paddingX: number;
  paddingY: number;
  eyebrow: string;
  title: string;
  intro: string;
  imageUrl: string;
  imageAlt: string;
  sectionsJson: string;
};

// These eleven editable content blocks correspond to the eleven sections after the hero.
export const defaultCards: HomeCard[] = [
  {
    title: "Find your way to fluent",
    description: "Different goals, one important skill: the confidence to express yourself in English.",
  },
  {
    title: "Make your voice your advantage",
    description:
      "Prepare for IELTS Speaking with a focus on expressing ideas clearly and communicating with confidence.",
  },
  {
    title: "Every skill. One clear direction.",
    description: "Bring your IELTS preparation together across listening, reading, writing and speaking.",
  },
  {
    title: "Big confidence starts small",
    description:
      "Give young learners a welcoming introduction to spoken English through engaging, age-appropriate practice.",
  },
  {
    title: "More moments worth sharing",
    description: "Build the confidence to use English in everyday conversations, family life and beyond.",
  },
  {
    title: "Speak with purpose at work",
    description: "Develop practical English communication for meetings, presentations and professional conversations.",
  },
  {
    title: "A better way to find your words",
    description: "Learning is more meaningful when it connects to the conversations you want to have.",
  },
  {
    title: "Learning comes to life",
    description: "Discover the many ways English can become part of your everyday world.",
  },
  {
    title: "Every journey has a story",
    description:
      "The best stories come from real learners. Student experiences will be shared here when verified feedback is available.",
  },
  {
    title: "A little clarity goes a long way",
    description: "Have questions about finding the right course? Start here, or get in touch with our team.",
  },
  {
    title: "Your next chapter starts with a conversation",
    description:
      "Whatever your goal, there is a place to begin. Get in touch and explore your next step with Speakora.",
  },
];
export const defaultHomeCard: HomeCard = { title: "", description: "" };
export const defaultData: HomeData = {
  forceUpdate: "false",
  paddingX: 0,
  paddingY: 0,
  eyebrow: "English for every ambition",
  title: "Find your voice. Open your world.",
  intro:
    "From your first conversation to your next big opportunity, learn to communicate in English with clarity and confidence.",
  imageUrl: "/images/speakora/students.jpg",
  imageAlt: "A group of learners talking together around a table",
  sectionsJson: JSON.stringify(defaultCards),
};

// Legacy storefront defaults are not suitable content for an English learning page.
const legacyTitles = new Set([
  "Electronics for everyday life",
  "Start with what matters",
  "Find your fit",
  "Made for your routine",
  "A closer look",
  "Compare your options",
  "Keep it simple",
  "Explore at your pace",
  "For the way you live",
  "Your next discovery",
  "Ready to explore?",
]);
export function parseHomeCards(value: unknown): HomeCard[] {
  let parsed: unknown;
  try {
    parsed = typeof value === "string" ? JSON.parse(value) : null;
  } catch {
    parsed = null;
  }
  if (!Array.isArray(parsed)) return defaultCards.map((card) => ({ ...card }));
  return defaultCards.map((fallback, index) => {
    const item: unknown = parsed[index];
    if (!item || typeof item !== "object" || Array.isArray(item)) return { ...fallback };
    const candidate = item as Record<string, unknown>;
    if (typeof candidate.title === "string" && legacyTitles.has(candidate.title)) return { ...fallback };
    return {
      title: typeof candidate.title === "string" && candidate.title.trim() ? candidate.title : fallback.title,
      description:
        typeof candidate.description === "string" && candidate.description.trim()
          ? candidate.description
          : fallback.description,
    };
  });
}
export function homeValues(data?: Partial<HomeData>): HomeData {
  const values = { ...defaultData, ...data };
  if (values.title === "Electronics for your everyday" || values.title === "Online shopping across Bangladesh") {
    return {
      ...values,
      eyebrow: defaultData.eyebrow,
      title: defaultData.title,
      intro: defaultData.intro,
      imageUrl: defaultData.imageUrl,
      imageAlt: defaultData.imageAlt,
    };
  }
  return values;
}

export const courses = [
  {
    title: "IELTS Speaking",
    label: "Speak with confidence",
    image: "/images/speakora/group.jpg",
    target: "ielts-speaking",
  },
  { title: "Complete IELTS", label: "Prepare for every skill", image: "/images/speakora/study.jpg", target: "ielts" },
  {
    title: "Spoken English for Kids",
    label: "A playful first step",
    image: "/images/speakora/children.jpg",
    target: "kids",
  },
  {
    title: "Spoken English for Parents",
    label: "For everyday connection",
    image: "/images/speakora/family.jpg",
    target: "parents",
  },
  {
    title: "Executive Spoken English",
    label: "Communicate at work",
    image: "/images/speakora/business.jpg",
    target: "executive",
  },
];
export const faqs = [
  {
    question: "Which courses does Speakora offer?",
    answer:
      "Speakora offers IELTS Speaking, complete IELTS preparation, Spoken English for Kids, Spoken English for Parents, and Executive Spoken English.",
  },
  {
    question: "How do I choose the right course?",
    answer:
      "Think about your goals and the conversations you want to feel more confident in. Contact Speakora for help choosing a course.",
  },
  {
    question: "Who can join the courses?",
    answer:
      "There are programs for IELTS learners, children, parents, and working professionals. Contact the team to discuss your needs and course eligibility.",
  },
  {
    question: "Are classes online or in person?",
    answer: "Please contact Speakora for the current learning formats and availability for your chosen course.",
  },
  {
    question: "How can I enroll?",
    answer: "Contact Speakora to ask about enrollment, course details, and the next available steps.",
  },
];
