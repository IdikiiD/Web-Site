import { connect } from "react-redux";
import { RootState } from "app/store";
import { clickProfileButton, notifyCloseProfile, clickJoinButton } from "app/presentation/home/HomeActions";
import { HomeView } from "app/presentation/home/HomeView";
import { notifyUserIsSignedIn } from "app/presentation/home/components/signin/SignInActions";
import { notifyUserIsSignedOut } from "app/presentation/home/components/profile/ProfileActions";

const mapStateToProps = (state: RootState) => {
  return state.homeViewState.commonViewState;
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    clickProfileButton: () => dispatch(clickProfileButton()),
    notifyCloseProfile: () => dispatch(notifyCloseProfile()),
    notifyUserIsSignedIn: (props:{WMID:string, profitInPercent: number}) => dispatch(notifyUserIsSignedIn(props)),
    notifyUserIsSignedOut: () => dispatch(notifyUserIsSignedOut()),
    clickJoinButton: () => dispatch(clickJoinButton())
  };
};

export const Home = connect(mapStateToProps, mapDispatchToProps)(HomeView);
