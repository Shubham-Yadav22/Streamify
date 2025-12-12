import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Home, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
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
        isScrolled ? 'bg-background/95 backdrop-blur-md shadow-lg' : 'bg-gradient-to-b from-background/80 to-transparent'
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <span className="text-2xl md:text-3xl font-bold text-primary tracking-tight">
              STREAMIFY
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <NavLink to="/" icon={<Home size={18} />} label="Home" active={location.pathname === '/'} />
            <NavLink to="/search" icon={<Search size={18} />} label="Search" active={location.pathname === '/search'} />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-md border-t border-border"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-2">
              <MobileNavLink to="/" icon={<Home size={20} />} label="Home" active={location.pathname === '/'} />
              <MobileNavLink to="/search" icon={<Search size={20} />} label="Search" active={location.pathname === '/search'} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
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
      'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
      active ? 'bg-primary/10 text-primary' : 'text-foreground hover:bg-muted'
    )}
  >
    {icon}
    <span className="font-medium">{label}</span>
  </Link>
);
