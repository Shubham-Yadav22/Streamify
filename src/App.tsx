import { lazy, Suspense } from "react";
import { Toaster as Sonner } from "@/ui-components/ui/sonner";
import { TooltipProvider } from "@/ui-components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ErrorBoundary } from "@/Component/common/errorBoundary";
import { CarouselSkeleton } from "@/ui-components/ui/loading-skeleton";
import { Layout } from "@/Component/layout/layout";

// Lazy load pages for code splitting
const Home = lazy(() => import("./Component/home/home"));
const Search = lazy(() => import("./Component/search/search"));
const ShowDetail = lazy(() => import("./Component/showDetail/showdetail"));
const NotFound = lazy(() => import("./Component/notFound/notFound"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

// Loading fallback
const PageLoader = () => (
  <div className="min-h-screen bg-background pt-20 px-4">
    <CarouselSkeleton />
    <div className="mt-8">
      <CarouselSkeleton />
    </div>
  </div>
);

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ErrorBoundary>
          <Sonner />
          <BrowserRouter>
            <Suspense fallback={<PageLoader />}>
              <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<Search />} />
                <Route path="/show/:id" element={<ShowDetail />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              </Layout>
            </Suspense>
          </BrowserRouter>
        </ErrorBoundary>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
