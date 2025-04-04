
import { useEffect, useState } from 'react';
import ListingCard from './ListingCard';
import { supabase } from '@/integrations/supabase/client';
import { PostgrestSingleResponse } from '@supabase/supabase-js';

// Mock data for recent listings
const recentListings = [
  {
    id: '5',
    title: 'Computer Science Notes - Data Structures',
    price: 15.00,
    image: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=1470&auto=format&fit=crop',
    location: 'Library',
    isFeatured: false,
    createdAt: '2023-04-05T16:20:00Z',
  },
  {
    id: '6',
    title: 'Desk Lamp - Adjustable LED',
    price: 22.50,
    image: 'https://images.unsplash.com/photo-1532654437106-5868d5233c40?q=80&w=1374&auto=format&fit=crop',
    location: 'Residence Hall A',
    isFeatured: false,
    createdAt: '2023-04-06T11:10:00Z',
  },
  {
    id: '7',
    title: 'Tennis Racket - Barely Used',
    price: 35.00,
    image: 'https://images.unsplash.com/photo-1595426400128-28540abeda6e?q=80&w=1420&auto=format&fit=crop',
    location: 'Sports Center',
    isFeatured: false,
    createdAt: '2023-04-07T13:40:00Z',
  },
  {
    id: '8',
    title: 'Psychology Textbook Bundle',
    price: 65.75,
    image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=1374&auto=format&fit=crop',
    location: 'Psychology Building',
    isFeatured: false,
    createdAt: '2023-04-08T15:30:00Z',
  },
  {
    id: '9',
    title: 'Wireless Headphones - Noise Cancelling',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1605464315542-bda3e2f4e605?q=80&w=1470&auto=format&fit=crop',
    location: 'Engineering Building',
    isFeatured: false,
    createdAt: '2023-04-09T10:00:00Z',
  },
  {
    id: '10',
    title: 'Bicycle - City Cruiser',
    price: 125.00,
    image: 'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?q=80&w=1422&auto=format&fit=crop',
    location: 'Bike Rack - Main Quad',
    isFeatured: false,
    createdAt: '2023-04-10T14:00:00Z',
  },
  {
    id: '11',
    title: 'Drawing Tablet - For Digital Art',
    price: 110.50,
    image: 'https://images.unsplash.com/photo-1574861834093-6a6d761d5217?q=80&w=1374&auto=format&fit=crop',
    location: 'Art Department',
    isFeatured: false,
    createdAt: '2023-04-11T09:15:00Z',
  },
  {
    id: '12',
    title: 'Dorm Room Decor Bundle',
    price: 45.00,
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1374&auto=format&fit=crop',
    location: 'Student Union',
    isFeatured: false,
    createdAt: '2023-04-12T16:45:00Z',
  },
];

const RecentListings = () => {

  const [listing, setListing] = useState<any[]>(null);


  useEffect(() => {
    // Simulate fetching listing data from an API
    const fetchListing = async () => {
      // In a real app, replace this with an API call
      const fetchedListing = await supabase.from('products').select("*"); // Replace with actual API call
      setListing(fetchedListing.data);
      console.log(fetchedListing);
    };
    fetchListing();

  }, [])
  return (
    <section className="container py-8">
      <h2 className="mb-6 text-2xl font-bold">Recent Listings</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {listing && listing.map((listing) => (
          <ListingCard
            key={listing.id}
            id={listing.id}
            title={listing.title}
            price={listing.price}
            image={listing.image_url}
            location={listing.location}
            isFeatured={listing.isFeatured}
            createdAt={listing.created_at}
            db={true}
          />
        ))}
      </div>
    </section>
  );
};

export default RecentListings;
