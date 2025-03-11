import React from "react";

const Base = ({
    children,
    footerLinks,
    session,
    socials,
    terms,
    showSlogan = true,
    showFooter = true,
    gradientStart = "#c4b8d3",
    gradientEnd = "#f1d7c1",
    menuGradientEnd = "#dbc8c9",
}) => {
    return <section>{children}</section>;
};

export default Base;
