import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import Layout from "../components/layout"

const ThanksPage: React.FC<PageProps> = () => {
  return (
    <Layout>
      <div className="thanks__wrapper">
        <img src="/images/products/blue/tilt.jpg" alt={"2 Blue SUP Holders"} />
        <h1>Thanks for your order!</h1>
        <p>Keep an eye on the email you submitted for order updates, and please email us at sup@supholder.com if you have any questions!</p>
      </div>
    </Layout>
  )
}

export default ThanksPage

export const Head: HeadFC = () => <title>Thanks for your order! SUP Holder — Adventure Without Spills</title>
