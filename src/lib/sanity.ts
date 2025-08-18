import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from '../sanity/env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === 'production',
})

// GROQ queries
export const POSTS_QUERY = `*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
  _id,
  title,
  slug,
  publishedAt,
  mainImage,
  "categories": categories[]->title,
  "author": author->name,
  body[0...2]
}`

export const POST_QUERY = `*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  publishedAt,
  mainImage,
  "categories": categories[]->title,
  "author": author->{name, image},
  body
}`

export const TEMPLATES_QUERY = `*[_type == "template" && isActive == true] | order(order asc, title asc) {
  _id,
  title,
  subtitle,
  description,
  category,
  badge,
  price,
  features,
  previewImage,
  demoUrl,
  downloadUrl,
  slug
}`

export const TEMPLATE_QUERY = `*[_type == "template" && slug.current == $slug][0] {
  _id,
  title,
  subtitle,
  description,
  longDescription,
  category,
  badge,
  price,
  features,
  previewImage,
  additionalImages,
  demoUrl,
  downloadUrl,
  techStack,
  includedFiles,
  slug
}`
