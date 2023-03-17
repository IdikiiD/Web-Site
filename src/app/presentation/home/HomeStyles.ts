import { Pallete } from "app/utils/Pallete";
import styled, { css } from "styled-components";

export const StyledLabel = styled.span<{
    font?: string;
    size?: number;
    weight?: number;
    color?: string;
  }>`
    font-family: ${(props) => props.font || "Rubik"};
    font-size: ${(props) => props.size || 18}px;
    font-style: normal;
    font-weight: ${(props) => props.weight || 400};
    ${(props) =>
      props.color
        ? css`
            color: ${props.color};
          `
        : ""}
  `;

export const StyledButton = styled.button<{disabled?:boolean}>`
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Roboto Condensed;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  cursor: pointer;
  background: #ffffff;
  box-shadow: 0px 0px 0px 1px rgba(0, 0, 0, 1);

  ${props=>!props.disabled?
    css`:hover {
      background: ${Pallete.main};
      color: white;
      border: none;
    }`
    :''
  }  
`;

export const StyledForm=styled.form`
  padding:8px;
  display: flex;
  flex-direction:column; 
`

export const StyledFormLabel = styled(StyledLabel)`
  margin-top: 48px;
`;

export const StyledInput = styled.input`
  height: 40px;
  margin-top: 4px;
  outline: none;
  border: none;
  background: inherit;
  font-size:20px;
`;

export const StyledTextArea = styled.textarea`
  outline: none;
  border: none;
  background: inherit;
  box-shadow: 0px 2px 0px 0px rgba(217, 217, 217, 1);

  resize: vertical;

  &:focus {
    box-shadow: 0px 2px 0px 0px rgba(8, 142, 162, 1);
    -webkit-transition: all 0.4s;
    -o-transition: all 0.4s;
    -moz-transition: all 0.4s;
    transition: all 0.4s;
}
`;

export const StyledMenuList = styled.ul`
  height: 30px;
  margin-left: auto;
  display: flex;
  align-items: stretch;

  > * + * {
    margin-left: 60px;
  }
`;

export const StyledMenuItem = styled.li`
  position: relative;
  list-style-type: none;
  white-space:nowrap;
  cursor: pointer;
  :hover {
    ::after {
      width: 8px;
      height: 8px;
      bottom: 0;
      left: calc(50% - 4px);
      position: absolute;
      content: "";
      background: ${Pallete.main};
      border-radius: 4px;
    }
  }
`;

