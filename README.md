# Agnitian Blog Backend API

A RESTful API backend for managing blog posts with MongoDB and Express.js. This is a standalone backend service separate from the Agnitian Web frontend.

## Features

- ✓ Full CRUD operations for blog posts
- ✓ MongoDB integration with Mongoose
- ✓ Search, filter, and pagination
- ✓ Auto-generated slugs and read time calculation
- ✓ Category and tag support
- ✓ CORS enabled for frontend integration
- ✓ TypeScript support
- ✓ Error handling and validation

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB
- **Language:** TypeScript
- **CORS:** Express CORS middleware

## Project Structure

```
agnitian-backend/
├── src/
│   ├── config/
│   │   └── db.ts              # MongoDB connection
│   ├── controllers/
│   │   └── blogController.ts  # Blog logic
│   ├── models/
│   │   └── Blog.ts            # Blog schema
│   ├── routes/
│   │   └── blogRoutes.ts      # API routes
│   ├── middleware/
│   │   └── errorHandler.ts    # Error handling
│   └── server.ts              # Main server file
├── package.json
├── tsconfig.json
├── .env.example
└── README.md
```

## Installation

1. **Clone/Create the project:**
   ```bash
   cd c:\Users\bicke\Downloads\agnitian-backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create `.env` file** (copy from `.env.example`):
   ```bash
   cp .env.example .env
   ```

4. **Configure MongoDB connection:**
   
   **Option A: Local MongoDB**
   ```
   MONGODB_URI=mongodb://localhost:27017/agnitian-blog
   ```

   **Option B: MongoDB Atlas (Cloud)**
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/agnitian-blog?retryWrites=true&w=majority
   ```

5. **Set CORS origin** (for frontend):
   ```
   CORS_ORIGIN=http://localhost:3000
   ```

## Running the Server

### Development Mode
```bash
npm run dev
```
Starts the server with hot-reload on `http://localhost:5000`

### Production Mode
```bash
npm run build
npm start
```
Builds TypeScript and runs production server

### Health Check
```bash
curl http://localhost:5000/api/health
```

## API Endpoints

### Get All Blogs
```http
GET /api/blogs
```
**Query Parameters:**
- `page` (default: 1) - Page number
- `limit` (default: 10) - Items per page
- `category` - Filter by category (AI, Technology, Business, Web Development, Tutorial, News)
- `tag` - Filter by tag
- `search` - Search in title, excerpt, content

**Example:**
```bash
curl "http://localhost:5000/api/blogs?category=AI&page=1&limit=5"
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "...",
      "title": "Getting Started with AI",
      "slug": "getting-started-with-ai",
      "excerpt": "...",
      "content": "...",
      "author": "Agnitian",
      "category": "AI",
      "tags": ["ai", "beginner"],
      "published": true,
      "readTime": 5,
      "createdAt": "2024-01-19T...",
      "updatedAt": "2024-01-19T..."
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 5,
    "total": 12,
    "pages": 3
  }
}
```

### Get Blog by Slug
```http
GET /api/blogs/slug/:slug
```
**Example:**
```bash
curl http://localhost:5000/api/blogs/slug/getting-started-with-ai
```

### Get Blog by ID
```http
GET /api/blogs/:id
```

### Get Categories
```http
GET /api/blogs/categories
```

### Get All Tags
```http
GET /api/blogs/tags
```

### Create Blog (Admin)
```http
POST /api/blogs/create
Content-Type: application/json

{
  "title": "Blog Title",
  "excerpt": "Brief description",
  "content": "Full blog content...",
  "author": "Author Name",
  "category": "AI",
  "tags": ["tag1", "tag2"],
  "image": "https://example.com/image.jpg",
  "published": false
}
```

### Update Blog
```http
PUT /api/blogs/:id
Content-Type: application/json

{
  "title": "Updated Title",
  "published": true
}
```

### Delete Blog
```http
DELETE /api/blogs/:id
```

## MongoDB Schema

```typescript
Blog {
  title: String (required, max 200)
  slug: String (required, unique)
  excerpt: String (required, max 500)
  content: String (required)
  author: String (default: "Agnitian")
  category: String (required, enum: AI|Technology|Business|Web Development|Tutorial|News)
  tags: [String]
  image: String
  published: Boolean (default: false)
  readTime: Number (auto-calculated)
  createdAt: Date (auto-generated)
  updatedAt: Date (auto-generated)
}
```

## Environment Variables

Create a `.env` file in the root directory:

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/agnitian-blog

# Server Configuration
PORT=5000
NODE_ENV=development

# CORS
CORS_ORIGIN=http://localhost:3000
```

## Frontend Integration

In your React app (`agnitian_web`), fetch blogs like this:

```typescript
// src/lib/blogApi.ts
const API_BASE = 'http://localhost:5000/api/blogs';

export async function fetchBlogs(page = 1, category?: string) {
  const params = new URLSearchParams({
    page: String(page),
    limit: '10',
    ...(category && { category })
  });
  const res = await fetch(`${API_BASE}?${params}`);
  return res.json();
}

export async function fetchBlogBySlug(slug: string) {
  const res = await fetch(`${API_BASE}/slug/${slug}`);
  return res.json();
}
```

Then use in your Blog page:

```typescript
// src/pages/Blog.tsx
import { useEffect, useState } from 'react';
import { fetchBlogs } from '@/lib/blogApi';

export default function Blog() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetchBlogs().then(res => setBlogs(res.data));
  }, []);

  return (
    // Render blogs...
  );
}
```

## MongoDB Setup

### Local MongoDB
1. Install MongoDB Community Edition
2. Start MongoDB service:
   ```bash
   mongod
   ```

### MongoDB Atlas (Recommended)
1. Create account at [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
2. Create a cluster
3. Get connection string and add to `.env`

## Error Handling

All errors return JSON with `success: false` and `message`:

```json
{
  "success": false,
  "message": "Blog not found"
}
```

Status codes:
- `200` - Success
- `201` - Created
- `400` - Bad request / Validation error
- `404` - Not found
- `500` - Server error

## Next Steps

1. Set up MongoDB locally or Atlas
2. Run `npm install`
3. Configure `.env` file
4. Start server with `npm run dev`
5. Connect frontend to API endpoints
6. Add authentication middleware for admin routes (optional)
7. Add image upload handling (optional)

## License

MIT
