import { connect } from "react-redux";
import { RootState } from "app/store";
import { notifyUserIsSignedOut } from "app/presentation/home/components/profile/ProfileActions"
import { ProfileView } from "app/presentation/home/components/profile/ProfileView"

const mapStateToProps = (state: RootState) => {
  return state.homeViewState.profileViewState;
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    notifyUserIsSignedOut: () => dispatch(notifyUserIsSignedOut())
  };
};

export const Profile = connect(mapStateToProps, mapDispatchToProps)(ProfileView);
