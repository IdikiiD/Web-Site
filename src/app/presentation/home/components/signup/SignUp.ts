import { connect } from "react-redux";
import { RootState } from "app/store";
import { clickSignInButton, notifyUserIsSignedUp } from "app/presentation/home/components/signup/SignUpActions"
import { SignUpView } from "app/presentation/home/components/signup/SignUpView"

const mapStateToProps = (state: RootState) => {
  return state.homeViewState.signUpViewState;
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    clickSignInButton: () => dispatch(clickSignInButton()),
    notifyUserIsSignedUp: (props:{WMID:string, profitInPercent: number}) => dispatch(notifyUserIsSignedUp(props))
  };
};

export const SignUp = connect(mapStateToProps, mapDispatchToProps)(SignUpView);
