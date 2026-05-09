import { Hero } from "../components/hero";
import { Header } from "../components/header";
import { FeaturesSec } from "../components/featuresSec";
import { CtaSec } from "../components/statSec";
import { Footer } from "../components/footer";
import { FaqSec } from "../components/sugSec";
import { About } from "../components/about";
export function Home() {
  return (
    <div className="relative scroll-smooth">
      <Header />
      <Hero />
      <About />
      <FeaturesSec />
      <CtaSec />
      <FaqSec />
      <Footer />

    </div>
  );
}
