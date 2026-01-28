import { MobileAppLayout } from '@/components/mobile/MobileAppLayout';

/**
 * Mobile App Page
 * Optimized for mobile devices with responsive design
 * Access at: /mobile or on mobile viewport
 */
export const metadata = {
  title: 'TPB Manage - Mobile',
  description: 'Mobile application for store management',
};

export default function MobileApp() {
  return (
    <div className="h-screen w-screen overflow-hidden">
      <MobileAppLayout />
    </div>
  );
}
