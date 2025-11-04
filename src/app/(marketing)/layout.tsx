import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SplashCursor from '@/components/effects/SplashCursor';

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SplashCursor 
        SPLAT_RADIUS={0.08}
        SPLAT_FORCE={2000}
        DENSITY_DISSIPATION={5}
        VELOCITY_DISSIPATION={3}
        DYE_RESOLUTION={512}
      />
      <Navbar />
      <main className="min-h-screen pt-20">{children}</main>
      <Footer />
    </>
  );
}
