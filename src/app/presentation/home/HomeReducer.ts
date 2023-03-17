import { createReducer } from "typesafe-actions";
import { StateProps } from "app/presentation/home/HomeView";
import { StateProps as ProfileViewState } from "app/presentation/home/components/profile/ProfileView";
import { StateProps as SignInViewState } from "app/presentation/home/components/signin/SignInView";
import { StateProps as SignUpViewState  } from "app/presentation/home/components/signup/SignUpView";
import { combineReducers } from "redux";
import { initialProfileViewState, profileReducer } from "app/presentation/home/components/profile/ProfileReducer";
import { initialSignInViewState, signInReducer } from "app/presentation/home/components/signin/SignInReducer";
import { initialSignUpViewState, signUpReducer } from "app/presentation/home/components/signup/SignUpReducer";
import { clickSignUpButton, notifyUserIsSignedIn } from "app/presentation/home/components/signin/SignInActions";
import { clickProfileButton, notifyCloseProfile, clickJoinButton} from "app/presentation/home/HomeActions";
import { clickSignInButton, notifyUserIsSignedUp } from "app/presentation/home/components/signup/SignUpActions";
import { notifyUserIsSignedOut } from "app/presentation/home/components/profile/ProfileActions";

type CommonViewState=StateProps

const initialCommonViewState: CommonViewState = { 
  showProfileHolder: false,
  showProfile: false,
  showSignIn: true,
  showSignUp: false,
  profileLabel: undefined
};

export const commonReducer = createReducer<CommonViewState>(
  initialCommonViewState
).handleAction(clickProfileButton, (state: CommonViewState) => ({
  ...state,
  showProfileHolder: !state.showProfileHolder
}))
.handleAction([notifyUserIsSignedIn, notifyUserIsSignedUp], (state: CommonViewState, action: ReturnType<typeof notifyUserIsSignedIn> | ReturnType<typeof notifyUserIsSignedUp>) => ({
  ...state,
  showSignIn: false,
  showSignUp: false,
  showProfile: true,
  profileLabel:action.payload.WMID
  // showProfileHolder: false
}))
.handleAction(notifyUserIsSignedOut, (state: StateProps, action: ReturnType<typeof notifyUserIsSignedIn>) => ({
  showSignIn: true,
  showSignUp: false,
  showProfile: false,
  // showProfileHolder: false
}))
.handleAction(clickSignInButton, (state: CommonViewState) => ({
  ...state,
  showSignUp: false,
  showSignIn: true
}))
.handleAction(clickSignUpButton, (state: CommonViewState) => ({
  ...state,
  showSignUp: true,
  showSignIn: false
}))
.handleAction(notifyCloseProfile, (state: CommonViewState) => ({
  ...state,
  showProfileHolder: false
}))
.handleAction(clickJoinButton, (state: CommonViewState) => ({
  ...state,
  showSignIn: false,
  showSignUp: true,
  showProfile: false,
  showProfileHolder: true
}));




export type HomeViewState={
  commonViewState:CommonViewState,
  profileViewState:ProfileViewState,
  signInViewState:SignInViewState,
  signUpViewState:SignUpViewState
}

export const initialHomeViewState: HomeViewState = {
  commonViewState: initialCommonViewState,
  profileViewState: initialProfileViewState,
  signInViewState: initialSignInViewState,
  signUpViewState: initialSignUpViewState
};

export const homeReducer = combineReducers({
  commonViewState: commonReducer,
  profileViewState: profileReducer,
  signInViewState: signInReducer,
  signUpViewState: signUpReducer
})