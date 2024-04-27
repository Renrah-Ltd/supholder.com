import { PageProps } from "gatsby";
import * as React from "react";
import Swatches from "./swatches";
export interface LayoutProps  { 
    children: React.ReactNode
 }
 
const Layout: React.FC<LayoutProps> = ({children}) => {
    return (
        <div className="Layout">
                    <Swatches />

            {children}
            <Swatches />

        </div>
    )
}

export default Layout