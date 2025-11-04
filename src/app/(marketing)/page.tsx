import HeroV2 from '@/components/hero/HeroV2';
import AIPlayground from '@/components/demos/AIPlayground';
import BeforeAfterSlider from '@/components/demos/BeforeAfterSlider';
import BentoShowcase from '@/components/sections/BentoShowcase';
import Services from '@/components/home/Services';
import TechStack from '@/components/home/TechStack';
import ContactForm from '@/components/home/ContactForm';

export default function HomePage() {
  return (
    <>
      <HeroV2 />
      <AIPlayground />
      <BeforeAfterSlider />
      <BentoShowcase />
      <Services />
      <TechStack />
      <ContactForm />
    </>
  );
}
