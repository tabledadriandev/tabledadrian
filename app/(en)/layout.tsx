import { RootShell, baseMetadata } from '../root-shell'

export { viewport } from '../root-shell'
export const metadata = baseMetadata

export default function EnglishRootLayout({ children }: { children: React.ReactNode }) {
  return <RootShell lang="en">{children}</RootShell>
}
