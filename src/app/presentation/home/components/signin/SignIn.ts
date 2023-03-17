import { connect } from "react-redux";
import { RootState } from "app/store";
import { clickSignUpButton,notifyUserIsSignedIn } from "app/presentation/home/components/signin/SignInActions"
import { SignInView } from "app/presentation/home/components/signin/SignInView"

const mapStateToProps = (state: RootState) => {
  return state.homeViewState.signInViewState;
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    clickSignUpButton: () => dispatch(clickSignUpButton()),
    notifyUserIsSignedIn: (props:{WMID:string, profitInPercent: number}) => dispatch(notifyUserIsSignedIn(props))
  };
};

export const SignIn = connect(mapStateToProps, mapDispatchToProps)(SignInView);
