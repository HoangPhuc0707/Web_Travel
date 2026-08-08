import { HeroSlider } from '@/components/home/HeroSlider';
import { StatsSection } from '@/components/home/StatsSection';
import { FeaturedTours } from '@/components/home/FeaturedTours';
import { DestinationsGrid } from '@/components/home/DestinationsGrid';
import { Testimonials } from '@/components/home/Testimonials';
import { BlogPreview } from '@/components/home/BlogPreview';
import { CtaBanner } from '@/components/home/CtaBanner';

export default function Home() {
  return (
    <>
      <HeroSlider />
      <StatsSection />
      <FeaturedTours />
      <DestinationsGrid />
      <Testimonials />
      <BlogPreview />
      <CtaBanner />
    </>
  );
}
