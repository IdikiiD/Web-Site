import React, { RefObject } from "react";
import styled from "styled-components";
import { notifyUserIsSignedUp, clickSignInButton } from "app/presentation/home/components/signup/SignUpActions";
import {StyledForm, StyledMenuItem, StyledLabel } from "app/presentation/home/HomeStyles";
import { StyledAuthButton, StyledErrorLabel, StyledFormTitle, StyledActionsList } from "app/presentation/home/components/signin/SignInView";
import {Input} from "app/presentation/home/components/input/Input";
import api from "app/utils/api";
import ReCAPTCHA from "react-google-recaptcha";
import { FormOverlay } from "app/presentation/home/components/overlay/FormOverlay";

export type OwnProps = {
  reCaptchaRef: RefObject<ReCAPTCHA>
};

export type StateProps = {};

export type ActionProps = {
  notifyUserIsSignedUp: typeof notifyUserIsSignedUp;
  clickSignInButton: typeof clickSignInButton
};

type Props = OwnProps & StateProps & ActionProps;
type State = {
  formData:{
    WMID: string
    email: string
    password: string
  },
  showErrorMessage: boolean
  showFormOverlay: boolean
  isSubmitButtonDisabled: boolean
}

export class SignUpView extends React.Component<Props, State> {
  state = {
    formData: {
      WMID: '',
      email: '',
      password: ''
    },
    showErrorMessage: false,
    showFormOverlay: false,
    isSubmitButtonDisabled: true
  };

  
  render() {

    console.log('SIGNUP',this.props.reCaptchaRef)
    
    return (
      <StyledSignUpView>
        <StyledForm> 
        <StyledFormTitle><StyledLabel font="Roboto Condensed" size={36} weight={700}>Sign Up</StyledLabel></StyledFormTitle>
            {this.state.showErrorMessage && <StyledErrorLabel size={20}>Registration error</StyledErrorLabel>}
            <Input label="Stellar Address" iconType="profile" placeholder="GCCVPYFOHY7ZB7557..." onChange={({target:{value:WMID}})=>this.setState({formData:{...this.state.formData, WMID},isSubmitButtonDisabled:this.isSubmitButtonDisabled(WMID)})}/>
            
            <Input label="Email" iconType="email" placeholder="Type email" onChange={({target:{value:email}})=>this.setState({formData:{...this.state.formData, email},isSubmitButtonDisabled:this.isSubmitButtonDisabled(null,email)})} maxLenght={256}/>
            
            <Input label="Password" iconType="lock" placeholder="Type password" onChange={({target:{value:password}})=>this.setState({formData:{...this.state.formData, password},isSubmitButtonDisabled:this.isSubmitButtonDisabled(null,null, password)})}  type="password" maxLenght={256}/>
          
            
              <StyledAuthButton onClick={event=>{
                  this.setState({showFormOverlay:true,showErrorMessage:false})
                  this.props.reCaptchaRef.current?.executeAsync().then(captchaResponse => {
                    api.signup({...this.state.formData, captchaResponse}).then(({WMID, profitInPercent})=>{
                      this.props.notifyUserIsSignedUp({WMID, profitInPercent})
                      this.setState({showFormOverlay:false})
                      this.props.reCaptchaRef.current?.reset()
                    }).catch(()=>{
                      this.setState({showFormOverlay:false, showErrorMessage:true})
                      this.props.reCaptchaRef.current?.reset()
                    })  
                  }).catch(()=>{
                    this.setState({showErrorMessage:true
                  })})
                  event.preventDefault()
                }} disabled={this.state.isSubmitButtonDisabled}>Sign In</StyledAuthButton>
            
            <StyledActionsList>
              <StyledMenuItem  onClick={event=>{
                  this.props.clickSignInButton()
                  event.preventDefault()
                }}>
                <StyledLabel>Sign In</StyledLabel>
              </StyledMenuItem>
            </StyledActionsList>
        </StyledForm>
        {this.state.showFormOverlay&&<FormOverlay/>}
      </StyledSignUpView>
    );
  }

  private isSubmitButtonDisabled=(WMID:string|null,email:string|null=null,password:string|null=null)=>{
    return !(Boolean((WMID===null?this.state.formData.WMID:WMID)) && Boolean((email===null?this.state.formData.email:email)) && Boolean((password===null?this.state.formData.password:password)))
  }
}

const StyledSignUpView = styled.div`
  padding: 55px;
  position: relative;
`;
