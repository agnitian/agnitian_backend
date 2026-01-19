import mongoose from 'mongoose';
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
    createdAt: Date;
    updatedAt: Date;
    readTime?: number;
}
declare const Blog: mongoose.Model<IBlog, {}, {}, {}, mongoose.Document<unknown, {}, IBlog, {}, {}> & IBlog & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>;
export default Blog;
//# sourceMappingURL=Blog.d.ts.map