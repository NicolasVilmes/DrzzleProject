import { Request, Response } from "express";
import { eq } from "drizzle-orm";
import { db } from "../../db";
import { NewUser, insertUserSchema, users } from "../../db/schema";

export async function getUsersPosts( req:Request, res:Response): Promise<Response> {
  try { 
    const { id } = req.params


    const user = await db.query.users.findFirst({
      where: eq(users.id, id),
      with: {
        posts : true
      }
    })

    if (!user) {
      return res.status(404).send({ message: "User with Id not found"})
    }

    return res.send(user)
  } catch (e) {
    console.log(e);
    return res.status(500).send({message: "error encouterer"})
  }
  
}



export async function createUser( req:Request, res:Response): Promise<Response> {
  try { 
    const { name } = req.body

    const newUser = insertUserSchema.parse({name})

    
    const results: NewUser[] = await db.insert(users).values(newUser).returning()
    
    if (!results || results.length < 1) {
      return res.status(500).send({message: "User could not be created"})
    }

return res.send(results[0])
  } catch (e) {
    console.log(e);
    return res.status(500).send({message: "error encouterer"})
  }
  
}

