import { Link } from "react-router-dom";

export interface ServiceCategory {
  id: string;
  name: string;
  count: string;
  icon: React.ReactNode;
  subcategories: string[];
  tab: string;
}

const ServiceCard = ({ category }: { category: ServiceCategory }) => {
  return (
    <div className="group relative bg-card rounded-2xl p-6 border border-border/50 shadow-soft hover:shadow-elevated hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden">
      {/* Hover gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative">
        {/* Icon */}
        <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform duration-300">
          {category.icon}
        </div>
        
        {/* Title and count */}
        <h3 className="text-lg font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
          {category.name}
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          {category.count} professionals
        </p>
        
        {/* Subcategories */}
        <ul className="space-y-1.5">
          {category.subcategories.slice(0, 4).map((sub) => (
            <li key={sub}>
              <Link 
                to={`/service/${category.id}/${sub.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {sub}
              </Link>
            </li>
          ))}
        </ul>
        
        {/* View all link */}
        <Link 
          to={`/categories?tab=${category.tab}`}
          className="mt-4 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 inline-block"
        >
          View all →
        </Link>
      </div>
    </div>
  );
};

export default ServiceCard;
