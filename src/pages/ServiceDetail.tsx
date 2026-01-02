import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Star, Shield, Clock, CheckCircle, MapPin, Calendar, DollarSign, ArrowLeft } from "lucide-react";

const ServiceDetail = () => {
  const { categoryId, serviceId } = useParams();
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    date: "",
    budget: ""
  });
  
  const serviceName = serviceId?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || "Service";
  const categoryName = categoryId?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || "Category";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Order submitted! (Frontend demo - connect backend for real functionality)");
    setShowOrderForm(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-24 pb-16">
        <div className="container px-4">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link to="/categories" className="hover:text-primary transition-colors">Categories</Link>
            <span>/</span>
            <Link to={`/categories?tab=${categoryId}`} className="hover:text-primary transition-colors">{categoryName}</Link>
            <span>/</span>
            <span className="text-foreground">{serviceName}</span>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="lg:col-span-2">
              <Link to="/categories" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6 transition-colors">
                <ArrowLeft className="w-4 h-4" />
                Back to categories
              </Link>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{serviceName}</h1>
              <p className="text-lg text-muted-foreground mb-8">
                Find trusted {serviceName.toLowerCase()} professionals in your area. Compare prices, read reviews, and hire the best.
              </p>
              
              {/* Features */}
              <div className="grid sm:grid-cols-3 gap-4 mb-12">
                <div className="flex items-center gap-3 p-4 rounded-xl bg-secondary/50">
                  <Shield className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium">Verified Pros</span>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-xl bg-secondary/50">
                  <Star className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium">4.9 Avg Rating</span>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-xl bg-secondary/50">
                  <Clock className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium">Quick Response</span>
                </div>
              </div>
              
              {/* How it works */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6">How it works</h2>
                <div className="space-y-4">
                  {[
                    { step: 1, title: "Describe your task", desc: "Tell us what you need done and when" },
                    { step: 2, title: "Get matched", desc: "Receive offers from verified professionals" },
                    { step: 3, title: "Hire & pay safely", desc: "Choose the best pro and pay securely through our platform" },
                  ].map((item) => (
                    <div key={item.step} className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold text-sm">
                        {item.step}
                      </div>
                      <div>
                        <h3 className="font-semibold">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Sample professionals */}
              <div>
                <h2 className="text-2xl font-bold mb-6">Top Professionals</h2>
                <div className="space-y-4">
                  {[
                    { name: "Michael S.", rating: 4.9, jobs: 234, price: "$40-60/hr" },
                    { name: "Sarah K.", rating: 5.0, jobs: 189, price: "$35-55/hr" },
                    { name: "David R.", rating: 4.8, jobs: 312, price: "$45-70/hr" },
                  ].map((pro) => (
                    <div key={pro.name} className="flex items-center justify-between p-4 rounded-xl border border-border/50 hover:border-primary/30 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                          {pro.name.charAt(0)}
                        </div>
                        <div>
                          <h3 className="font-semibold">{pro.name}</h3>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span>{pro.rating}</span>
                            <span>•</span>
                            <span>{pro.jobs} jobs</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{pro.price}</p>
                        <Button size="sm" variant="outline" onClick={() => setShowOrderForm(true)}>
                          Hire
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Sidebar - Order form */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-card rounded-2xl border border-border/50 p-6 shadow-soft">
                <h2 className="text-xl font-bold mb-4">Get a Quote</h2>
                
                {!showOrderForm ? (
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      Post your task and receive offers from professionals in your area.
                    </p>
                    <Button className="w-full" size="lg" onClick={() => setShowOrderForm(true)}>
                      Post Your Task
                    </Button>
                    <p className="text-xs text-center text-muted-foreground">
                      Free to post • No obligation
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Task Title</label>
                      <input
                        type="text"
                        placeholder={`I need a ${serviceName.toLowerCase()}`}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Description</label>
                      <textarea
                        placeholder="Describe what you need..."
                        rows={3}
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        <MapPin className="w-4 h-4 inline mr-1" />
                        Location
                      </label>
                      <input
                        type="text"
                        placeholder="Your address or area"
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        <Calendar className="w-4 h-4 inline mr-1" />
                        When do you need it?
                      </label>
                      <input
                        type="date"
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        <DollarSign className="w-4 h-4 inline mr-1" />
                        Budget (optional)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g., $100-200"
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      />
                    </div>
                    
                    <Button type="submit" className="w-full" size="lg">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Submit Task
                    </Button>
                    
                    <button
                      type="button"
                      onClick={() => setShowOrderForm(false)}
                      className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Cancel
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ServiceDetail;
