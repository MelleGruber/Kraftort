
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import StoriesPage from "./pages/StoriesPage";
import LocationPage from "./pages/LocationPage";
import StoryPage from "./pages/StoryPage";
import AudioPage from "./pages/AudioPage";
import GalleryPage from "./pages/GalleryPage"; // Added import
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/stories" element={<StoriesPage />} />
          <Route path="/location/:locationId" element={<LocationPage />} />
          <Route path="/story/:locationId/:storyId" element={<StoryPage />} />
          <Route path="/audio/:locationId/:storyId" element={<AudioPage />} />
          <Route path="/gallery/:locationId/:storyId" element={<GalleryPage />} /> {/* Added route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
