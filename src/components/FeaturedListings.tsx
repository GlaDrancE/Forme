
import ListingCard from './ListingCard';

// Mock data for featured listings
const featuredListings = [
  {
    id: '1',
    title: 'Calculus Textbook - 5th Edition',
    price: 45.99,
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=1374&auto=format&fit=crop',
    location: 'North Campus',
    isFeatured: true,
    createdAt: '2023-04-01T12:00:00Z',
  },
  {
    id: '2',
    title: 'MacBook Pro 2022 - Like New',
    price: 1299.99,
    image: 'https://images.unsplash.com/photo-1569770218135-bea267ed7e84?q=80&w=1480&auto=format&fit=crop',
    location: 'East Campus',
    isFeatured: true,
    createdAt: '2023-04-02T10:30:00Z',
  },
  {
    id: '3',
    title: 'Scientific Calculator - TI-84',
    price: 75.50,
    image: 'https://imgs.search.brave.com/FxshzJ6cNnHH9nAa-X49gn_RdYNwtDzDUdWJEyMjKBU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/Y3VzdG9tc2NlbmUu/Y28vd3AtY29udGVu/dC91cGxvYWRzLzIw/MjMvMTAvQ2FsY3Vs/YXRvci0wMS1QTkdf/SW1hZ2UtVGh1bWJu/YWlsLmpwZw',
    location: 'West Campus',
    isFeatured: true,
    createdAt: '2023-04-03T14:15:00Z',
  },
  {
    id: '4',
    title: 'Dorm Room Mini Fridge',
    price: 85.00,
    image: 'https://images.unsplash.com/photo-1540932239986-30128078f3c5?q=80&w=1374&auto=format&fit=crop',
    location: 'South Campus',
    isFeatured: true,
    createdAt: '2023-04-04T09:45:00Z',
  },
];

const FeaturedListings = () => {
  return (
    <section className="container py-8">
      <h2 className="mb-6 text-2xl font-bold">Featured Listings</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {featuredListings.map((listing) => (
          <ListingCard
            key={listing.id}
            id={listing.id}
            title={listing.title}
            price={listing.price}
            image={listing.image}
            location={listing.location}
            isFeatured={listing.isFeatured}
            createdAt={listing.createdAt}
          />
        ))}
      </div>
    </section>
  );
};

export default FeaturedListings;
