
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MessageSquare, Heart, Share, IndianRupee } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import Navbar from '@/components/Navbar';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Input } from '@/components/ui/input';

// Mock data for a listing
const mockListing = {
  id: '1',
  title: 'Calculus Textbook - 5th Edition',
  description: 'Barely used calculus textbook in excellent condition. Highlights in just the first chapter. Selling because I switched majors. No digital access code included.',
  price: 45.99,
  location: 'North Campus',
  images: [
    'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=1374&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1544967082-d9d25d867d66?q=80&w=1374&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1629020607352-a2c180e7b5b7?q=80&w=1470&auto=format&fit=crop',
  ],
  category: 'Books',
  condition: 'Like New',
  createdAt: '2023-04-01T12:00:00Z',
  seller: {
    id: 'user1',
    name: 'Alex Johnson',
    avatar: 'https://randomuser.me/api/portraits/lego/3.jpg',
    school: 'Engineering',
    joinedDate: '2022-09-01T00:00:00Z',
    rating: 4.8,
    reviewCount: 15,
    verifiedStudent: true,
  },
  isFeatured: true,
};

const ListingDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { toast } = useToast();
  const [isLiked, setIsLiked] = useState(false);
  const [listing, setListing] = useState(mockListing);

  const [showOfferInput, setShowOfferInput] = useState(false);
  const [product, setProduct] = useState(mockListing)
  const [offerAmount, setOfferAmount] = useState('');

  // In a real app, we would fetch the listing data based on the ID

  useEffect(() => {

    const fetchProduct = async () => {
      try {
        const product = await supabase.from('products').select("*").eq("id", id)
        const userid = (await supabase.auth.getUser()).data.user.id;
        const user = await supabase.from('profiles').select("*").eq("id", userid);

        if (!product.data) {
          return;
        }
        console.log(product)
        setListing(prev => ({
          ...prev,
          images: [product.data[0].image_url],
          seller: { ...prev.seller, name: user.data[0].full_name },
          condition: product.data[0].condition,
          category: product.data[0].category,
          location: product.data[0].location
        }))
      } catch (error) {
        console.log(error)
      }
    }
    fetchProduct();
  }, [])


  // For this demo, we'll just use the mock data



  const handleContactSeller = () => {
    toast({
      title: 'Message Sent',
      description: `You've initiated a chat with ${listing.seller.name}`,
    });
  };

  const handleShare = () => {
    // In a real app, this would copy the link or open a share dialog
    toast({
      title: 'Link Copied',
      description: 'Listing link copied to clipboard',
    });
  };

  const handleToggleLike = () => {
    setIsLiked(!isLiked);
    toast({
      title: isLiked ? 'Removed from Saved' : 'Saved to Favorites',
      description: isLiked
        ? 'This listing has been removed from your saved items'
        : 'This listing has been added to your saved items',
    });
  };
  const handleMakeOffer = () => {
    setShowOfferInput(true);
  };

  const handleSubmitOffer = () => {
    if (!offerAmount) return;
    toast({
      title: 'Offer Sent',
      description: `The seller has received your offer of ₹${offerAmount}`,
    });
    setShowOfferInput(false);
    setOfferAmount('');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <div className="container py-6">
          <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4">
            <ArrowLeft className="h-4 w-4" />
            Back to listings
          </Link>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Images and Details */}
            <div className="md:col-span-2 space-y-6">
              {/* Main Image */}
              <div className="overflow-hidden rounded-lg border bg-black">
                <img
                  src={listing.images[currentImageIndex]}
                  alt={listing.title}
                  className="h-[400px] w-full object-contain"
                />
              </div>

              {/* Thumbnail Images */}
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {listing.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border ${currentImageIndex === index ? 'ring-2 ring-primary' : ''
                      }`}
                  >
                    <img
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>

              {/* Listing Details */}
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className=''>
                    <h1 className="text-2xl font-bold">{listing.title}</h1>
                    <div className='flex flex-row gap-2 items-center'>
                      <p className="text-xl font-semibold text-primary">
                        ₹{listing.price.toFixed(2)}
                      </p>
                      <Button variant='default' className='bg-black'>Buy Now </Button>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handleToggleLike}
                    >
                      <Heart
                        className={`h-5 w-5 ${isLiked ? 'fill-red-500 text-red-500' : ''}`}
                      />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handleShare}
                    >
                      <Share className="h-5 w-5" />
                    </Button>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">{listing.category}</Badge>
                  <Badge variant="secondary">{listing.condition}</Badge>
                  <Badge variant="secondary">{listing.location}</Badge>
                  {listing.isFeatured && (
                    <Badge className="bg-accent text-accent-foreground">
                      Featured
                    </Badge>
                  )}
                </div>

                <div>
                  <h2 className="text-lg font-semibold mb-2">Description</h2>
                  <p className="text-muted-foreground">{listing.description}</p>
                </div>

                <div>
                  <h2 className="text-lg font-semibold mb-2">Location</h2>
                  <p className="text-muted-foreground">{listing.location}</p>
                  {/* A map would be shown here in a full implementation */}
                  <div className="mt-2 h-40 rounded-md bg-muted flex items-center justify-center text-muted-foreground">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3722.4356442935323!2d78.9785723!3d21.0951911!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd4952117eaac51%3A0x6d8277793eb63d6a!2sYeshwantrao%20Chavan%20College%20of%20Engineering%20(YCCE)%2C%20Nagpur!5e0!3m2!1sen!2sin!4v1743726906618!5m2!1sen!2sin" className='w-full' loading="lazy" ></iframe>
                  </div>
                </div>

                <div>
                  <h2 className="text-lg font-semibold mb-2">Listed</h2>
                  <p className="text-muted-foreground">
                    {new Date(listing.createdAt).toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              </div>
            </div>

            {/* Seller Info and Actions */}
            <div className="space-y-6">
              <div className="rounded-lg border p-4">
                <div className="flex items-center gap-4 mb-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={listing.seller.avatar} alt={listing.seller.name} />
                    <AvatarFallback>{listing.seller.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{listing.seller.name}</h3>
                      {listing.seller.verifiedStudent && (
                        <Badge variant="outline" className="text-xs">Verified Student</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{listing.seller.school}</p>
                  </div>
                </div>

                <div className="mb-4 flex items-center gap-4">
                  <div>
                    <div className="text-sm font-medium">{listing.seller.rating} ★</div>
                    <div className="text-xs text-muted-foreground">{listing.seller.reviewCount} reviews</div>
                  </div>
                  <Separator orientation="vertical" className="h-8" />
                  <div>
                    <div className="text-sm font-medium">Member Since</div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(listing.seller.joinedDate).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'short',
                      })}
                    </div>
                  </div>
                </div>

                <div className='flex flex-row gap-2'>

                  <Button className="w-full" onClick={handleContactSeller}>
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Contact Seller
                  </Button>
                  <Button className="w-full bg-black text-white" variant='default' onClick={handleMakeOffer}>
                    <IndianRupee className="mr-2 h-4 w-4" />
                    Make an offer
                  </Button>
                </div>
                {showOfferInput && (
                  <div className="mt-2 flex items-center gap-2">
                    <Input
                      type="number"
                      placeholder="Enter your offer"
                      value={offerAmount}
                      onChange={(e) => setOfferAmount(e.target.value)}
                    />
                    <Button onClick={handleSubmitOffer}>Send</Button>
                  </div>
                )}
              </div>

              <div className="rounded-lg border p-4">
                <h3 className="font-semibold mb-3">Safety Tips</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>Meet in a public place on campus</li>
                  <li>Check the item before making payment</li>
                  <li>Never share personal financial information</li>
                  <li>Consider using the campus police station for high-value exchanges</li>
                </ul>
                <Separator className="my-3" />
                <p className="text-xs text-muted-foreground">
                  See our <Link to="/safety" className="text-primary hover:underline">safety guidelines</Link> for more information.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ListingDetail;
