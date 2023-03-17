import { createReducer } from "typesafe-actions";
import { StateProps } from "app/presentation/home/components/signup/SignUpView";

export const initialSignUpViewState: StateProps = {};

export const signUpReducer = createReducer<StateProps>(
  initialSignUpViewState
)
