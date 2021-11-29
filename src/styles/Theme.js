import { ThemeProvider } from "styled-components";

const light = {
  colors: {
    primary: "#A328D6",
    primaryDark: "#8C11BE",
    secondary: "#FFF",
    secondaryAdaptable: "#FFF",
    secondaryDark: "#868686",
    terciary: "#03AC00",
    quarternary: '#C70000',
    inputs: "#000",
  },
};

const dark = {
    colors: {
        primary: "#333",
        primaryDark: "#000",
        secondary: "#333",
        secondaryAdaptable: "#fff",
        secondaryDark: "#bbb",
        terciary: "#02FF09",
        quarternary: '#FF2B20',
        inputs: "#fff",
    },
}

const Theme = ({ children, type }) => (
  <ThemeProvider theme={type === 'light' ? light : dark}>{children}</ThemeProvider>
);

export default Theme;