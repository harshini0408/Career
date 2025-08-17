import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useMember } from '@/integrations';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Menu, X, User } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { member, isAuthenticated, isLoading, actions } = useMember();
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Features', href: '/#features' },
    { name: 'About', href: '/#about' },
    { name: 'Contact', href: '/#contact' }
  ];

  const scrollToSection = (href: string) => {
    if (href.includes('#')) {
      const [path, section] = href.split('#');
      if (path === '' || path === '/') {
        if (location.pathname !== '/') {
          window.location.href = href;
        } else {
          const element = document.getElementById(section);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }
      } else {
        window.location.href = href;
      }
    }
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <motion.nav 
        className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-secondary/20"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-6" style={{ maxWidth: '100rem' }}>
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
                <span className="font-heading text-xl font-bold text-primary-foreground">CA</span>
              </div>
              <span className="font-heading text-2xl font-bold text-secondary-foreground">
                Career Advisor
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="font-paragraph text-lg text-secondary-foreground/80 hover:text-primary transition-colors duration-300 relative group"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                </button>
              ))}
            </div>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              {isLoading && <LoadingSpinner />}
              {!isAuthenticated && !isLoading && (
                <>
                  <Button 
                    variant="ghost" 
                    onClick={actions.login}
                    className="font-paragraph text-lg text-secondary-foreground hover:text-primary"
                  >
                    Login
                  </Button>
                  <Button 
                    onClick={actions.login}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-xl font-semibold transition-all duration-300"
                  >
                    Sign Up
                  </Button>
                </>
              )}
              {isAuthenticated && (
                <div className="flex items-center space-x-4">
                  <Link 
                    to="/profile"
                    className="flex items-center space-x-2 text-secondary-foreground hover:text-primary transition-colors duration-300"
                  >
                    <User className="w-5 h-5" />
                    <span className="font-paragraph">
                      {member?.profile?.nickname || member?.contact?.firstName || 'Profile'}
                    </span>
                  </Link>
                  <Button 
                    variant="outline" 
                    onClick={actions.logout}
                    className="border-accent text-accent hover:bg-accent hover:text-primary-foreground"
                  >
                    Sign Out
                  </Button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-secondary-foreground hover:text-primary transition-colors duration-300"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-t border-secondary/20"
          >
            <div className="container mx-auto px-6 py-6">
              <div className="flex flex-col space-y-4">
                {navigation.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    className="font-paragraph text-lg text-secondary-foreground hover:text-primary transition-colors duration-300 text-left py-2"
                  >
                    {item.name}
                  </button>
                ))}
                
                <div className="pt-4 border-t border-secondary/20">
                  {isLoading && <LoadingSpinner />}
                  {!isAuthenticated && !isLoading && (
                    <div className="flex flex-col space-y-3">
                      <Button 
                        variant="ghost" 
                        onClick={actions.login}
                        className="justify-start font-paragraph text-lg text-secondary-foreground hover:text-primary"
                      >
                        Login
                      </Button>
                      <Button 
                        onClick={actions.login}
                        className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl font-semibold"
                      >
                        Sign Up
                      </Button>
                    </div>
                  )}
                  {isAuthenticated && (
                    <div className="flex flex-col space-y-3">
                      <Link 
                        to="/profile"
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center space-x-2 text-secondary-foreground hover:text-primary transition-colors duration-300 py-2"
                      >
                        <User className="w-5 h-5" />
                        <span className="font-paragraph">
                          {member?.profile?.nickname || member?.contact?.firstName || 'Profile'}
                        </span>
                      </Link>
                      <Button 
                        variant="outline" 
                        onClick={actions.logout}
                        className="justify-start border-accent text-accent hover:bg-accent hover:text-primary-foreground"
                      >
                        Sign Out
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </motion.nav>

      {/* Main Content */}
      <main className="pt-20">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-footer-background text-primary-foreground py-16">
        <div className="container mx-auto px-6" style={{ maxWidth: '100rem' }}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* Company Info */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
                  <span className="font-heading text-xl font-bold text-primary-foreground">CA</span>
                </div>
                <span className="font-heading text-2xl font-bold">Career Advisor</span>
              </div>
              <p className="font-paragraph text-lg text-primary-foreground/80 mb-6 max-w-md leading-relaxed">
                Empowering careers with AI-driven insights and personalized guidance. 
                Transform your professional journey with intelligent recommendations.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center hover:bg-primary/30 transition-colors duration-300 cursor-pointer">
                  <span className="text-sm font-bold">f</span>
                </div>
                <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center hover:bg-primary/30 transition-colors duration-300 cursor-pointer">
                  <span className="text-sm font-bold">t</span>
                </div>
                <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center hover:bg-primary/30 transition-colors duration-300 cursor-pointer">
                  <span className="text-sm font-bold">in</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-heading text-xl font-bold mb-6">Quick Links</h3>
              <ul className="space-y-3">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <button
                      onClick={() => scrollToSection(item.href)}
                      className="font-paragraph text-primary-foreground/80 hover:text-primary-foreground transition-colors duration-300"
                    >
                      {item.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="font-heading text-xl font-bold mb-6">Contact</h3>
              <div className="space-y-3">
                <p className="font-paragraph text-primary-foreground/80">
                  support@careeradvisor.ai
                </p>
                <p className="font-paragraph text-primary-foreground/80">
                  +1 (555) 123-4567
                </p>
                <p className="font-paragraph text-primary-foreground/80">
                  San Francisco, CA
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-primary-foreground/20 mt-12 pt-8 text-center">
            <p className="font-paragraph text-primary-foreground/60">
              © 2024 Career Advisor. All rights reserved. Built with AI for the future of work.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}