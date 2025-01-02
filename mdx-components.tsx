import type { MDXComponents } from 'mdx/types'
import Image from 'next/image'

// eslint-disable-next-line
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    img: (props) => (
      <Image
        sizes="100vw"
        style={{ width: '100%', height: 'auto' }}
        {...props}
      />
    ),
    ...components,
  }
}
