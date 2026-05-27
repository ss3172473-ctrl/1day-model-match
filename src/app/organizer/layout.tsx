import { BottomTabBar } from '@/components/layout/BottomTabBar';

export default function OrganizerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <BottomTabBar role="organizer" />
    </>
  );
}
