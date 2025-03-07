import React from "react";
import { graphql, StaticQuery } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

const HowItWorks: React.FC = () => (
    <section className="how-it-works__wrapper">

        <div className="how-it-works__content">
            <h3>How It Works</h3>
            <p>The SUP Holder fits snugly underneath the bungies* on the front or back of your SUP paddle board.</p>
            <small>*If your board doesn't have bungies it won't work for you. Sorry 😭</small>
        </div>
        <StaticQuery
            query={graphql`
      query {
        file(relativePath: { eq: "sup-holder-top-down.jpg" }) {
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
    </section>
);

export default HowItWorks


