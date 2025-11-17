import { Clock, DollarSign, TrendingUp, Zap } from 'lucide-react';
import HeroWithTerminal from '@/components/home/HeroWithTerminal';
import MetricsDashboard from '@/components/interactive/v2/MetricsDashboard';
import AIPlayground from '@/components/interactive/v2/AIPlayground';
import ROICalculator from '@/components/interactive/v2/ROICalculator';
import AIAssistant from '@/components/interactive/v2/AIAssistant';
import SuccessStories from '@/components/sections/v2/SuccessStories';
import TechStack from '@/components/home/TechStack';
import ContactForm from '@/components/home/ContactForm';
import CustomCursor from '@/components/ui/custom-cursor';
import ScrollProgress from '@/components/ui/scroll-progress';
import StatsBar from '@/components/cta/v2/StatsBar';
import JourneySelector from '@/components/cta/v2/JourneySelector';
import ChallengeCTA from '@/components/cta/v2/ChallengeCTA';
import SmartQualifierForm from '@/components/cta/v2/SmartQualifierForm';
import InstantBooking from '@/components/cta/v2/InstantBooking';
import NeuralBackground from '@/components/shared/NeuralBackground';

export default function HomePage() {
  return (
    <div className="relative overflow-x-hidden">
      {/* Unified Neural Network Background for all sections except hero */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <NeuralBackground />
      </div>
      
      {/* Micro-interactions */}
      <CustomCursor />
      {/* <ScrollProgress /> */}
      
      {/* Hero with Terminal */}
      <div id="hero" className="relative z-10">
        <HeroWithTerminal />
      </div>
      
      {/* All content relative to background */}
      <div className="relative z-10">
        {/* Real-Time Metrics Dashboard */}
        <section id="metrics">
          <MetricsDashboard />
        </section>
        
        {/* Stats Bar - Social Proof */}
        <section id="stats">
          <StatsBar />
        </section>
        
        {/* Invoice Processing Automation - Live Demo */}
        <section id="demo">
          <AIPlayground />
        </section>
        
        {/* ROI Calculator - Interactive Engagement */}
        <section id="roi">
          <ROICalculator />
        </section>
        
        {/* Success Stories - Case Studies */}
        <section id="success-stories">
          <SuccessStories />
        </section>
        
        {/* 3D Tech Stack - Technology Showcase */}
        <section id="tech-stack">
          <TechStack />
        </section>
      </div>
      
      {/* CTA & CONVERSION */}
      
      {/* Journey Selector - Choose Your Path */}
      {/* <JourneySelector /> */}
      
      {/* Challenge CTA - Send Your Problem */}
      {/* <ChallengeCTA /> */}
      
      {/* Smart Qualifier Form - Get Estimate */}
      {/* <SmartQualifierForm /> */}
      
      {/* Instant Booking - Schedule Call */}
      {/* <InstantBooking /> */}
      
      {/* Contact Form - Final Fallback */}
      <section id="contact" className="relative z-10">
        <ContactForm />
      </section>
      
      {/* AI Assistant Widget - Floating Helper */}
      <AIAssistant />
    </div>
  );
}
