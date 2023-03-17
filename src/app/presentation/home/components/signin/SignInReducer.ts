import { createReducer } from "typesafe-actions";
import { StateProps } from "app/presentation/home/components/signin/SignInView";

export const initialSignInViewState: StateProps = {};

export const signInReducer = createReducer<StateProps>(
  initialSignInViewState
)
