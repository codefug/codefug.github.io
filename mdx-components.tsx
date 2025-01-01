import type { MDXComponents } from 'mdx/types'

// eslint-disable-next-line
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
  }
}
