import React from 'react';
import {ThemeProvider} from "styled-components";
import {defaultTheme} from "./themes";

const MyThemeProvider = ({children}) => {
    return (
        <ThemeProvider theme={defaultTheme}>
            {children}
        </ThemeProvider>
    );
};

export default MyThemeProvider;