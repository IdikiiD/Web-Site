import React, { RefObject } from "react";
import styled from "styled-components";
import { clickSignUpButton, notifyUserIsSignedIn } from "app/presentation/home/components/signin/SignInActions";
import api from "app/utils/api";
import { StyledButton ,StyledForm, StyledMenuList, StyledMenuItem, StyledLabel} from "app/presentation/home/HomeStyles";
import ReCAPTCHA from "react-google-recaptcha";
import {Input} from "app/presentation/home/components/input/Input";
import { Pallete } from "app/utils/Pallete";
import { FormOverlay } from "app/presentation/home/components/overlay/FormOverlay";

export type OwnProps = {
  reCaptchaRef: RefObject<ReCAPTCHA>
};

export type StateProps = {};

export type ActionProps = {
  clickSignUpButton: typeof clickSignUpButton;
  notifyUserIsSignedIn: typeof notifyUserIsSignedIn
};

type Props = OwnProps & StateProps & ActionProps;
type State = {
  formData:{
    WMID: string
    password: string
  },
  showErrorMessage: boolean
  showFormOverlay: boolean
  isSubmitButtonDisabled: boolean
}

export class SignInView extends React.Component<Props, State> {
  state = {
    formData: {
      WMID: '',
      password: ''
    },
    showErrorMessage: false,
    showFormOverlay: false,
    isSubmitButtonDisabled: true
  };

  
  render() {
    return (
      <StyledSignInView>
        <StyledForm>      
          <StyledFormTitle><StyledLabel font="Roboto Condensed" size={36} weight={700}>Sign In</StyledLabel></StyledFormTitle>
            {this.state.showErrorMessage && <StyledErrorLabel size={20}>Not valid credentials</StyledErrorLabel>}
            <Input label="Stellar Address" iconType="profile" placeholder="GCCVPYFOHY7ZB7557..." onChange={({target:{value:WMID}})=>this.setState({formData:{...this.state.formData, WMID},isSubmitButtonDisabled:this.isSubmitButtonDisabled(WMID)})}/>
            
            <Input label="Password" iconType="lock" placeholder="Type password" onChange={({target:{value:password}})=>this.setState({formData:{...this.state.formData, password},isSubmitButtonDisabled:this.isSubmitButtonDisabled(null,password)})}  type="password" maxLenght={256}/>
          
            
              <StyledAuthButton onClick={event=>{
                  this.setState({showErrorMessage:false, showFormOverlay:true})
                  this.props.reCaptchaRef.current?.executeAsync().then(captchaResponse => {                   
                    api.signin({...this.state.formData, captchaResponse}).then(({WMID, profitInPercent})=>{
                      this.setState({showFormOverlay:false})
                      this.props.notifyUserIsSignedIn({WMID, profitInPercent})
                      this.props.reCaptchaRef.current?.reset()
                    }).catch(()=>{
                      this.setState({showFormOverlay:false, showErrorMessage:true})
                      this.props.reCaptchaRef.current?.reset()
                    })  
                  }).catch(()=>{
                    this.setState({showFormOverlay:false, showErrorMessage:true})
                  })                                                                   

                  event.preventDefault()
                }} disabled={this.state.isSubmitButtonDisabled}>Sign In</StyledAuthButton>
            
            <StyledActionsList>
              <StyledMenuItem  onClick={event=>{
                  this.props.clickSignUpButton()
                  event.preventDefault()
                }}>
                <StyledLabel>Sign Up</StyledLabel>
              </StyledMenuItem>
            </StyledActionsList>
        </StyledForm>
        {this.state.showFormOverlay&&<FormOverlay/>}
      </StyledSignInView>
    );
  }
  
  private isSubmitButtonDisabled=(WMID:string|null,password:string|null=null)=>{
    return !(Boolean((WMID===null?this.state.formData.WMID:WMID)) && Boolean((password===null?this.state.formData.password:password)))
  }
}

const StyledSignInView = styled.div`
  padding: 55px;
  position:relative;
`;

export const StyledFormTitle=styled.div`
  padding-bottom:48px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const StyledAuthButton=styled(StyledButton)`
  margin-top: 48px;
`
export const StyledActionsList=styled(StyledMenuList)`
  margin-top: 48px;
  padding: 0;
  margin-left: unset;
  display:flex;
  justify-content: center;

  > {
    padding: 0;
    margin: 0;
  }

`

export const StyledErrorLabel = styled(StyledLabel)`
  padding: 8px 0;
  align-self: center;
  color: red;
`

export const StyledSuccessLabel = styled(StyledLabel)`
  padding: 8px 0;
  align-self: center;
  color: ${Pallete.main};
`
