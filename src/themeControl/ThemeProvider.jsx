import { createContext, useState } from "react";

export  const ThemeContext = createContext();
const ThemeProvider = ({children}) => {
    const [theme, setTheme] = useState(false);
    const darkMode = () => {
        if (theme) {
          document.querySelector("#root").setAttribute("class", "dark");
        } else {
          document.querySelector("#root").setAttribute("class", "");
        }
      };
      const toggle = () => {
        setTheme(!theme);
      };
      darkMode();
    return (
        <ThemeContext.Provider value={{theme, setTheme, toggle}}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;