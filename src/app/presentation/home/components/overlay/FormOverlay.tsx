import { StyledLoaderIcon } from "app/presentation/home/components/icons/LoaderIcon"
import { Pallete } from "app/utils/Pallete"
import styled from "styled-components"

export function FormOverlay(){
    return <StyledFormOverlay>
        <StyledLoaderIcon fill={Pallete.black}/> 
    </StyledFormOverlay>
}

const StyledFormOverlay=styled.div`
   position:absolute;
   top: 0;
   left: 0;
   width: 100%;
   height: 100%;
   display:flex;
   align-items:center;
   justify-content:center;
   border-radius: 8px;
   background: rgba(255, 255, 255, 0.64)
`