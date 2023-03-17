import { createGlobalStyle } from "styled-components";
import RobotoWoff from "assets/fonts/roboto-condensed-v19-latin-regular.woff";
import RobotoWoff2 from "assets/fonts/roboto-condensed-v19-latin-regular.woff2";
import RubikWoff2 from "assets/fonts/rubik-v14-latin-regular.woff2";
import RubikWoff from "assets/fonts/rubik-v14-latin-regular.woff";
import RubikTtf from "assets/fonts/rubik-v14-latin-regular.ttf";
import { Pallete } from "app/utils/Pallete";

const GlobalStyle = createGlobalStyle`

body{    
  width: 100%;
  margin: 0;  
  display: flex;
  justify-content: stretch;
  background: ${Pallete.background};
}

#root {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}


a, a:hover, a:visited, a:active {
  color: inherit;
  text-decoration: none;
 }

@font-face {
  font-family: 'Roboto Condensed';
  src: url(${RobotoWoff2}) format('woff2'),
       url(${RobotoWoff}) format('woff');
}


@font-face {
  font-family: 'Rubik';
  src: url(${RubikWoff2}) format('woff2'),
       url(${RubikWoff}) format('woff'),
       url(${RubikTtf}) format('truetype');
}
`;

export default GlobalStyle;
