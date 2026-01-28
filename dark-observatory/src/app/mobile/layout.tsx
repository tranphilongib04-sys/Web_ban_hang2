import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'TPB Manage - Mobile',
  description: 'Mobile application for TPB store management',
};

export default function MobileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
