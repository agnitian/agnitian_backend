import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Define schema inline to avoid import issues
interface IBlog {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  tags: string[];
  image?: string;
  published: boolean;
  readTime?: number;
}

const blogSchema = new mongoose.Schema<IBlog>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    excerpt: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      default: 'Agnitian',
    },
    category: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    image: {
      type: String,
      default: null,
    },
    published: {
      type: Boolean,
      default: false,
    },
    readTime: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Blog = mongoose.model<IBlog>('Blog', blogSchema);

// Helper function to generate slug
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Ensure all blogs have slugs
const sampleBlogs = [
  {
    title: 'Moving Generative AI from Hype to Production',
    slug: 'genai-production',
    excerpt: 'The gap between GPT demos and production systems is vast. Learn how to bridge it with RAG, knowledge bases, and real-world constraints.',
    content: 'Full article content here...',
    author: 'Agnitian Research',
    category: 'AI',
    tags: ['Generative AI', 'Production', 'RAG', 'LLM'],
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT28ffmdl5EM4_CsdpZKkz9O-qEVbDhzjS6lQ&s',
    published: true,
    readTime: 8
  },
  {
    title: 'Autonomous Agents: Beyond Hardcoded Workflows',
    slug: 'agent-workflows',
    excerpt: 'Why agents are replacing traditional automation. Understanding planning, reasoning, and autonomous execution in business systems.',
    content: 'Full article content here...',
    author: 'Agnitian Research',
    category: 'Technology',
    tags: ['Agents', 'Automation', 'AI', 'Workflow'],
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-G3W8fM0LYf43i22wsCxTnwJeLAGE43_OeQ&s',
    published: true,
    readTime: 10
  },
  {
    title: 'Building Platforms for Authentic Storytelling',
    slug: 'creator-economy',
    excerpt: 'How platforms like Lovever are transforming content creation through community, authenticity, and multi-format distribution.',
    content: 'Full article content here...',
    author: 'Agnitian Research',
    category: 'Business',
    tags: ['Creator Economy', 'Platform', 'Community'],
    image: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=500&h=300&fit=crop',
    published: true,
    readTime: 7
  },
  {
    title: 'Long-Form Content: The SEO Advantage for Thought Leaders',
    slug: 'seo-strategy',
    excerpt: 'Why research-driven, long-form content outperforms shallow articles in search rankings and audience retention.',
    content: 'Full article content here...',
    author: 'Agnitian Research',
    category: 'Business',
    tags: ['SEO', 'Content Marketing', 'Strategy'],
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop',
    published: true,
    readTime: 9
  },
  {
    title: 'The Future of Medical Knowledge: AI Systems in Healthcare',
    slug: 'ai-healthcare',
    excerpt: 'Exploring role-specific medical intelligence, image analysis, and how ALMedics is transforming clinical knowledge delivery.',
    content: 'Full article content here...',
    author: 'Agnitian Research',
    category: 'AI',
    tags: ['Healthcare', 'AI', 'Medical Knowledge', 'ALMedics'],
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=500&h=300&fit=crop',
    published: true,
    readTime: 11
  },
  {
    title: 'Natural Language Finance: Automating Financial Operations with AI',
    slug: 'finance-automation',
    excerpt: 'How AI agents are simplifying financial management through natural language interfaces and prompt-based automation.',
    content: 'Full article content here...',
    author: 'Agnitian Research',
    category: 'Business',
    tags: ['Finance', 'Automation', 'AI Agents'],
    image: 'https://images.unsplash.com/photo-1553729784-e91953dec042?w=500&h=300&fit=crop',
    published: true,
    readTime: 8
  },
  {
    title: 'Getting Started with AI',
    slug: 'getting-started-ai',
    excerpt: 'Learn the fundamentals of artificial intelligence and how it can transform your business.',
    content: `Artificial Intelligence is revolutionizing every industry. From healthcare to finance, AI is enabling organizations to make better decisions, automate processes, and create new value.

In this guide, we'll explore the basics of AI, key concepts like machine learning and neural networks, and practical applications you can implement today.

## What is AI?

AI refers to the simulation of human intelligence by machines. This includes learning, reasoning, and self-correction capabilities.

## Key Areas of AI

1. **Machine Learning** - Systems that learn from data
2. **Deep Learning** - Neural networks with multiple layers
3. **Natural Language Processing** - Understanding human language
4. **Computer Vision** - Processing and analyzing images

## Why Now?

The convergence of big data, powerful computing, and advanced algorithms has made AI accessible to businesses of all sizes. Whether you're in healthcare, retail, or finance, AI can unlock new opportunities.`,
    author: 'Agnitian',
    category: 'AI',
    tags: ['ai', 'beginner', 'guide'],
    published: true
  },
  {
    title: 'The Future of Web Development in 2024',
    excerpt: 'Explore the latest trends and technologies shaping web development.',
    content: `Web development is evolving at an incredible pace. New frameworks, tools, and best practices emerge constantly. Let's dive into what to expect in 2024.

## AI-Powered Development

AI assistants are transforming how developers write code. From code generation to debugging, AI is becoming an indispensable tool.

## Full-Stack Frameworks

Modern frameworks like Next.js, Remix, and Svelte are making it easier to build performant, user-friendly applications.

## Web Performance

With Core Web Vitals becoming increasingly important, performance optimization is no longer optional.

## Conclusion

The future of web development is exciting. By staying updated with trends and investing in continuous learning, you can stay ahead of the curve.`,
    author: 'Agnitian',
    category: 'Web Development',
    tags: ['web', 'development', 'trends', '2024'],
    published: true
  },
  {
    title: 'Business Automation with AI Agents',
    excerpt: 'Discover how AI agents can automate repetitive tasks and improve efficiency.',
    content: `AI agents are autonomous systems that can perform tasks without human intervention. They're ideal for automating business processes.

## What are AI Agents?

AI agents are intelligent programs that observe their environment, make decisions, and take actions to achieve specific goals.

## Real-World Applications

- **Customer Service** - 24/7 support without human agents
- **Data Processing** - Automating data entry and analysis
- **Scheduling** - Managing calendars and meetings
- **Email Management** - Sorting and prioritizing messages

## Getting Started

To implement AI agents in your organization, start with simple automation tasks and gradually increase complexity. Measure ROI at each step.`,
    author: 'Agnitian',
    category: 'Business',
    tags: ['business', 'automation', 'ai-agents'],
    published: true
  },
  {
    title: 'TypeScript Best Practices',
    excerpt: 'Master TypeScript and write more robust, maintainable code.',
    content: `TypeScript adds a layer of type safety to JavaScript, catching errors before runtime and improving developer experience.

## Why TypeScript?

1. **Type Safety** - Catch errors during development
2. **Better IDE Support** - Autocomplete and refactoring
3. **Self-Documenting Code** - Types serve as documentation
4. **Easier Refactoring** - Change code with confidence

## Essential Tips

- Use strict mode in tsconfig.json
- Avoid using 'any' type
- Leverage union and intersection types
- Create reusable type definitions

## Conclusion

TypeScript is becoming the standard for large-scale JavaScript projects. Learning it will make you a better developer.`,
    author: 'Agnitian',
    category: 'Technology',
    tags: ['typescript', 'javascript', 'best-practices'],
    published: true
  }
];

async function seedDatabase() {
  try {
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/agnitian-blog';
    
    await mongoose.connect(MONGODB_URI);
    console.log('✓ MongoDB connected successfully');

    // Clear existing blogs
    await Blog.deleteMany({});
    console.log('✓ Cleared existing blogs');

    // Ensure all blogs have slugs
    const blogsWithSlugs = sampleBlogs.map((blog: any) => ({
      ...blog,
      slug: blog.slug || generateSlug(blog.title)
    }));

    // Insert sample blogs
    const created = await Blog.insertMany(blogsWithSlugs);
    console.log(`✓ Created ${created.length} sample blogs`);

    // List created blogs
    const blogs = await Blog.find({});
    console.log('\n📚 Sample Blogs:');
    blogs.forEach((blog) => {
      console.log(`  - ${blog.title} (slug: ${blog.slug})`);
    });

    console.log('\n✓ Database seeding complete!');
    process.exit(0);
  } catch (error) {
    console.error('✗ Seeding failed:', error);
    process.exit(1);
  }
}

seedDatabase();
