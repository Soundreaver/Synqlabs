import { Clock, DollarSign, TrendingUp, Zap } from 'lucide-react';
import HeroWithTerminal from '@/components/home/HeroWithTerminal';
import HeroNeuralNetwork from '@/components/home/v2/HeroNeuralNetwork';
import HeroCompare from '@/components/home/v2/HeroCompare';
import MetricsDashboard from '@/components/interactive/v2/MetricsDashboard';
import AIPlayground from '@/components/interactive/v2/AIPlayground';
import BeforeAfterSlider from '@/components/interactive/v2/BeforeAfterSlider';
import ROICalculator from '@/components/interactive/v2/ROICalculator';
import AIAssistant from '@/components/interactive/v2/AIAssistant';
import AILab from '@/components/sections/v2/AILab';
import WatchUsBuild from '@/components/sections/v2/WatchUsBuild';
import SuccessStories from '@/components/sections/v2/SuccessStories';
import ProblemSolver from '@/components/sections/v2/ProblemSolver';
import TechStack3D from '@/components/sections/v2/TechStack3D';
import ContactForm from '@/components/home/ContactForm';
import CustomCursor from '@/components/ui/custom-cursor';
import ScrollProgress from '@/components/ui/scroll-progress';
import StatsBar from '@/components/cta/v2/StatsBar';
import JourneySelector from '@/components/cta/v2/JourneySelector';
import ChallengeCTA from '@/components/cta/v2/ChallengeCTA';
import SmartQualifierForm from '@/components/cta/v2/SmartQualifierForm';
import InstantBooking from '@/components/cta/v2/InstantBooking';

export default function V2HomePage() {
  // Sample data for BeforeAfterSlider
  const beforeItems = [
    { label: "Manual data entry taking 15+ hours per week", icon: <Clock className="w-5 h-5 text-red-400" /> },
    { label: "15% error rate causing costly mistakes", icon: <Zap className="w-5 h-5 text-red-400" /> },
    { label: "Unable to scale operations efficiently", icon: <TrendingUp className="w-5 h-5 text-red-400" /> },
    { label: "Lost revenue from delayed processing", icon: <DollarSign className="w-5 h-5 text-red-400" /> },
  ];

  const afterItems = [
    { label: "Automated processing in under 2 hours", icon: <Clock className="w-5 h-5 text-brand-green" /> },
    { label: "Error rate reduced to less than 1%", icon: <Zap className="w-5 h-5 text-brand-green" /> },
    { label: "Seamless scaling with AI automation", icon: <TrendingUp className="w-5 h-5 text-brand-green" /> },
    { label: "30% revenue increase from efficiency", icon: <DollarSign className="w-5 h-5 text-brand-green" /> },
  ];

  return (
    <div className="overflow-x-hidden">
      {/* Micro-interactions */}
      <CustomCursor />
      <ScrollProgress />
      
      {/* PHASE 1: HERO SECTIONS */}
      
      {/* Hero with Terminal - Original Hero Text + Terminal Window */}
      <HeroWithTerminal />
      
      {/* Real-Time Metrics Dashboard */}
      <MetricsDashboard />
      
      {/* Stats Bar - Social Proof */}
      <StatsBar />
      
      {/* Neural Network Hero - Secondary Showcase */}
      <HeroNeuralNetwork />
      
      {/* PHASE 2: INTERACTIVE DEMONSTRATIONS */}
      
      {/* Invoice Processing Automation - Live Demo */}
      <AIPlayground />
      
      {/* Before/After Transformation Slider */}
      <BeforeAfterSlider
        title="See the Transformation"
        subtitle="Real Results, Real Impact"
        description="Drag the slider to see how AI transforms your workflow"
        mode="list"
        beforeLabel="Before AI"
        afterLabel="After AI"
        beforeItems={beforeItems}
        afterItems={afterItems}
      />
      
      {/* ROI Calculator - Interactive Engagement */}
      <ROICalculator />
      
      {/* Compare Hero - Visual Comparison */}
      <HeroCompare />
      
      {/* PHASE 3: INNOVATIVE SECTIONS */}
      
      {/* AI Laboratory - Explore Capabilities */}
      <AILab />
      
      {/* Watch Us Build - Process Visualization */}
      <WatchUsBuild />
      
      {/* Success Stories - Case Studies */}
      <SuccessStories />
      
      {/* Problem Solver - Industry Solutions */}
      <ProblemSolver />
      
      {/* 3D Tech Stack - Technology Showcase */}
      <TechStack3D />
      
      {/* PHASE 5: CTA & CONVERSION */}
      
      {/* Journey Selector - Choose Your Path */}
      <JourneySelector />
      
      {/* Challenge CTA - Send Your Problem */}
      <ChallengeCTA />
      
      {/* Smart Qualifier Form - Get Estimate */}
      <SmartQualifierForm />
      
      {/* Instant Booking - Schedule Call */}
      <InstantBooking />
      
      {/* Contact Form - Final Fallback */}
      <ContactForm />
      
      {/* AI Assistant Widget - Floating Helper */}
      <AIAssistant />
    </div>
  );
}
