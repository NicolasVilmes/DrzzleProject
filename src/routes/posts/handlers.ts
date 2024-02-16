import { Request, Response } from "express";
import { db } from "../../db";
import { NewPost, Post, insertPostSchema, posts } from "../../db/schema";
import { eq } from "drizzle-orm";

export async function getPost(req: Request, res: Response): Promise<Response> {
  try {
    const { id } = req.params;

    const allPosts: Post[] = await db.select().from(posts).where(eq(posts.id, id));
    if (allPosts.length < 1) {
      return res.status(404).send({ message: 'post not found'})
    }

    return res.send(allPosts[0])
  } catch (e) {
    console.log(e);
    return res.status(500).send({ message: 'error encoutered'})
  }
}

export async function getPosts( req: Request, res: Response): Promise<Response> {
  try {
    const allPosts: Post[] = await db.select().from(posts)
    

    return res.send(allPosts)
  } catch(e) {
    console.log(e);
    return res.status(500).send({message: "error encouterer"})
  }
}

export async function createPost( req: Request, res: Response): Promise<Response> {
  try {
    const { title, content, authorId } = req.body;

    const NewPost = insertPostSchema.parse({title, content, authorId})

    const results: NewPost[] = await db.insert(posts).values(NewPost).returning()


    if (!results || results.length < 1) {
      return res.status(500).send({ message: 'Post could not be created' })
      
    }

    return res.send(results[0])
  } catch(e) {
    console.log(e);
    return res.status(500).send({message: "error encouterer"})
  }
}

export async function updatePost( req: Request, res: Response): Promise<Response> {
  try {
    const { id } = req.params
    const { title, content } = req.body

    const updatePost = insertPostSchema.partial({title: true, content: true}).parse({title, content})

    
    const updatePosts: Post[] = await db.update(posts).set(updatePost).where(eq(posts.id, id)).returning()
    
    if (!updatePosts || updatePosts.length < 1) {
      return res.status(404).send({ message: 'Post could not be encountered.'})
    }

    return res.send(updatePosts[0])

  } catch(e) {
    console.log(e);
    return res.status(500).send({message: "error encouterer"})
  }
}

export async function deletePost( req: Request, res: Response): Promise<Response> {
  try {
    const { id } = req.body
    const deletedPosts = await db.delete(posts).where(eq(posts.id, id)).returning({ id: posts.id })
    
    if (!deletedPosts || deletedPosts.length < 1) {
      return res.status(404).send({ message: 'Post could not be founde' })
      
    }

    return res.send({deletePost: deletedPosts[0]})

  } catch(e) {
    console.log(e);
    return res.status(500).send({message: "error encouterer"})
  }
}