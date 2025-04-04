
import { Link } from 'react-router-dom';
import { Book, Calculator, Laptop, Shirt, Coffee, Gamepad, Home, Bike } from 'lucide-react';

interface CategoryProps {
  title: string;
  icon: string;
  url: string;
}

const iconMap: Record<string, React.ReactNode> = {
  books: <Book className="h-6 w-6" />,
  calculators: <Calculator className="h-6 w-6" />,
  laptops: <Laptop className="h-6 w-6" />,
  clothing: <Shirt className="h-6 w-6" />,
  food: <Coffee className="h-6 w-6" />,
  gaming: <Gamepad className="h-6 w-6" />,
  housing: <Home className="h-6 w-6" />,
  transport: <Bike className="h-6 w-6" />, // Changed from Bicycle to Bike which is available in lucide-react
};

const CategoryCard = ({ title, icon, url }: CategoryProps) => {
  return (
    <Link
      to={"#"}
      className="flex flex-col items-center justify-center rounded-lg border border-border bg-card p-4 text-card-foreground shadow-sm transition-colors hover:bg-accent/10"
    >
      <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
        {iconMap[icon]}
      </div>
      <span className="text-sm font-medium">{title}</span>
    </Link>
  );
};

export default CategoryCard;
