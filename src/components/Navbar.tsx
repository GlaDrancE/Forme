
import React, { ChangeEvent, useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Bell, LogOut, MessageSquare, Search, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ThemeToggle from './ThemeToggle';
import { supabase } from '@/integrations/supabase/client';
import { Session } from '@supabase/supabase-js';
import { useToast } from '@/hooks/use-toast';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from './ui/sheet';
import { ScrollArea } from '@radix-ui/react-scroll-area';

const notifications = [
  {
    id: 1,
    title: 'New Review',
    message: 'John Doe left a 5-star review',
    time: '2 minutes ago',
    unread: true,
  },
  {
    id: 2,
    title: 'Subscription Update',
    message: 'Premium plan subscription renewed',
    time: '1 hour ago',
    unread: true,
  },
  {

    id: 3,
    title: 'System Update',
    message: 'Dashboard v2.0 is now available',
    time: '2 hours ago',
    unread: false,
  },
];

const Navbar = () => {
  const [session, setSession] = useState<Session | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");

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

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast({
        title: 'Signed out successfully',
      });
      navigate('/');
    } catch (error) {
      toast({
        title: 'Error signing out',
        variant: 'destructive',
      });
    }
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value
    setQuery(newQuery)
    if (newQuery) {
      setSearchParams({ q: newQuery })
    } else {
      setSearchParams({})
    }
  }

  return (
    <header className="sticky top-0 z-40 border-b bg-background">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <span className="h-8 w-8 rounded-md bg-primary text-primary-foreground flex items-center justify-center font-bold">
              CC
            </span>
            <span className="text-lg font-bold">Campus Connect</span>
          </Link>
        </div>

        <div className="hidden md:flex md:w-1/3">
          <div className="relative w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search listings..."
              className="w-full pl-8"
              onChange={handleSearch}
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          {session ? (
            <>
              {/* <Button variant="ghost" size="icon" asChild>
                <Link to="/messages">
                  <MessageSquare className="h-5 w-5" />
                </Link>
              </Button> */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-9 w-9 relative">
                    <Bell className="h-5 w-5" />
                    <span className="absolute top-2 right-2 h-2 w-2 bg-primary rounded-full" />
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Notifications</SheetTitle>
                  </SheetHeader>
                  <ScrollArea className="h-[calc(100vh-5rem)] mt-4">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`p-4 mb-2 rounded-lg ${notification.unread ? 'bg-primary/5' : 'bg-background'
                          }`}
                      >
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-medium">{notification.title}</h4>
                          {notification.unread && (
                            <span className="h-2 w-2 bg-primary rounded-full" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">
                          {notification.message}
                        </p>
                        <span className="text-xs text-muted-foreground">
                          {notification.time}
                        </span>
                      </div>
                    ))}
                  </ScrollArea>
                </SheetContent>
              </Sheet>
              {/* <Button variant="ghost" size="icon" asChild>
                <Link to="/profile">
                  <User className="h-5 w-5" />
                </Link>
              </Button> */}
              <Button variant="default" asChild>
                <Link to="/create-listing">+ List Item</Link>
              </Button>
              <Button variant="ghost" size="icon" onClick={handleLogout}>
                <LogOut className="h-5 w-5" />
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" asChild>
                <Link to="/login">Login</Link>
              </Button>
              <Button variant="default" asChild>
                <Link to="/signup">Signup</Link>
              </Button>
            </>
          )}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
