'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, FileText, User, Users } from 'lucide-react';

type Role = 'organizer' | 'model' | 'md';

interface BottomTabBarProps {
  role: Role;
}

export function BottomTabBar({ role }: BottomTabBarProps) {
  const pathname = usePathname();

  const getTabs = () => {
    switch (role) {
      case 'organizer':
        return [
          { name: '내 공고', href: '/organizer/dashboard', icon: Home },
          { name: '알림', href: '/organizer/notifications', icon: FileText },
          { name: '내 정보', href: '/organizer/profile', icon: User },
        ];
      case 'model':
        return [
          { name: '알바 찾기', href: '/model/jobs', icon: Search },
          { name: '지원 내역', href: '/model/applications', icon: FileText },
          { name: '내 프로필', href: '/model/profile', icon: User },
        ];
      case 'md':
        return [
          { name: '소속 모델', href: '/md/models', icon: Users },
          { name: '알바 대리 지원', href: '/md/jobs', icon: Search },
          { name: '내 정보', href: '/md/profile', icon: User },
        ];
    }
  };

  const tabs = getTabs();

  return (
    <div className="fixed bottom-0 w-full max-w-[480px] bg-white border-t border-gray-100 pb-[env(safe-area-inset-bottom)] z-50">
      <div className="flex justify-around items-center h-16">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = pathname.startsWith(tab.href);
          
          return (
            <Link 
              key={tab.name} 
              href={tab.href}
              className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${
                isActive ? 'text-[var(--color-toss-text)]' : 'text-gray-400'
              }`}
            >
              <Icon size={24} strokeWidth={isActive ? 2.5 : 2} className={isActive ? 'text-[var(--color-toss-text)]' : ''} />
              <span className={`text-[10px] ${isActive ? 'font-bold' : 'font-medium'}`}>
                {tab.name}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
