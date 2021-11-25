import { ThemeProvider } from "styled-components";

const light = {
  colors: {
    primary: "#A328D6",
    primaryDark: "#8C11BE",
    secondary: "#FFF",
    secondaryDark: "#868686",
    terciary: "#03AC00",
    quarternary: '#C70000',
    inputs: "#000",
  },
};

const dark = {
    colors: {
        primary: "#A328D6",
        primaryDark: "#8C11BE",
        secondary: "#FFF",
        secondaryDark: "#868686",
        terciary: "#03AC00",
        quarternary: '#C70000',
        inputs: "#000",
    },
}

const Theme = ({ children, type }) => (
  <ThemeProvider theme={type === 'light' ? light : dark}>{children}</ThemeProvider>
);

export default Theme;