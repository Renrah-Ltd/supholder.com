import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import Layout from "../components/layout"


const ThanksPage: React.FC<PageProps> = () => {
  return (
    <Layout>
      <><h1>Thanks for your order!</h1></>
    </Layout>
  )
}

export default ThanksPage

export const Head: HeadFC = () => <title>Thanks for your order! SUP Holder — Adventure Without Spills</title>
