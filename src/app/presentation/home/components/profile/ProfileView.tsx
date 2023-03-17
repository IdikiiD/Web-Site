import React, { RefObject } from "react";
import styled from "styled-components";
import { notifyUserIsSignedOut } from "app/presentation/home/components/profile/ProfileActions";
import {StyledForm, StyledMenuItem, StyledLabel } from "app/presentation/home/HomeStyles";
import { StyledAuthButton, StyledErrorLabel, StyledSuccessLabel, StyledFormTitle, StyledActionsList } from "app/presentation/home/components/signin/SignInView";
import {Input} from "app/presentation/home/components/input/Input";
import api from "app/utils/api";
import ReCAPTCHA from "react-google-recaptcha";
import { FormOverlay } from "app/presentation/home/components/overlay/FormOverlay";

export type OwnProps = {
  reCaptchaRef: RefObject<ReCAPTCHA>
};

export type StateProps = {
  WMIDLabel: string
  profitInPercent: number
};

export type ActionProps = {
  notifyUserIsSignedOut: typeof notifyUserIsSignedOut
};

type Props = OwnProps & StateProps & ActionProps;
type State = {
  formData:{
    transactionId: string
  },
  showErrorMessage: boolean,
  showSuccessMessage: boolean
  showFormOverlay: boolean,
  isSubmitButtonDisabled: boolean
}

export class ProfileView extends React.Component<Props, State> {
  state = {
    formData: {
      transactionId: ''
    },
    showErrorMessage: false,
    showSuccessMessage: false,
    showFormOverlay: false,
    isSubmitButtonDisabled: true
  };

  
  render() {
    return (
      <StyledProfileView>
        <StyledForm> 
          <StyledProfileFormTitle>
            <StyledLabel font="Roboto Condensed" size={24} weight={700}>Seller Address:</StyledLabel>
            <StyledLabel size={20} weight={400}>&nbsp;{this.props.WMIDLabel}</StyledLabel>
          </StyledProfileFormTitle>
          <StyledFormTitle>
            <StyledProfitLabel size={18} weight={400}>Profit&nbsp;({this.props.profitInPercent}%)</StyledProfitLabel>
          </StyledFormTitle>
            {this.state.showErrorMessage && <StyledErrorLabel size={20}>ID can not be added</StyledErrorLabel>}
            {this.state.showSuccessMessage && <StyledSuccessLabel size={20}>ID has been added successfuly</StyledSuccessLabel>}
            <Input label="Transaction ID" value={this.state.formData.transactionId} iconType="transaction" placeholder="Type transaction id" onChange={({target:{value:transactionId}})=>{
                this.setState({formData:{...this.state.formData, transactionId},isSubmitButtonDisabled:!Boolean(transactionId)})

              }} maxLenght={256}/>
            
              <StyledAuthButton onClick={event=>{
                  this.setState({showErrorMessage:false, showSuccessMessage:false, showFormOverlay:true})
                  this.props.reCaptchaRef.current?.executeAsync().then(captchaResponse => {
                    api.createTransaction({...this.state.formData, captchaResponse}).then(_=>{
                      this.setState({showSuccessMessage: true, formData: {transactionId:''},showFormOverlay:false,isSubmitButtonDisabled:true})
                      this.props.reCaptchaRef.current?.reset()
                    }).catch(()=>{
                      this.setState({showFormOverlay:false, showErrorMessage:true})
                      this.props.reCaptchaRef.current?.reset()
                      })  
                  }).catch(()=>{
                    this.setState({showFormOverlay:false,showErrorMessage:true
                  })})
                  event.preventDefault()
                }} disabled={this.state.isSubmitButtonDisabled}>Add Transaction</StyledAuthButton>
            
            <StyledActionsList>
              <StyledMenuItem  onClick={event=>{                  
                  api.signout().then(_=>{
                    this.props.notifyUserIsSignedOut()
                  })
                  event.preventDefault()
                }}>
                <StyledLabel >Logout</StyledLabel>
              </StyledMenuItem>
            </StyledActionsList>
        </StyledForm>
        {this.state.showFormOverlay&&<FormOverlay/>}
      </StyledProfileView>
    );
  }
  
}

const StyledProfileView = styled.div`
  padding: 55px;
  position: relative;`;

const StyledProfitLabel=styled(StyledLabel)`
  margin-left: 8px
`

const StyledProfileFormTitle=styled(StyledFormTitle)`
  padding-bottom: 16px;
`
