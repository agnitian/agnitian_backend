import { Request, Response } from 'express';
export declare function getAllBlogs(req: Request, res: Response): Promise<void>;
export declare function getBlogBySlug(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function getBlogById(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function createBlog(req: Request, res: Response): Promise<void>;
export declare function updateBlog(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function deleteBlog(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function getCategories(req: Request, res: Response): Promise<void>;
export declare function getTags(req: Request, res: Response): Promise<void>;
//# sourceMappingURL=blogController.d.ts.map