import styled, { css } from "styled-components"
import { StyledFormLabel, StyledInput } from "app/presentation/home/HomeStyles"
import { ChangeEvent } from "react"
import { Pallete } from "app/utils/Pallete"

type Props={
    value?: string,
    type?: InputType,
    label?: string,
    placeholder?: string,
    iconType?:IconType,
    maxLenght?: number
    onChange?: (target: ChangeEvent<HTMLInputElement>)=>void

}

type InputType='input' | 'password' | 'email' | 'number' | 'date' | 'time'

type IconType='profile' | 'lock' |'email' | 'transaction'

export function Input({label, placeholder, iconType, type, value, maxLenght=512, onChange}:Props){
    return  (<StyledInputView hasIcon={Boolean(iconType)}>
                {label && <StyledFormLabel>{label}</StyledFormLabel>}
                <StyledInputHolder>
                    {iconType&&renderIcon(iconType)}
                    <StyledInput onChange={onChange} placeholder={placeholder} type={type} value={value} maxLength={maxLenght}/>
                </StyledInputHolder>
            </StyledInputView>)
        function renderIcon(iconType: IconType){
            switch(iconType){
                case 'profile':
                    return renderUserSvgIcon(Pallete.main)
                case 'lock':
                    return renderLockSvgIcon(Pallete.main)
                case 'email':
                    return renderEmailSvgIcon(Pallete.main)
                case 'transaction':
                    return renderTransactionSvgIcon(Pallete.main)
            }
        }    

        function renderUserSvgIcon(fillCollor:string='d9d9d9'){
            return (
                <svg fill={fillCollor} strokeWidth="0" viewBox="0 0 24 24" height="24px" width="24px" xmlns="http://www.w3.org/2000/svg"><path d="M12 2a5 5 0 1 0 5 5 5 5 0 0 0-5-5zm0 8a3 3 0 1 1 3-3 3 3 0 0 1-3 3zm9 11v-1a7 7 0 0 0-7-7h-4a7 7 0 0 0-7 7v1h2v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1z"></path></svg>
                    )
        }
        
        function renderLockSvgIcon(fillCollor: string=Pallete.grey){
                return (<svg fill={fillCollor} strokeWidth="0" viewBox="0 0 24 24" height="24px" width="24px" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C9.243 2 7 4.243 7 7v3H6c-1.103 0-2 .897-2 2v8c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-8c0-1.103-.897-2-2-2h-1V7c0-2.757-2.243-5-5-5zm6 10 .002 8H6v-8h12zm-9-2V7c0-1.654 1.346-3 3-3s3 1.346 3 3v3H9z"></path></svg>)
        }
        
        function renderEmailSvgIcon(fillCollor: string=Pallete.grey){
            return (<svg fill={fillCollor} strokeWidth="0" viewBox="0 0 24 24" height="24px" width="24px" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0l-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z"></path></svg>)
        }

        function renderTransactionSvgIcon(fillCollor: string=Pallete.grey){
            return (<svg stroke={fillCollor} fill={fillCollor} strokeWidth="0" viewBox="0 0 1024 1024" height="24px" width="24px" xmlns="http://www.w3.org/2000/svg"><path d="M668.6 320c0-4.4-3.6-8-8-8h-54.5c-3 0-5.8 1.7-7.1 4.4l-84.7 168.8H511l-84.7-168.8a8 8 0 0 0-7.1-4.4h-55.7c-1.3 0-2.6.3-3.8 1-3.9 2.1-5.3 7-3.2 10.8l103.9 191.6h-57c-4.4 0-8 3.6-8 8v27.1c0 4.4 3.6 8 8 8h76v39h-76c-4.4 0-8 3.6-8 8v27.1c0 4.4 3.6 8 8 8h76V704c0 4.4 3.6 8 8 8h49.9c4.4 0 8-3.6 8-8v-63.5h76.3c4.4 0 8-3.6 8-8v-27.1c0-4.4-3.6-8-8-8h-76.3v-39h76.3c4.4 0 8-3.6 8-8v-27.1c0-4.4-3.6-8-8-8H564l103.7-191.6c.5-1.1.9-2.4.9-3.7zM157.9 504.2a352.7 352.7 0 0 1 103.5-242.4c32.5-32.5 70.3-58.1 112.4-75.9 43.6-18.4 89.9-27.8 137.6-27.8 47.8 0 94.1 9.3 137.6 27.8 42.1 17.8 79.9 43.4 112.4 75.9 10 10 19.3 20.5 27.9 31.4l-50 39.1a8 8 0 0 0 3 14.1l156.8 38.3c5 1.2 9.9-2.6 9.9-7.7l.8-161.5c0-6.7-7.7-10.5-12.9-6.3l-47.8 37.4C770.7 146.3 648.6 82 511.5 82 277 82 86.3 270.1 82 503.8a8 8 0 0 0 8 8.2h60c4.3 0 7.8-3.5 7.9-7.8zM934 512h-60c-4.3 0-7.9 3.5-8 7.8a352.7 352.7 0 0 1-103.5 242.4 352.57 352.57 0 0 1-112.4 75.9c-43.6 18.4-89.9 27.8-137.6 27.8s-94.1-9.3-137.6-27.8a352.57 352.57 0 0 1-112.4-75.9c-10-10-19.3-20.5-27.9-31.4l49.9-39.1a8 8 0 0 0-3-14.1l-156.8-38.3c-5-1.2-9.9 2.6-9.9 7.7l-.8 161.7c0 6.7 7.7 10.5 12.9 6.3l47.8-37.4C253.3 877.7 375.4 942 512.5 942 747 942 937.7 753.9 942 520.2a8 8 0 0 0-8-8.2z"></path></svg>)
        }
        
}



const StyledInputView=styled.div<{hasIcon:boolean}>`
    display: flex;
    position: relative;
    flex-direction: column;
    align-items: stretch;
    justify-content: center;    
    box-shadow: 0px 2px 0px 0px rgba(217, 217, 217, 1);

    ${StyledInput} {  
        width: 100%;       
        ${props=>props.hasIcon? css`padding-left: 36px;`:''}
        &:focus {
            box-shadow: 0px 2px 0px 0px rgba(8, 142, 162, 1);
            -webkit-transition: all 0.4s;
            -o-transition: all 0.4s;
            -moz-transition: all 0.4s;
            transition: all 0.4s;
        }
    }

    svg {
        position: absolute;
        top: calc(50% - 12px);
        left: 0px
        align-self: center;
    }
`

const StyledInputHolder=styled.div`
    position: relative;
    display: flex;
    justify-content: stretch;  
`