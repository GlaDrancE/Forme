
import CategoryCard from './CategoryCard';

const categories = [
  { title: 'Books', icon: 'books', url: '/category/books' },
  { title: 'Calculators', icon: 'calculators', url: '/category/calculators' },
  { title: 'Laptops', icon: 'laptops', url: '/category/laptops' },
  { title: 'Clothing', icon: 'clothing', url: '/category/clothing' },
  { title: 'Transport', icon: 'transport', url: '/category/transport' },
];

const Categories = () => {
  return (
    <section className="container py-8">
      <h2 className="mb-6 text-2xl font-bold">Browse Categories</h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 md:grid-cols-8">
        {categories.map((category) => (
          <CategoryCard
            key={category.title}
            title={category.title}
            icon={category.icon}
            url={category.url}
          />
        ))}
      </div>
    </section>
  );
};

export default Categories;
