import mongoose from 'mongoose';
const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Blog title is required'],
        trim: true,
        maxlength: [200, 'Title cannot exceed 200 characters']
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    excerpt: {
        type: String,
        required: [true, 'Blog excerpt is required'],
        maxlength: [500, 'Excerpt cannot exceed 500 characters']
    },
    content: {
        type: String,
        required: [true, 'Blog content is required']
    },
    author: {
        type: String,
        required: [true, 'Author name is required'],
        default: 'Agnitian'
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        enum: ['AI', 'Technology', 'Business', 'Web Development', 'Tutorial', 'News']
    },
    tags: {
        type: [String],
        default: []
    },
    image: {
        type: String,
        default: null
    },
    published: {
        type: Boolean,
        default: false
    },
    readTime: {
        type: Number,
        default: 0
    }
}, { timestamps: true });
// Auto-calculate read time (rough estimate: 200 words per minute)
blogSchema.pre('save', function (next) {
    if (this.content) {
        const wordCount = this.content.split(/\s+/).length;
        this.readTime = Math.ceil(wordCount / 200);
    }
    next();
});
// Auto-generate slug from title if not provided
blogSchema.pre('save', function (next) {
    if (!this.slug && this.title) {
        this.slug = this.title
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_]+/g, '-')
            .replace(/^-+|-+$/g, '');
    }
    next();
});
const Blog = mongoose.model('Blog', blogSchema);
export default Blog;
//# sourceMappingURL=Blog.js.map