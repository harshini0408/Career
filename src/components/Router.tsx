import { MemberProvider } from '@/integrations';
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import { ScrollToTop } from '@/lib/scroll-to-top';
import { MemberProtectedRoute } from '@/components/ui/member-protected-route';
import Layout from '@/components/Layout';
import HomePage from '@/components/pages/HomePage';
import ProfilePage from '@/components/pages/ProfilePage';

export default function AppRouter() {
  return (
    <MemberProvider>
      <BrowserRouter basename={import.meta.env.BASE_NAME}>
        <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/profile" element={
              <MemberProtectedRoute messageToSignIn="Sign in to access your profile">
                <ProfilePage />
              </MemberProtectedRoute>
            } />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </MemberProvider>
  );
}
