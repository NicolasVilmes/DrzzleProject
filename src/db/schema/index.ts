import { InferInsertModel, InferSelectModel, relations } from "drizzle-orm";
import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

export const posts = pgTable('posts', {
  id: uuid('id').defaultRandom().primaryKey(),
  authorId: uuid('authorId').notNull(),
  title: varchar('tittle', { length: 256 }).notNull(),
  content: varchar('content', { length: 256 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull()
});

export const postsRelations = relations(posts, ({ one }) => ({
  author: one(users, {
    fields: [posts.authorId],
    references: [users.id]
  })
}))

export type Post = InferSelectModel<typeof posts>
export type NewPost = InferInsertModel<typeof posts>

export const insertPostSchema = createInsertSchema(posts)



export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', {length: 256}).notNull()
})

export const usersRelation = relations(users, ({ many }) => ({
  posts: many(posts)  
}))


export type User = InferInsertModel<typeof users>
export type NewUser = InferInsertModel<typeof users>

export const insertUserSchema = createInsertSchema(users)
