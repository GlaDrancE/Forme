
import { useState } from 'react';
import { ArrowLeft, Upload, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import { supabase } from '@/integrations/supabase/client';

const categories = [
  { value: 'books', label: 'Books & Textbooks' },
  { value: 'electronics', label: 'Electronics' },
  { value: 'furniture', label: 'Furniture' },
  { value: 'clothing', label: 'Clothing' },
  { value: 'services', label: 'Services' },
  { value: 'tickets', label: 'Tickets & Events' },
  { value: 'housing', label: 'Housing & Rentals' },
  { value: 'transportation', label: 'Transportation' },
  { value: 'other', label: 'Other' },
];

const conditions = [
  { value: 'new', label: 'New' },
  { value: 'like_new', label: 'Like New' },
  { value: 'good', label: 'Good' },
  { value: 'fair', label: 'Fair' },
  { value: 'poor', label: 'Poor' },
];

const campusLocations = [
  { value: 'north', label: 'North Campus' },
  { value: 'south', label: 'South Campus' },
  { value: 'east', label: 'East Campus' },
  { value: 'west', label: 'West Campus' },
  { value: 'library', label: 'Library' },
  { value: 'student_center', label: 'Student Center' },
  { value: 'dorms', label: 'Residence Halls' },
];

const CreateListing = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [condition, setCondition] = useState('');
  const [location, setLocation] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [imageUrl, setImageUrl] = useState<string>()
  const [previews, setPreviews] = useState<string[]>([]);
  const [isFeatured, setIsFeatured] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const getUserIdFromSession = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    return session?.user.id;
  };
  getUserIdFromSession().then((userId) => {
    setUserId(userId);
  }
  );
  let base64String = "";

  const convertImageToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      const newFilesArray = [...images, ...newFiles].slice(0, 5); // Limit to 5 images
      setImages(newFilesArray);

      const url = await convertImageToBase64(e.target.files?.[0])
      setImageUrl(url)
      console.log(url)

      const newPreviews = newFilesArray.map(file => URL.createObjectURL(file));
      setPreviews(newPreviews);

      if (newFiles.length + images.length > 5) {
        toast({
          title: 'Maximum 5 images',
          description: 'You can upload a maximum of 5 images per listing.',
        });
      }
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...images];
    const newPreviews = [...previews];

    // Revoke URL to prevent memory leaks
    URL.revokeObjectURL(newPreviews[index]);

    newImages.splice(index, 1);
    newPreviews.splice(index, 1);

    setImages(newImages);
    setPreviews(newPreviews);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (images.length === 0) {
      toast({
        title: 'Images Required',
        description: 'Please upload at least one image for your listing.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    try {
      // Mock form submission - would connect to backend in real implementation

      toast({
        title: 'Listing Created',
        description: 'Your listing has been successfully created and is now live.',
      });

      await supabase.from('products').insert({
        category: category,
        description,
        image_url: imageUrl,
        price: parseFloat(price),
        seller_id: userId,
        title,
        location: location,
        condition: condition
      });
      navigate('/')
    } catch (error) {
      toast({
        title: 'Error Creating Listing',
        description: 'There was a problem creating your listing. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 pb-12">
        <div className="container py-6">
          <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4">
            <ArrowLeft className="h-4 w-4" />
            Back to listings
          </Link>

          <div className="mx-auto max-w-2xl">
            <div className="mb-6 text-center">
              <h1 className="text-2xl font-bold md:text-3xl">Create a New Listing</h1>
              <p className="text-muted-foreground">
                Fill out the form below to list your item for sale
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Basic Info */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Basic Information</h2>

                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    placeholder="What are you selling?"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your item in detail (condition, features, etc.)"
                    className="min-h-32"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price ($)</Label>
                    <Input
                      id="price"
                      type="number"
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select value={category} onValueChange={setCategory} required>
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat.value} value={cat.value}>
                            {cat.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="condition">Condition</Label>
                    <Select value={condition} onValueChange={setCondition} required>
                      <SelectTrigger id="condition">
                        <SelectValue placeholder="Select condition" />
                      </SelectTrigger>
                      <SelectContent>
                        {conditions.map((cond) => (
                          <SelectItem key={cond.value} value={cond.value}>
                            {cond.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Meetup Location</Label>
                    <Select value={location} onValueChange={setLocation} required>
                      <SelectTrigger id="location">
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent>
                        {campusLocations.map((loc) => (
                          <SelectItem key={loc.value} value={loc.value}>
                            {loc.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Images */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Images</h2>
                <p className="text-sm text-muted-foreground">
                  Upload up to 5 high-quality images of your item. The first image will be the cover.
                </p>

                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
                  {previews.map((preview, index) => (
                    <div key={index} className="relative aspect-square rounded-md border bg-muted">
                      <img
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        className="h-full w-full rounded-md object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute right-1 top-1 rounded-full bg-foreground/10 p-1 text-foreground backdrop-blur-sm transition-colors hover:bg-foreground/20"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}

                  {previews.length < 5 && (
                    <label className="flex aspect-square cursor-pointer flex-col items-center justify-center rounded-md border border-dashed bg-muted/50 transition-colors hover:bg-muted">
                      <Upload className="mb-2 h-6 w-6 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">Upload</span>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        className="sr-only"
                        onChange={handleImageChange}
                      />
                    </label>
                  )}
                </div>
              </div>

              <Separator />

              {/* Promote Listing */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold">Promote Listing</h2>
                    <p className="text-sm text-muted-foreground">
                      Featured listings appear at the top of search results ($2.99)
                    </p>
                  </div>
                  <Switch
                    checked={isFeatured}
                    onCheckedChange={setIsFeatured}
                  />
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button type="submit" size="lg" disabled={isLoading}>
                  {isLoading ? 'Creating Listing...' : 'Create Listing'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreateListing;
