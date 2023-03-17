import { createReducer } from "typesafe-actions";
import { StateProps } from "app/presentation/home/components/profile/ProfileView";
import { notifyUserIsSignedIn } from "app/presentation/home/components/signin/SignInActions";
import { notifyUserIsSignedOut } from "app/presentation/home/components/profile/ProfileActions";
import { notifyUserIsSignedUp } from "app/presentation/home/components/signup/SignUpActions";

export const initialProfileViewState: StateProps = {
  WMIDLabel: '',
  profitInPercent: 0
};

export const profileReducer = createReducer<StateProps>(
  initialProfileViewState
).handleAction([notifyUserIsSignedIn,notifyUserIsSignedUp], (state: StateProps, action: ReturnType<typeof notifyUserIsSignedIn>) => ({
  ...state,
  WMIDLabel: action.payload.WMID,
  profitInPercent: action.payload.profitInPercent
}))
.handleAction(notifyUserIsSignedOut, (state: StateProps, action: ReturnType<typeof notifyUserIsSignedIn>) => ({
  ...initialProfileViewState
}))
