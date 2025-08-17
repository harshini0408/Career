import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, getUserRole } from '@/services/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';

interface MemberContextType {
  member: {
    profile: {
      name: string;
      title: string;
      email: string;
      avatarUrl?: string;
    };
  } | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  actions: {
    signOut: () => Promise<void>;
  };
}

const MemberContext = createContext<MemberContextType | undefined>(undefined);

export function MemberProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [member, setMember] = useState<MemberContextType['member']>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      
      if (user) {
        // Fetch user role and create member profile
        const role = await getUserRole(user.uid);
        setMember({
          profile: {
            name: user.displayName || 'User',
            title: role.charAt(0).toUpperCase() + role.slice(1),
            email: user.email || '',
            avatarUrl: user.photoURL || undefined
          }
        });
      } else {
        setMember(null);
      }
      
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signOut = async () => {
    const { logout } = await import('@/services/firebase');
    await logout();
  };

  return (
    <MemberContext.Provider 
      value={{
        member,
        isAuthenticated: !!user,
        isLoading,
        actions: { signOut }
      }}
    >
      {children}
    </MemberContext.Provider>
  );
}

export function useMember() {
  const context = useContext(MemberContext);
  if (context === undefined) {
    throw new Error('useMember must be used within a MemberProvider');
  }
  return context;
}
