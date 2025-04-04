
import Navbar from '@/components/Navbar';
import Categories from '@/components/Categories';
import FeaturedListings from '@/components/FeaturedListings';
import RecentListings from '@/components/RecentListings';
import ChatBox from '@/components/ChatBox';
import { Button } from '@/components/ui/button';
import { Link, useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Session } from '@supabase/supabase-js';
import SearchListings from './SearchListing';

const Index = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_, session) => {
        setSession(session);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary py-16 text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center">
            <h1 className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl">
              Campus Connect Marketplace
            </h1>
            <p className="mb-8 max-w-2xl text-xl">
              Buy and sell items exclusively with other students on your campus.
              Safe, convenient, and student-focused.
            </p>
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
              {!session ? (
                <Button size="lg" asChild>
                  <Link to="/signup">Sign Up with .edu Email</Link>
                </Button>
              ) : (
                <Button size="lg" asChild>
                  <Link to="/create-listing">Create a Listing</Link>
                </Button>
              )}
              <Button size="lg" variant="outline" className="border-white/20 bg-white/10" asChild>
                <Link to="/explore">Browse Listings</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      {searchParams.size === 0 ? <main>
        <Categories />
        <FeaturedListings />
        <RecentListings />
      </main> : <main>
        <SearchListings />
      </main>}

      {/* Chat Box Component */}
      {session && <ChatBox />}

      {/* Footer */}
      <footer className="mt-auto border-t bg-muted py-6">
        <div className="container flex flex-col items-center justify-between space-y-4 text-sm text-muted-foreground md:flex-row md:space-y-0">
          <div>
            <p>© 2025 Campus Connect. All rights reserved.</p>
          </div>
          <div className="flex space-x-4">
            <Link to="/about" className="hover:text-foreground">About</Link>
            <Link to="/privacy" className="hover:text-foreground">Privacy</Link>
            <Link to="/terms" className="hover:text-foreground">Terms</Link>
            <Link to="/support" className="hover:text-foreground">Support</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
