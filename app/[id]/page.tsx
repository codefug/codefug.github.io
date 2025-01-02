import { readdir } from 'fs/promises'
import path from 'path'

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const { default: Post } = await import(`@/posts/${id}/content.mdx`)

  return <Post />
}

export async function generateStaticParams() {
  const posts = path.join('posts')
  const directories = await readdir(posts)
  const paths = directories.map((id) => ({
    id,
  }))
  return paths
}

export const dynamicParams = false
