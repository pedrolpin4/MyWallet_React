import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    body{
        font-family: Raleway;
        height: 100%;
        width: 100%;
        background-color: ${({ theme: { colors } } ) => colors.primaryDark };
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    input, button{
        border: none;
        outline: none;
    }

    a {
        text-decoration: none;
        color: inherit;
    }

    @keyframes moveInRight{
        0%{
            opacity: 0;
            transform: translateX(300px);
        }

        100%{
            opacity: 1;
            transform: translate(0);
        }
    }

    @keyframes moveInTop{
        0%{
            opacity: 0;
            transform: translateY(-700px);
        }

        100%{
            opacity: 1;
            transform: translate(0);
        }
    }

    @keyframes moveInBottom{
        0%{
            opacity: 0;
            transform: translateY(200px);
        }

        100%{
            opacity: 1;
            transform: translate(0);
        }
    }

    /*reset css*/ 
    html,
    body,
    div,
    span,
    applet,
    object,
    iframe,
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    p,
    blockquote,
    pre,
    a,
    abbr,
    acronym,
    address,
    big,
    cite,
    code,
    del,
    dfn,
    em,
    img,
    ins,
    kbd,
    q,
    s,
    samp,
    small,
    strike,
    strong,
    sub,
    sup,
    tt,
    var,
    b,
    u,
    i,
    center,
    dl,
    dt,
    dd,
    ol,
    ul,
    li,
    fieldset,
    form,
    label,
    legend,
    table,
    caption,
    tbody,
    tfoot,
    thead,
    tr,
    th,
    td,
    article,
    aside,
    canvas,
    details,
    embed,
    figure,
    figcaption,
    footer,
    header,
    hgroup,
    menu,
    nav,
    output,
    ruby,
    section,
    summary,
    time,
    mark,
    audio,
    video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
    }

    article,
    aside,
    details,
    figcaption,
    figure,
    footer,
    header,
    hgroup,
    menu,
    nav,
    section {
    display: block;
    }
    
    ol,
    ul {
    list-style: none;
    }

    blockquote,
    q {
    quotes: none;
    }

    blockquote:before,
    blockquote:after,
    q:before,
    q:after {
    content: "";
    content: none;
    }

    table {
    border-collapse: collapse;
    border-spacing: 0;
    }

    * {
    box-sizing: border-box;
    }
`

export default GlobalStyles