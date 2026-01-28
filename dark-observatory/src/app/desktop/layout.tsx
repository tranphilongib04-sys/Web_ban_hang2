import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Desktop App - Dashboard',
  description: 'MacBook Desktop Application',
};

export default function DesktopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
