import { BottomTabBar } from '@/components/layout/BottomTabBar';

export default function MdLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <BottomTabBar role="md" />
    </>
  );
}
