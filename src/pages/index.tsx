import * as React from "react"
import { StaticQuery, graphql, type HeadFC, type PageProps } from "gatsby"
import Layout from "../components/layout";
import SUPHolderLogo from "../images/sup-holder-logo.svg";
import PaddleBoard from "../images/paddle-board.svg";
import Can from "../images/can.svg";
import Weather from "../images/weather.svg";
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
        file(relativePath: { eq: "sup-holder-hand-crop.jpg" }) {
          childImageSharp {
            gatsbyImageData(
              height: 1000
              aspectRatio: 1 
              formats: [AUTO, WEBP, AVIF]
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
      <BuyNowButton />
      <p>Universal Can Holder for Stand-Up Paddle Boards</p>
    </div>
  </header>
);

const FeaturesSection: React.FC = () => (
  <section aria-label="Features" className="features">
    <ul>
      <li>
        <img className="sup-holder-logo" src={PaddleBoard} alt="Paddleboard Icon" />
        Fits Any Paddle Board With Bungees
      </li>
      <li>
        <img className="sup-holder-logo" src={Can} alt="Paddleboard Icon" />
        Secure Grip For 12oz & 16oz Cans. <span>"Skinny Can" Version Coming Soon</span></li>
      <li>
        <img className="sup-holder-logo" src={Weather} alt="Paddleboard Icon" />
        High-Strength, Weather-Resistant Plastic</li>
    </ul>
  </section>
);



const Testimonials: React.FC = () => {

  const testimonies = [
    {
      "name": "Emily",
      "review": "I'm new to the SUP world but know the importance of having a beverage on the water with me. SUP Holder is perfect to keep my drink upright so I get to enjoy every drop - no drops spilled."
    }
  ]

  return (
    <section className="testimonials__wrapper">
      <h3>We may be light on reviews, but we’re heavy on happy customers! ⭐️⭐️⭐️⭐️⭐️</h3>
      <div className="testimonials">
        {testimonies.map(({ name, review }) => {
          return (<div className="testimonial__wrapper">
            <p>{review}</p>
            <em>- {name}</em>
          </div>)
        })}
      </div>
    </section>
  )
};

const BuyNowButton: React.FC = () => {
  const openModal = () => {
    const event = new CustomEvent('openModalEvent');
    window.dispatchEvent(event);
  };


  return (
    <Button onClick={openModal} label="Order Now" />
  )
};

const FAQSection: React.FC = () => {

  const questions = [
    { q: "How does the SUP Holder attach to the paddle board?", a: "The SUP Holder attaches to your paddleboard by sitting underneath the bungees on the nose of the board. If your board does NOT have bungees, the SUP Holder won't work for you." },
    {
      q: "What size cans work with the SUP Holder?",
      a: "The SUP Holder is designed to snugly fit the standard 12oz beverage can (picture a standard soda can). It can also hold taller cans as long as their diameter is 2.6 inches. (think Monster Energy cans). Skinny cans ~can~ fit, but they won't be as stable. Skinny can SUP Holders coming soon."
    },
    {
      q: "What is the SUP Holder made out of?",
      a: "The SUP Holder is 3D printed out of PETG, a strong, heat & water resistant material. It's the chemical cousin of PET which is used in tons of plastic products throughout the world."
    },
    {
      q: "How long does it take to ship?",
      a: "Each SUP Holder is printed on demand. It can take 3-5 business days for your order to ship, and then another 5-7 days to arrive at your doorstep."
    },
    {
      q: "Where do you ship to?",
      a: "We only ship to addresses in the United States."
    }
  ]



  return (


    <section className="faqs">
      <h3>SUP Holder FAQs</h3>
      {questions.map(({ q, a }, i) => (
        <details name="faq" open={(i == 0 ? true : false)}>
          <summary>{q}</summary>
          <p>{a}</p>
        </details>
      ))}
      <p className="faqs-contact">If you have any other questions, please email us: <a href="mailto:sup@supholder.com">sup@supholder.com</a></p>
    </section>
  )
};

const Footer: React.FC = () => (
  <footer className="main-footer">
    <p>© 2024 SUP Holder | sup@SUPHolder.com</p>
    <p>Made with 💜 in Denver, Colorado</p>
    <small>Always Paddle Board Responsibly</small>
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
        <section className="cta">
          <h2>Order Your <img aria-label={"SUP Holder"} className="sup-holder-logo" src={SUPHolderLogo} alt="SUP Holder" />
            Today!</h2>
          <BuyNowButton />
        </section>
        <FAQSection />
        <BuyNowButton />
        <Footer />
        <BuyNowModal />
      </>
    </Layout>
  )
}

export default IndexPage
import ogImage from "../images/og-image.png";
import HowItWorks from "../components/how-it-works";

export const Head: HeadFC = () => {

  const title = "SUP Holder — Adventure Without Spills! Cup Holder for Stand Up Paddle Boards"
  const description = "Secure your beverages while you're out paddle boarding! Secure fit for 12 & 16oz cans. Adventure without spills!"

  return (<>
    <title>{title}</title>
    <meta name="robots" content="index, follow" />

    <meta property="description" content={description} />

    <meta
      property="og:image"
      content={ogImage}
    />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:url" content="https://supholder.com" />
    <meta property="og:type" content="website" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />

    <meta
      property="twitter:image"
      content={ogImage}
    />
  </>)
}
