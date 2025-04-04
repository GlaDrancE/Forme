
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { useEffect, useState } from 'react';

interface ListingProps {
  id: string;
  title: string;
  price: number;
  image: string;
  location: string;
  isFeatured?: boolean;
  createdAt: string;
  db?: boolean;
}

const ListingCard = ({ id, title, price, image, location, isFeatured, createdAt, db = false }: ListingProps) => {
  return (
    <Link to={`/listing/${id}`} className="block">
      <Card className="listing-card h-full">
        <div className="relative">
          <div className="aspect-square overflow-hidden">
            {!db
              ?
              <img
                src={image}
                alt={title}
                className="h-full w-full object-cover transition-transform hover:scale-105"
              />
              : <img
                src={`${image}`}
                alt={title}
                className="h-full w-full object-cover transition-transform hover:scale-105"
              />
            }
          </div>
          {isFeatured && (
            <Badge className="absolute left-2 top-2 bg-accent text-accent-foreground">
              Featured
            </Badge>
          )}
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold line-clamp-1">{title}</h3>
          <p className="text-xl font-bold text-primary">₹{price.toFixed(2)}</p>
        </CardContent>
        <CardFooter className="flex justify-between border-t p-4 pt-2 text-xs text-muted-foreground">
          <span>{location}</span>
          <span>{new Date(createdAt).toLocaleDateString()}</span>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ListingCard;
