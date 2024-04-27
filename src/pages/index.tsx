import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"


// Define props where needed (for more complex components)
type ButtonProps = {
  label: string;
  onClick: () => void;
};

const Button: React.FC<ButtonProps> = ({ label, onClick }) => (
  <button onClick={onClick}>{label}</button>
);

const Header: React.FC = () => (
  <header>
    <h1>Stay Hydrated While You Paddle</h1>
    <h2>Secure Your Beverage with the SUP Holder – Adventure Without Spills</h2>
  </header>
);

const FeaturesSection: React.FC = () => (
  <section>
    <h3>Features</h3>
    <ul>
      <li>Fits any paddleboard with bungees</li>
      <li>Secure Grip for regular 12oz soda & beer cans.</li>
      <li>High-strength, Weather-resistant Plastic</li>
    </ul>
  </section>
);

const HowItWorks: React.FC = () => (
  <section>
    <h3>How It Works</h3>
    <p>Simple step-by-step guide on how to attach the SUP Holder to your paddle board.</p>
  </section>
);

const Testimonials: React.FC = () => (
  <section>
    <h3>Customer Reviews</h3>
    <p>"Best purchase ever! My drinks stay put no matter the waves."</p>
  </section>
);

const CallToAction: React.FC = () => (
  <section>
    <Button label="Buy Now" onClick={() => console.log('Navigate to purchase')} />
  </section>
);

const FAQSection: React.FC = () => (
  <section>
    <h3>FAQs</h3>
    <p>Find answers to common questions about the SUP Holder.</p>
  </section>
);

const Footer: React.FC = () => (
  <footer>
    <p>Contact us at info@supholder.com</p>
  </footer>
);
const IndexPage: React.FC<PageProps> = () => {
  return (
    <main>
      <Header />
      <FeaturesSection />
      <HowItWorks />
      <Testimonials />
      <CallToAction />
      <FAQSection />
      <Footer />

    </main>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>SUP Holder — Adventure Without Spills</title>
