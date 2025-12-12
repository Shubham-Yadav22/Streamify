import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Search, Tv } from 'lucide-react';
import { Layout } from '@/Component/layout/layout';
import { SEO } from '@/Component/seo/seo';

const NotFound = () => {
  return (
    <>
    <Layout>
      <SEO title="Page Not Found" />
      <div className="min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md"
        >
          <div className="relative mb-8">
            <Tv size={120} className="mx-auto text-muted-foreground/20" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-6xl font-bold text-primary">404</span>
            </div>
          </div>
          
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            This page doesn't exist
          </h1>
          <p className="text-muted-foreground mb-8">
            The page you're looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              <Home size={18} />
              Go Home
            </Link>
            <Link
              to="/search"
              className="inline-flex items-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground rounded-lg font-medium hover:bg-secondary/80 transition-colors"
            >
              <Search size={18} />
              Search Shows
            </Link>
          </div>
        </motion.div>
      </div>
      </Layout>
      </>
  );
};

export default NotFound;
