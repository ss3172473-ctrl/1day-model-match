import { BottomTabBar } from '@/components/layout/BottomTabBar';

export default function ModelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <BottomTabBar role="model" />
    </>
  );
}
