import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Home, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        'pt-safe-top', // iPhone safe area support
        isScrolled
          ? 'bg-background/95 backdrop-blur-md shadow-lg'
          : 'bg-gradient-to-b from-background/80 to-transparent'
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14 sm:h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <span className="text-xl sm:text-2xl md:text-3xl font-bold text-primary tracking-tight">
              STREAMIFY
            </span>
          </Link>

          {/* Desktop Nav */}
          {!isMobile && (
            <div className="flex items-center gap-8">
              <NavLink to="/" icon={<Home size={18} />} label="Home" active={location.pathname === '/'} />
              <NavLink to="/search" icon={<Search size={18} />} label="Search" active={location.pathname === '/search'} />
            </div>
          )}

          {/* Mobile Menu Toggle */}
          {isMobile && (
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-foreground hover:text-primary transition-colors"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobile && (
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-background/95 backdrop-blur-md border-t border-border"
            >
              <div className="container mx-auto px-4 py-3 flex flex-col gap-2">
                <MobileNavLink to="/" icon={<Home size={18} />} label="Home" active={location.pathname === '/'} />
                <MobileNavLink to="/search" icon={<Search size={18} />} label="Search" active={location.pathname === '/search'} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </nav>
  );
};

interface NavLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  active: boolean;
}

const NavLink = ({ to, icon, label, active }: NavLinkProps) => (
  <Link
    to={to}
    className={cn(
      'flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary',
      active ? 'text-primary' : 'text-muted-foreground'
    )}
  >
    {icon}
    {label}
  </Link>
);

const MobileNavLink = ({ to, icon, label, active }: NavLinkProps) => (
  <Link
    to={to}
    className={cn(
      'flex items-center gap-3 px-4 py-2 rounded-lg transition-colors',
      active ? 'bg-primary/10 text-primary' : 'text-foreground hover:bg-muted'
    )}
  >
    {icon}
    <span className="font-medium">{label}</span>
  </Link>
);
