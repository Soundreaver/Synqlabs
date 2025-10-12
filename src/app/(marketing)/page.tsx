import Hero from '@/components/home/Hero';
import Services from '@/components/home/Services';
import TechStack from '@/components/home/TechStack';
import ContactForm from '@/components/home/ContactForm';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <TechStack />
      <ContactForm />
    </>
  );
}
