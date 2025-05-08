import '@/styles/tailwind.css'
import { Metadata } from 'next'
import { Provider } from '@/components/ui/provider'

export const metadata: Metadata = {
  title: 'Test 1',
  description: 'Test 1',
}

export default function Test1Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return <Provider>{children}</Provider>
}
