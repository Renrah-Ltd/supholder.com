import * as React from "react"
import { StaticQuery, graphql, type HeadFC, type PageProps } from "gatsby"
import Swatches from "../components/swatches";
import Layout from "../components/layout";
import SUPHolderLogo from "../images/sup-holder-logo.svg";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import BuyNowModal from "../components/buy-now-modal";

// Define props where needed (for more complex components)
type ButtonProps = {
  label: string;
  href?: string;
  onClick?: () => void;
};

const Button: React.FC<ButtonProps> = ({ label, href, onClick }) => {
  if (href) {
    return (<a className="button" href={href}>{label}</a>)
  } else {
    return (
      <button className="button" onClick={onClick}>{label}</button>
    )
  }
};

const Header: React.FC = () => (
  <header className="header">
    <StaticQuery
      query={graphql`
      query {
        file(relativePath: { eq: "header-sample.webp" }) {
          childImageSharp {
            gatsbyImageData(
              width: 800
              placeholder: BLURRED
              formats: [AUTO, WEBP, AVIF]
              layout: CONSTRAINED
            )
          }
        }
      }
    `}
      render={data => {
        const image = getImage(data.file.childImageSharp.gatsbyImageData)
        if (image) return <div className="header-image"><GatsbyImage image={image} alt="SUP Holder - Adventure Without Spills" /></div>
      }}
    />

    <div className="header-content">
      <img className="sup-holder-logo" src={SUPHolderLogo} alt="SUP Holder" />
      <h1>Adventure Without Spills</h1>
      <CallToAction />
      <p>Universal Can Holder for Stand-Up Paddle Boards</p>
    </div>
  </header>
);

const FeaturesSection: React.FC = () => (
  <section className="features">
    <h3>Features</h3>
    <ul>
      <li>Fits any paddleboard with bungees</li>
      <li>Secure Grip for regular 12oz & 24oz soda & beer cans. <span>"Skinny Can" version coming soon</span></li>
      <li>High-strength, Weather-Resistant Plastic</li>
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

const CallToAction: React.FC = () => {
  const openModal = () => {
    const event = new CustomEvent('openModalEvent');
    window.dispatchEvent(event);
  };


  return (
    <Button onClick={openModal} label="Buy Now" />
  )
};

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
    <Layout>
      <>
        <Header />
        <FeaturesSection />
        <HowItWorks />
        <Testimonials />
        <CallToAction />
        <FAQSection />
        <Footer />
        <BuyNowModal />
      </>
    </Layout>
  )
}

export default IndexPage

export const Head: HeadFC = () => <title>SUP Holder — Adventure Without Spills</title>
