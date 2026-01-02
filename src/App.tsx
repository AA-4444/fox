import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { I18nProvider } from "@/i18n/I18nProvider";

import Index from "./pages/Index";
import Categories from "./pages/Categories";
import ServiceDetail from "./pages/ServiceDetail";
import Auth from "./pages/Auth";
import HowItWorksPage from "./pages/HowItWorksPage";
import ForPros from "./pages/ForPros";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import TaskCreate from "./pages/TaskCreate";
import ProProfile from "./pages/ProProfile";
import SearchPick from "./pages/SearchPick";
import News from "./pages/News";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <I18nProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/categories" element={<Categories />} />
            <Route
              path="/service/:categoryId/:serviceId"
              element={<ServiceDetail />}
            />
            <Route path="/auth" element={<Auth />} />
            <Route path="/how-it-works" element={<HowItWorksPage />} />
            <Route path="/for-pros" element={<ForPros />} />
            <Route path="/about" element={<About />} />
              <Route path="/task/create/cid/:cid" element={<TaskCreate />} />
              <Route path="/pro/:id" element={<ProProfile />} />
                <Route path="/search/pick" element={<SearchPick />} />
                  
                  <Route path="/news" element={<News />} /> 
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </I18nProvider>
  </QueryClientProvider>
);

export default App;