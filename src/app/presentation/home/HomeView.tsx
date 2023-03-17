import React, { RefObject } from "react";
import styled from "styled-components";
import Logo from "assets/images/Logo.png";
import NeverGiveSafety from "assets/images/NeverGiveSafety.png";
import Token from "assets/images/Token.png";
import Company from "assets/images/Company.png";
import Gallery1 from "assets/images/gallery/1.png";
import Gallery2 from "assets/images/gallery/2.jpg";
import Gallery3 from "assets/images/gallery/3.jpg";
import Gallery4 from "assets/images/gallery/4.jpg";
import Gallery5 from "assets/images/gallery/5.jpg";
import { interval, tap } from "rxjs";
import { Profile } from "app/presentation/home/components/profile/Profile";
import { SignIn } from "app/presentation/home/components/signin/SignIn";
import { SignUp } from "app/presentation/home/components/signup/SignUp";
import { StyledButton, StyledLabel, StyledFormLabel, StyledTextArea, StyledMenuList, StyledMenuItem } from "app/presentation/home/HomeStyles";
import { clickProfileButton, notifyCloseProfile, clickJoinButton } from "app/presentation/home/HomeActions";
import ReCAPTCHA from 'react-google-recaptcha'
import api from "app/utils/api";
import { notifyUserIsSignedIn } from "app/presentation/home/components/signin/SignInActions";
import { StyledLoaderIcon } from "app/presentation/home/components/icons/LoaderIcon";
import { Pallete } from "app/utils/Pallete";
import { Input } from "app/presentation/home/components/input/Input";
import { notifyUserIsSignedOut } from "app/presentation/home/components/profile/ProfileActions";
import { Breakpoints } from "app/Breakpoints";
import { FormOverlay } from "app/presentation/home/components/overlay/FormOverlay";

export type StateProps = {    
  showProfileHolder:boolean  
  showProfile: boolean
  showSignIn: boolean
  showSignUp: boolean
  profileLabel: string | undefined
};

export type ActionProps = {
  clickProfileButton: typeof clickProfileButton
  notifyCloseProfile: typeof notifyCloseProfile
  notifyUserIsSignedIn: typeof notifyUserIsSignedIn
  notifyUserIsSignedOut:typeof notifyUserIsSignedOut
  clickJoinButton: typeof clickJoinButton
};

type Props = StateProps & ActionProps;

type MenuItemType =
  | "roadmap"
  | "aboutus"
  | "token"
  | "gallery"
  | "contactus"
  | "faq";

const menuItems: Record<MenuItemType, string> = {
  roadmap: "Road Map",
  token: "Token",
  aboutus: "About Us",
  gallery: "Gallery",
  contactus: "Contact Us",
  faq: "FAQ",
};

type RoadMapItem = { 
  dateLabel: string;
  descriptionText: string;
  isCompeted: boolean;
};

const roadMapItems: RoadMapItem[] = [
  {
    dateLabel: "June 2021",
    descriptionText: "The beginning of creating our coin and system",
    isCompeted: true,
  },
  {
    dateLabel: "September 2021",
    descriptionText:
      "The launch of the coin on the Stellar Blockchain Network, the launch of the website, Great results in developing security system",
    isCompeted: true,
  },
  {
    dateLabel: "February 2022",
    descriptionText: "Listing our Token on CoinMarketCap",
    isCompeted: false,
  },
  {     
    dateLabel: "April 2022",
    descriptionText:
      "Release of security algorithm and entering the global market",
    isCompeted: false,
  }
];

type Target = {
  titleLabel: string;
  descriptionText: string;
};

const targetItems: Target[] = [
  {
    titleLabel: "Our team consists of ten back-end developers and three front-end developers who decided to figure this out and create a new security system. We planned to create a new algorithm that would extract weaknesses with each attack and eliminate them independently, as well as strengthen our defense system with a tertiary disappearance system. This idea has turned out , at the moment we are at the investment stage .",
    descriptionText:
      '',
  },
  //{
    //titleLabel: "TARGET 2",
    //descriptionText:
    //  'Opening of a new office and registration of a new development department',
  //},
  //{
  //  titleLabel: "TARGET 3",
  //descriptionText:
  //   'The "SWS" coin is a tokenized project of EraTouch company',
  //},
 // {
 //   titleLabel: "TARGET 4",
  //  descriptionText:
  //    'The "SWS" coin is a tokenized project of EraTouch company',
  //},
 // {
   // titleLabel: "TARGET 5",
   // descriptionText:
    //  'The "SWS" coin is a tokenized project of EraTouch company',
  //},
];

type FaqItem = {
  questionLabel: string;
  answerText: string;
  isOpened: boolean;
};

type CoinBase = {
  titleLabel: string;
  path: string;
};

const coinBases: CoinBase[]=[
  {
    titleLabel: '5$',
    path: 'https://commerce.coinbase.com/checkout/f67d9192-4849-446e-a029-3500b50e041d'
  },
  {
    titleLabel: '10$',
    path: 'https://commerce.coinbase.com/checkout/8b48b08c-7522-4620-8664-b2f85ddabc21'
  },
  {
    titleLabel: '50$',
    path: 'https://commerce.coinbase.com/checkout/22837d8f-9ff2-469d-bc4e-0c42e71e482e'
  },
  {
    titleLabel: '100$',
    path: 'https://commerce.coinbase.com/checkout/b00e0586-8238-4bda-b670-2beec48791f3'
  },
  {
    titleLabel: '500$',
    path: 'https://commerce.coinbase.com/checkout/759f4453-11e9-43fb-8dc2-db5eb411b08e'
  },
  {
    titleLabel: '1000$',
    path: 'https://commerce.coinbase.com/checkout/b4cae3c3-a0dd-494e-8450-daac466d0e03'
  },
  {
    titleLabel: '1500$',
    path: 'https://commerce.coinbase.com/checkout/65b9c17a-c71c-47ea-ac31-ef9f38f75c7d'
  },
  {
    titleLabel: '2000$',
    path: 'https://commerce.coinbase.com/checkout/2acc212e-26ed-41ea-89cc-d4ea4bcfcedd'
  }
]

const galleryItems = [Gallery1, Gallery2, Gallery3, Gallery4, Gallery5];
type State = {
  faqItems: FaqItem[];
  galleryScrollIndex: number; 
  showGettingUserProfileLoadingIndicator: boolean;  
  showCoinBaseList:boolean,
  formData:{
    firstName: string,
    lastName: string,
    email: string,
    message: string
  },
  isSendMessageButtonDisabled:boolean,
  showFormOverlay:boolean
};

const initialFormData={
  firstName: '',
  lastName: '',
  email: '',
  message: ''
}

export class HomeView extends React.Component<Props, State> {
  state = {
    faqItems: [
      {
        questionLabel: "How is stacking calculated ?",
        answerText:
          "To get coins from stacking you need:  Buy SWS for a certain amount and keep it for a certain time. Add stellar address and transaction code to your profile. After checking our admins, you will see your percentage in the profile, and after a certain time the coins will be credited to your wallet ",
        isOpened: false,
      },
      {
        questionLabel: "What is cryptocurrency?",
        answerText:
          "Cryptocurrency is a kind of digital currency. It’s called “cryptocurrency” because it uses a very secure form of cryptography to verify transactions. Cryptocurrencies are built on blockchain technology, and the value of a cryptocurrency depends on the type of blockchain it is built on.",
        isOpened: false,
      },
      {
        questionLabel: "How to buy SWS with Stellar Blockchain?",
        answerText:
          "To buy SWS or find out the latest coin news, get free bonuses, you can go to our official telegram channel in which posts are published every day",
        isOpened: false,
      },
      {
        questionLabel:
          "What are the risks?",
        answerText:
          "Of course, it is impossible not to mention the risks. They are always there. However, our hard work and enthusiasm have kept them to a minimum. Our project is not just an idea, but a reality brought to life. Every day our employees work hard to ensure that our company brings the best product to the market. Thus, by buying our coins, you not only invest, but also get a ticket to the world of information technology.",
        isOpened: false,
      },
    ],
    galleryScrollIndex: 0,
    showGettingUserProfileLoadingIndicator: false,
    showCoinBaseList: false,
    formData:initialFormData,
    isSendMessageButtonDisabled:true,
    showFormOverlay:false
  };

  galleryRef = React.createRef<HTMLUListElement>();
  reCaptchaRef = React.createRef<ReCAPTCHA>()
  profileHolderRef = React.createRef<HTMLDivElement>();
  profileButtonRef = React.createRef<HTMLLIElement>();
  joinButtonRef = React.createRef<HTMLButtonElement>();
  coinBaseHolderRef = React.createRef<HTMLDivElement>();

  private initClickOutsideHandler = (ref: RefObject<any>, refsToExclude: RefObject<any>[], callbackFn: () => void) => {
    return (event: Event) => {
      if (
        ref.current &&
        !ref.current?.contains(event.target as Node) &&
        refsToExclude?.filter(refItem => refItem?.current?.contains(event.target as Node)).length <= 0
      ) {
        callbackFn()
      }
    }
  }

  
  private initHandleEscapePress = (callbackFn: () => void) => {
    return (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        callbackFn();
      }
    }
  }

  handleClickOutsideProfile:(event: Event)=>void=this.initClickOutsideHandler(this.profileHolderRef,[this.profileButtonRef, this.joinButtonRef],()=>{
    this.props.notifyCloseProfile()
  })

  handleEscapePressProfile:(event: KeyboardEvent)=>void=this.initHandleEscapePress(()=>{
    this.props.notifyCloseProfile()
  })

  handleClickOutsideCoinBaseHolder:(event: Event)=>void=this.initClickOutsideHandler(this.coinBaseHolderRef,[],()=>{
    this.setState({showCoinBaseList:false});
  })

  handleEscapePressCoinBaseHolder:(event: KeyboardEvent)=>void=this.initHandleEscapePress(()=>{
    this.setState({showCoinBaseList:false});
  })

  componentDidMount = () => {    
    let directMoving: boolean = true;
    this.performGetUserProfile();
    interval(3000)
      .pipe(
        tap(() => {
          if (this.state.galleryScrollIndex >= galleryItems.length - 1) {
            directMoving = false;
          } else if (this.state.galleryScrollIndex <= 0) {
            directMoving = true;
          }

          const index = directMoving
            ? this.state.galleryScrollIndex + 1
            : this.state.galleryScrollIndex - 1;
          const left =
            ((this.galleryRef.current?.scrollWidth || 0) /
              galleryItems.length) *
            index;
          this.setState({ galleryScrollIndex: index });
          this.galleryRef.current?.scrollTo({ left, behavior: "smooth" });
        })
      )
      .subscribe();
      
      document.addEventListener('mousedown', this.handleClickOutsideProfile, true)
      document.addEventListener('keydown', this.handleEscapePressProfile, true)
      document.addEventListener('mousedown', this.handleClickOutsideCoinBaseHolder, true)
      document.addEventListener('keydown', this.handleEscapePressCoinBaseHolder, true)
  };

  render() {
    return (
      <>
      {this.renderHeader()} 
      <StyledHomeView>        
        {this.renderRecaptcha()}        
        {this.renderNeverGiveSafety()}
        {this.renderRoadMap()}
        {this.renderToken()}
        {this.renderAboutAs()}
        {this.renderFAQ()}
        {this.renderGallery()}
        {this.renderGetInTouchWithUs()}
        {this.renderFooter()}
      </StyledHomeView>
      </>
    );
  }

  componentWillUnmount = () => {
    document.removeEventListener('mousedown', this.handleClickOutsideProfile, true)
    document.removeEventListener('keydown', this.handleEscapePressProfile, true)
    document.removeEventListener('mousedown', this.handleClickOutsideCoinBaseHolder, true)
    document.removeEventListener('keydown', this.handleEscapePressCoinBaseHolder, true)
  }

  private renderHeader = () => {
    return (
      <StyledHeader>
        <StyledHeaderContent>
        {this.renderLogo()}
        {this.renderMenu()}
        {this.renderActions()}
        {this.props.showProfileHolder && this.renderProfileHolder()}
        </StyledHeaderContent>
      </StyledHeader>
    );
  };

  private renderLogo = () => {
    return (
      <StyledLogoHolder>
        <img src={Logo} alt="Ear Touch Logo"/>
      </StyledLogoHolder>
    );
  };

  private renderMenu = () => {
    return (
      <StyledMenuList>
        {Object.values(menuItems).map((it, index) => (
          <StyledMenuItem key={index}>
            <StyledLabel>
              <a href={`#${Object.keys(menuItems)[index]}`}>{it} </a>
            </StyledLabel>
          </StyledMenuItem>
        ))}
      </StyledMenuList>
    );
  };

  private renderActions = (showProfileButton: boolean = true) => {
    return (
      <StyledActionsList>
        {showProfileButton && (this.state.showGettingUserProfileLoadingIndicator?
          <StyledActionItem>
            <StyledLoaderIcon fill={Pallete.black}/>          
          </StyledActionItem>:
          <StyledActionItem ref={this.profileButtonRef} onClick={this.props.clickProfileButton}>
            {this.renderProfileSvgIcon()}         
          </StyledActionItem>)
        }        
        
        <StyledActionItem>
          <a href="https://t.me/eratouch" target="_blank" rel="noreferrer">
            {this.renderTelegramSvgIcon()}
          </a>
        </StyledActionItem>
        <StyledActionItem>
          <a href="https://twitter.com/era_touch" target="_blank" rel="noreferrer">
            {this.renderTwitterSvgIcon()}
          </a>
        </StyledActionItem>
      </StyledActionsList>
    );
  };

  private renderProfileHolder=()=>{
    return <StyledProfileHolder ref={this.profileHolderRef}>
      {this.props.showProfile && <Profile WMIDLabel='' profitInPercent={0} reCaptchaRef={this.reCaptchaRef}/>}
      {this.props.showSignIn && <SignIn reCaptchaRef={this.reCaptchaRef}/>}
      {this.props.showSignUp && <SignUp reCaptchaRef={this.reCaptchaRef}/>}
    </StyledProfileHolder>
  }

  private renderNeverGiveSafety = () => {
    return (
      <StyledNeverGiveSafety>
        <StyledNeverGiveSafetyLeft>
          <StyledLabel font="Roboto Condensed" size={64} weight={700}>
            NEVER GIVE SAFETY A DAY OFF
          </StyledLabel>

          <StyledLabel size={24}>
            EraTouch company is here to keep your information protected. Safety
            is no accident. Become our partner and don't be afraid of unexpected
            incidents.
          </StyledLabel>
          {
            this.props.profileLabel
            ?
            <ProfileLabelHolder>
              <StyledLabel font="Roboto Condensed" size={36} weight={700}>Profile:</StyledLabel>
              <StyledLabel  size={32}>{this.props.profileLabel}</StyledLabel>
            </ProfileLabelHolder>
            :<StyledBuyButton ref={this.joinButtonRef} onClick={this.props.clickJoinButton}>Join</StyledBuyButton>
          }          
        </StyledNeverGiveSafetyLeft>

        <StyledNeverGiveSafetyRight src={NeverGiveSafety} />
      </StyledNeverGiveSafety>
    );
  };

  private renderRoadMap = () => {
    return (
      <StyledRoadMap>
        <StyledAnchor id="roadmap"/>
        <StyledLabel font="Roboto Condensed" size={48} weight={700}>
          ROAD MAP
        </StyledLabel>
        <StyledRoadMapList>
          {roadMapItems.map((it, index) => (
            <StyledRoadMapItem  key={index}>
              <StyledRoadMapPoint isCompleted={it.isCompeted} />
              <StyledRoadMapDateLabel size={18}>
                {it.dateLabel}
              </StyledRoadMapDateLabel>
              <StyledRoadMapDescriptionLabel size={20}>
                {it.descriptionText}
              </StyledRoadMapDescriptionLabel>
            </StyledRoadMapItem>
          ))}
        </StyledRoadMapList>
      </StyledRoadMap>
    );
  };

  private renderToken = () => {
    return (
      <StyledToken>
        <StyledAnchor id="token"/>
        <StyledLabel font="Roboto Condensed" size={48} weight={700}>
          TOKEN
        </StyledLabel>
        <StyledTokenBody>
          <StyledTokenLeft src={Token} />
          <StyledTokenRight>
            <StyledLabel font="Roboto Condensed" size={36} weight={700}>
              SWORD AND SHIELD
            </StyledLabel>
            <StyledSymbolLabel size={16}>Symbol: SWS</StyledSymbolLabel>
            <StyledLabel size={16}>Supply : 1000000000</StyledLabel>
            <StyledLabel size={16}>
              Description: Our “SWS” token works on the Stellar blockchain. We
              have done our best to create this ultimate coin. One of the
              specific functions of “SWS” is protection and complete anonymity
              that helps to keep information of our customers in secret.. Our
              protection system not only reflects the attacks of all-round
              owners, but also has the possibility to develop itself via
              analyzing new information of attack results.
            </StyledLabel>
            <StyledTokenButtons>

              <StyledCoinBaseWeapper ref={this.coinBaseHolderRef}>
                <StyledCopyCodeButton onClick={()=>this.setState({showCoinBaseList:!this.state.showCoinBaseList})}>Coinbase</StyledCopyCodeButton>
                {this.state.showCoinBaseList && <StyledCoinBaseList>
                  {coinBases.map(it=><StyledCoinBaseListItem>
                    <a
                      href={it.path}
                      target="_blank"
                      rel="noreferrer"
                    >
                    <StyledLabel size={24}>
                      {it.titleLabel}
                    </StyledLabel>
                  </a>
                  </StyledCoinBaseListItem>)}
                </StyledCoinBaseList>}
              </StyledCoinBaseWeapper>
              <StyledTokenSecondaryButtons>
                <a
                  href="https://lobstr.co/trade/SWS:GAHOVX34KDN2VEXVBTVKKBN57MDZSBCQFFSN7K6AXWVJDL6AZNM3MTZG"
                  target="_blank"
                  rel="noreferrer"
                >
                  <StyledBuyOnLobstrButton as="span">
                    Buy on Lobstr
                  </StyledBuyOnLobstrButton>
                </a>
                <a
                  href="https://scopuly.com/trade/SWS-XLM/GAHOVX34KDN2VEXVBTVKKBN57MDZSBCQFFSN7K6AXWVJDL6AZNM3MTZG/native"
                  target="_blank"
                  rel="noreferrer"
                >
                  <StyledBuyOnScopulyButton as="span">
                    Buy on Scopuly
                  </StyledBuyOnScopulyButton>
                </a>
              </StyledTokenSecondaryButtons>
            </StyledTokenButtons>
          </StyledTokenRight>
        </StyledTokenBody>
      </StyledToken>
    );
  };

  private renderAboutAs = () => {
    return (
      <StyledAboutAs>
        <StyledAnchor id="aboutus"/>
        <StyledLabel font="Roboto Condensed" size={48} weight={700}>
          ABOUT US
        </StyledLabel>
        <StyledAboutAsFirstRow>
          <StyledAboutAsToken>
            <StyledLabel font="Roboto Condensed" size={36} weight={700}>
              TOKEN
            </StyledLabel>
            <StyledLabel size={16}>
              The "SWS" coin is a tokenized project of EraTouch company. IT was
              designed to find investors to finance our project and its further
              launch. Like all frozen coins , we will conduct coin burning and
              all possible distributions. Moreover, the SWS token will be used
              for VIP functions that will give our investors
            </StyledLabel>
          </StyledAboutAsToken>
          <StyledAboutAsFutureVision>
            <StyledLabel font="Roboto Condensed" size={36} weight={700}>
              FUTURE VISION
            </StyledLabel>
            <StyledLabel size={16}>
              The EraTouch company is highly motivated to grow further in the
              industry of software technologies. We work everyday to invent new
              principles of automatisation and to make your life easier. Safety
              is our main principle, which guides us on our way to success.
              Therefore, we are looking
            </StyledLabel>
          </StyledAboutAsFutureVision>
        </StyledAboutAsFirstRow>
        <StyledAboutAsSecondRow>
          <StyledAboutAsCompanySection>
            <StyledLabel font="Roboto Condensed" size={36} weight={700}>
              COMPANY
            </StyledLabel>
            <img src={Company} width={864} alt="Era Touch Company"/>
          </StyledAboutAsCompanySection>
          <StyledAboutAsTargetsList>
            {targetItems.map((it, index) => (
              <StyledAboutAsTargetItem key={index}>
                <StyledTargetLabel
                  size={28}
                >
                  {it.titleLabel}
                </StyledTargetLabel>
                <StyledLabel size={18}>{it.descriptionText}</StyledLabel>
              </StyledAboutAsTargetItem>
            ))}
          </StyledAboutAsTargetsList>
        </StyledAboutAsSecondRow>
      </StyledAboutAs>
    );
  };

  private renderFAQ = () => {
    return (
      <StyledFAQ>
        <StyledAnchor id="faq"/>
        <StyledLabel font="Roboto Condensed" size={48} weight={700}>
          FREQUENTLY ASKED QUESTIONS
        </StyledLabel>
        <StyledFAQList>
          {this.state.faqItems.map((it, index) => (
            <StyledFAQItem
              key={index}
              showFullDetails={it.isOpened}
              onClick={() => {
                this.setState({
                  faqItems: this.state.faqItems.map((faqItem, faqItemIndex) => {
                    if (faqItemIndex === index) {
                      return {
                        ...faqItem,
                        isOpened: !faqItem.isOpened,
                      };
                    } else {
                      return faqItem;
                    }
                  }),
                });
              }}
            >
              <StyledLabel font="Roboto Condensed" size={24}>
                {it.questionLabel}
              </StyledLabel>
              {it.isOpened && (
                <StyledLabel size={16}>{it.answerText}</StyledLabel>
              )}
              <StyledArrowHolder isOpened={it.isOpened}>
                {this.renderArrowSvgIcon(it.isOpened)}
              </StyledArrowHolder>
            </StyledFAQItem>
          ))}
        </StyledFAQList>
      </StyledFAQ>
    );
  };

  private renderProfileSvgIcon = () => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <g clipPath="url(#clip0_83:53)">
          <path
            d="M12.0001 0C8.81749 0 5.76525 1.26428 3.51481 3.51472C1.26437 5.76516 9.23552e-05 8.8174 9.23552e-05 12C-0.00182887 12.4773 0.0262264 12.9542 0.0840924 13.428C0.142271 13.971 0.242573 14.5086 0.384092 15.036C0.523953 15.5636 0.70038 16.0809 0.912092 16.584C1.03485 16.8956 1.17507 17.2001 1.33209 17.496C2.0734 18.9343 3.09794 20.2078 4.34409 21.24L4.60809 21.456L4.88409 21.66L5.05209 21.78L5.32809 21.972C5.50874 22.1031 5.69707 22.2234 5.89209 22.332C6.16809 22.5 6.46809 22.656 6.76809 22.8C8.40064 23.592 10.1916 24.0036 12.0061 24.0036C13.8206 24.0036 15.6115 23.592 17.2441 22.8H17.3401C17.963 22.4935 18.5573 22.132 19.1161 21.72C20.6225 20.6297 21.8549 19.2042 22.7161 17.556C23.5907 15.8364 24.0315 13.929 24.0001 12C24.0001 8.8174 22.7358 5.76516 20.4854 3.51472C18.2349 1.26428 15.1827 0 12.0001 0V0ZM12.0001 4.8C12.9494 4.8 13.8775 5.08152 14.6668 5.60895C15.4562 6.13638 16.0714 6.88603 16.4347 7.76312C16.798 8.64021 16.8931 9.60532 16.7079 10.5364C16.5227 11.4675 16.0655 12.3228 15.3942 12.9941C14.7229 13.6654 13.8676 14.1226 12.9365 14.3078C12.0054 14.493 11.0403 14.3979 10.1632 14.0346C9.28613 13.6713 8.53647 13.0561 8.00904 12.2667C7.48161 11.4774 7.20009 10.5494 7.20009 9.6C7.20009 8.32696 7.7058 7.10606 8.60598 6.20589C9.50615 5.30571 10.7271 4.8 12.0001 4.8ZM16.2721 20.592C15.8682 19.8088 15.2564 19.152 14.504 18.6934C13.7515 18.2349 12.8873 17.9923 12.0061 17.9923C11.1249 17.9923 10.2607 18.2349 9.50823 18.6934C8.75575 19.152 8.14402 19.8088 7.74009 20.592C7.03273 20.1754 6.35511 19.7103 5.71209 19.2C6.33745 18.0833 7.24916 17.1535 8.35333 16.5063C9.45751 15.8592 10.7142 15.518 11.9941 15.518C13.2739 15.518 14.5307 15.8592 15.6348 16.5063C16.739 17.1535 17.6507 18.0833 18.2761 19.2C17.6406 19.7091 16.971 20.1742 16.2721 20.592Z"
            fill="black"
          />
          <path
            d="M12.0001 12C13.3256 12 14.4001 10.9254 14.4001 9.59995C14.4001 8.27447 13.3256 7.19995 12.0001 7.19995C10.6746 7.19995 9.6001 8.27447 9.6001 9.59995C9.6001 10.9254 10.6746 12 12.0001 12Z"
            fill="black"
          />
        </g>
        <defs>
          <clipPath id="clip0_83:53">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
    );
  };

  private renderTelegramSvgIcon = () => {
    return (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0ZM18.2371 7.59075L16.1058 17.7656C16.08 17.8887 16.0237 18.0033 15.9421 18.0989C15.8605 18.1946 15.7561 18.2681 15.6386 18.3129C15.5211 18.3577 15.3942 18.3722 15.2697 18.3551C15.1451 18.3381 15.0268 18.29 14.9257 18.2153L11.8255 15.9249L9.94734 17.6968C9.92276 17.72 9.8938 17.7381 9.86216 17.75C9.83051 17.7618 9.79682 17.7673 9.76305 17.766C9.72927 17.7647 9.69609 17.7567 9.66544 17.7425C9.63479 17.7282 9.60729 17.708 9.58453 17.683L9.54417 17.6387L9.87052 14.4805L15.7526 9.10622C15.7817 9.07969 15.7998 9.04321 15.8033 9.004C15.8068 8.96478 15.7955 8.92567 15.7716 8.89438C15.7477 8.86309 15.7129 8.8419 15.6742 8.83497C15.6354 8.82805 15.5955 8.8359 15.5622 8.85699L8.03977 13.6181L4.8 12.53C4.71386 12.5011 4.63878 12.4462 4.58506 12.3729C4.53135 12.2996 4.50163 12.2115 4.49999 12.1206C4.49835 12.0297 4.52486 11.9406 4.57588 11.8654C4.62691 11.7902 4.69996 11.7326 4.785 11.7006L17.4609 6.9255C17.5587 6.8887 17.6646 6.87885 17.7675 6.89697C17.8704 6.91509 17.9665 6.96052 18.0458 7.02851C18.1252 7.0965 18.1848 7.18455 18.2184 7.28345C18.2521 7.38236 18.2585 7.48849 18.2371 7.59075Z"
          fill="black"
        />
        <path
          d="M12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0ZM18.2371 7.59075L16.1058 17.7656C16.08 17.8887 16.0237 18.0033 15.9421 18.0989C15.8605 18.1946 15.7561 18.2681 15.6386 18.3129C15.5211 18.3577 15.3942 18.3722 15.2697 18.3551C15.1451 18.3381 15.0268 18.29 14.9257 18.2153L11.8255 15.9249L9.94734 17.6968C9.92276 17.72 9.8938 17.7381 9.86216 17.75C9.83051 17.7618 9.79682 17.7673 9.76305 17.766C9.72927 17.7647 9.69609 17.7567 9.66544 17.7425C9.63479 17.7282 9.60729 17.708 9.58453 17.683L9.54417 17.6387L9.87052 14.4805L15.7526 9.10622C15.7817 9.07969 15.7998 9.04321 15.8033 9.004C15.8068 8.96478 15.7955 8.92567 15.7716 8.89438C15.7477 8.86309 15.7129 8.8419 15.6742 8.83497C15.6354 8.82805 15.5955 8.8359 15.5622 8.85699L8.03977 13.6181L4.8 12.53C4.71386 12.5011 4.63878 12.4462 4.58506 12.3729C4.53135 12.2996 4.50163 12.2115 4.49999 12.1206C4.49835 12.0297 4.52486 11.9406 4.57588 11.8654C4.62691 11.7902 4.69996 11.7326 4.785 11.7006L17.4609 6.9255C17.5587 6.8887 17.6646 6.87885 17.7675 6.89697C17.8704 6.91509 17.9665 6.96052 18.0458 7.02851C18.1252 7.0965 18.1848 7.18455 18.2184 7.28345C18.2521 7.38236 18.2585 7.48849 18.2371 7.59075Z"
          fill="black"
          fillOpacity="0.2"
        />
      </svg>
    );
  };

  private renderTwitterSvgIcon = () => {
    return (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_55:19)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 0C9.62663 0 7.30655 0.703788 5.33316 2.02236C3.35977 3.34094 1.8217 5.21509 0.913451 7.4078C0.00519943 9.60051 -0.232441 12.0133 0.230582 14.3411C0.693605 16.6689 1.83649 18.8071 3.51472 20.4853C5.19295 22.1635 7.33115 23.3064 9.65892 23.7694C11.9867 24.2324 14.3995 23.9948 16.5922 23.0866C18.7849 22.1783 20.6591 20.6402 21.9776 18.6668C23.2962 16.6935 24 14.3734 24 12C24 8.8174 22.7357 5.76515 20.4853 3.51472C18.2348 1.26428 15.1826 0 12 0V0ZM17.14 9.25C17.14 9.37 17.14 9.49 17.14 9.61C17.14 13.3 14.47 17.54 9.59001 17.54C8.13781 17.5374 6.72114 17.0907 5.53001 16.26C5.74001 16.26 5.95001 16.26 6.16001 16.26C7.36348 16.2583 8.52805 15.8335 9.45001 15.06C8.87879 15.0337 8.33095 14.8255 7.88655 14.4656C7.44215 14.1058 7.12449 13.6133 6.98001 13.06C7.14361 13.1003 7.31152 13.1204 7.48001 13.12C7.71379 13.1226 7.94656 13.0888 8.17001 13.02C7.56733 12.8632 7.03351 12.5114 6.65181 12.0193C6.27012 11.5273 6.06203 10.9227 6.06001 10.3C6.42452 10.5164 6.83657 10.64 7.26001 10.66C6.88576 10.3835 6.58328 10.0212 6.37796 9.60359C6.17265 9.18599 6.07047 8.72524 6.08001 8.26C6.07688 7.76688 6.20086 7.28127 6.44001 6.85C7.08197 7.7121 7.90175 8.42614 8.84378 8.94374C9.78581 9.46134 10.8281 9.7704 11.9 9.85C11.8564 9.63937 11.833 9.42507 11.83 9.21C11.818 8.85223 11.8777 8.49568 12.0058 8.1614C12.1338 7.82711 12.3275 7.52186 12.5755 7.26366C12.8234 7.00546 13.1206 6.79956 13.4494 6.65809C13.7782 6.51662 14.132 6.44247 14.49 6.44C14.8577 6.44717 15.2196 6.53194 15.5522 6.68876C15.8849 6.84558 16.1806 7.07092 16.42 7.35C17.0141 7.23992 17.5833 7.02308 18.1 6.71C17.9125 7.34163 17.4998 7.88249 16.94 8.23C17.4663 8.17422 17.9798 8.03232 18.46 7.81C18.1138 8.36821 17.6661 8.85663 17.14 9.25Z"
            fill="black"
          />
        </g>
        <defs>
          <clipPath id="clip0_55:19">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
    );
  };

  private renderArrowSvgIcon = (isOpened: boolean) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="12"
        height="14"
        viewBox="0 0 12 14"
        fill="none"
      >
        <path
          d="M0.75 14L11.8333 7L0.75 0V14Z"
          fill={isOpened ? "#088ea2" : "#A5A5A5"}
        />
      </svg>
    );
  };

  private renderLocationSvgIcon = () => {
    return (
      <svg
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 24C10.376 22.5638 8.87078 20.9893 7.49998 19.293C5.44285 16.7455 3 12.9516 3 9.33636C2.99818 5.56053 5.19116 2.15569 8.55563 0.710666C11.9201 -0.73436 15.7929 0.065257 18.3668 2.73639C20.0594 4.4835 21.0075 6.86005 21 9.33636C21 12.9516 18.5571 16.7455 16.4999 19.293C15.1291 20.9893 13.6239 22.5638 12 24ZM12 5.33718C10.6219 5.33718 9.3486 6.09942 8.65959 7.33677C7.97058 8.57412 7.97058 10.0986 8.65959 11.3359C9.3486 12.5733 10.6219 13.3355 12 13.3355C14.1302 13.3355 15.8571 11.545 15.8571 9.33636C15.8571 7.12767 14.1302 5.33718 12 5.33718Z"
          fill="white"
        />
      </svg>
    );
  };

  private renderEmailSvgIcon = () => {
    return (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M20 2H4C1.8 2 0 4 0 6.44444V17.5556C0 20 1.8 22 4 22H20C22.2 22 24 20 24 17.5556V6.44444C24 4 22.2 2 20 2ZM21.6 8.44445L13.7 14.3333C13.2 14.6667 12.6 14.8889 12 14.8889C11.4 14.8889 10.8 14.6667 10.3 14.3333L2.4 8.44445C2 8.11111 1.9 7.44444 2.2 6.88889C2.5 6.44444 3.1 6.33333 3.6 6.66667L11.5 12.5556C11.8 12.7778 12.3 12.7778 12.6 12.5556L20.5 6.66667C21 6.33333 21.6 6.44444 21.9 7C22.1 7.44444 22 8.11111 21.6 8.44445Z"
          fill="white"
        />
      </svg>
    );
  };
  
  private renderGallery = () => {
    return (
      <StyledGallery>
        <StyledAnchor id="gallery"/>
        <StyledLabel font="Roboto Condensed" size={48} weight={700}>
          GALLERY
        </StyledLabel>
        <StyledGalleryList ref={this.galleryRef}>
          {galleryItems.map((src, index) => (
            <StyledGalleryItem key={index}>
              <img src={src} alt={`Gallery #${index+1}`}/>
            </StyledGalleryItem>
          ))}
        </StyledGalleryList>

        <StyledGalleryScrollIndicatorsList>
          {galleryItems.map((_, index) => (
            <StyledGalleryScrollIndicatorItem
              key={index}
              background={
                index === this.state.galleryScrollIndex ? "000000" : "C4C4C4"
              }
            />
          ))}
        </StyledGalleryScrollIndicatorsList>
      </StyledGallery>
    );
  };

  private renderGetInTouchWithUs = () => {
    return (
      <StyledGetInTouchWithUs>
        <StyledAnchor id="contactus"/>
        <StyledLabel font="Roboto Condensed" size={48} weight={700}>
          GET IN TOUCH WITH US
        </StyledLabel>
        <StyledFeelFreeLabel size={16}>
          Feel free to contact us any time. We will get back to you soon as we
          can!
        </StyledFeelFreeLabel>
        <StyledSendUsMessage>
          <StyledSendUsMessageForm>
            <StyledLabel font="Roboto Condensed" size={24} weight={700}>
              SEND US A MESSAGE
            </StyledLabel>

            <Input label="First Name" placeholder="Type First Name" value={this.state.formData.firstName} onChange={({target:{value:firstName}})=>{
                this.setState({formData:{...this.state.formData, firstName},isSendMessageButtonDisabled:this.isSendMessageButtonDisabled(firstName)})
              }} maxLenght={128}/>
            
            <Input label="Last Name" placeholder="Type Last Name" value={this.state.formData.lastName} onChange={({target:{value:lastName}})=>{
                this.setState({formData:{...this.state.formData, lastName},isSendMessageButtonDisabled:this.isSendMessageButtonDisabled(null, lastName)})
              }} maxLenght={128}/>
            
            <Input label="Email" placeholder="Type Email" value={this.state.formData.email} onChange={({target:{value:email}})=>{
                this.setState({formData:{...this.state.formData, email},isSendMessageButtonDisabled:this.isSendMessageButtonDisabled(null, null, email)})
              }} maxLenght={128}/>

            <StyledFormLabel>Message</StyledFormLabel>
            <StyledTextArea value={this.state.formData.message} onChange={({target:{value:message}})=>{
                this.setState({formData:{...this.state.formData, message},isSendMessageButtonDisabled:this.isSendMessageButtonDisabled(null, null, null, message)})
              }} maxLength={1024}/>
            <StyledSendButton onClick={event=>{
                  this.setState({showFormOverlay:true})
                  this.reCaptchaRef.current?.executeAsync().then(captchaResponse => {
                    api.addMessage({...this.state.formData, captchaResponse}).then(_=>{
                      this.setState({formData: initialFormData,showFormOverlay:false, isSendMessageButtonDisabled:true})
                      this.reCaptchaRef.current?.reset()
                    }).catch(()=>{
                      this.setState({showFormOverlay:false})
                      this.reCaptchaRef.current?.reset()
                      })  
                  }).catch(()=>{
                    this.setState({showFormOverlay:false})})
                  event.preventDefault()
                }} disabled={this.state.isSendMessageButtonDisabled}> Send</StyledSendButton>
          </StyledSendUsMessageForm>
          <StyledContactUs>
            <StyledLabel font="Roboto Condensed" size={24} weight={700}>
              CONTACT US
            </StyledLabel>
            <StyledContactUsItem>
              {this.renderLocationSvgIcon()}
              <StyledLabel>2223 112th Ave NE, Bellevue, WA 98004</StyledLabel>
            </StyledContactUsItem>
            <StyledContactUsItem>
              {this.renderEmailSvgIcon()}
              <StyledLabel>eratouchsupport@gmail.com</StyledLabel>
            </StyledContactUsItem>
          </StyledContactUs>
          {this.state.showFormOverlay&&<FormOverlay/>}
        </StyledSendUsMessage>       
      </StyledGetInTouchWithUs>
    );
  };

  private renderFooter = () => {
    return (
      <StyledFooter>
        {this.renderLogo()}
        <StaledCopyrightLabelsHolder>
          <StyledLabel size={16}>© 2021 </StyledLabel>
          <StyledLabel size={16} color="#088ea2">
            EraTouch.
          </StyledLabel>
          <StyledLabel size={16}> All rights reserved.</StyledLabel>
        </StaledCopyrightLabelsHolder>
        {this.renderActions(false)}
      </StyledFooter>
    );
  };

  private renderRecaptcha = () => {
    return <ReCAPTCHA ref={this.reCaptchaRef} sitekey={"6LfFyuccAAAAAJchqjYe94RBfyREvK_7H9shdeyE"} size="invisible" />
  }  

  private performGetUserProfile=()=>{
    this.setState({showGettingUserProfileLoadingIndicator:true});
    api.getLoggedUser().then(userData=>{    
      if(Boolean(userData.WMID)){
        this.props.notifyUserIsSignedIn(userData);
      }else{
        this.props.notifyUserIsSignedOut();
      }      
    }).catch(() => {            
      this.props.notifyUserIsSignedOut();
    }).finally(() => {
      this.setState({showGettingUserProfileLoadingIndicator: false});
    })
  }

  private isSendMessageButtonDisabled=(firstName:string|null, lastName:string|null=null,email:string|null=null,message:string|null=null)=>{
    return !(Boolean((firstName===null?this.state.formData.firstName:firstName)) && Boolean((lastName===null?this.state.formData.lastName:lastName)) && Boolean((email===null?this.state.formData.email:email)) && Boolean((message===null?this.state.formData.message:message)))
  }
  
}

const StyledHomeView = styled.div`
  width:100% ;
  max-width: 1472px;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

const StyledHeader = styled.div`
  width: 100%;
  position: sticky;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${Pallete.background};
  z-index: 1;
`;

const StyledHeaderContent = styled.div`
  max-width: 1472px;
  width: 1472px;
  height:120px;  
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledLogoHolder = styled.div``;

const StyledActionsList = styled.ul`
  display: flex;
  justify-conten: space-between;
  align-items: stretch;

  > * + * {
    margin-left: 38px;
  }
`;

const StyledActionItem = styled.li`
  list-style-type: none;
  cursor: pointer;

  :hover {
    svg > path,
    svg > g > path {
      fill: ${Pallete.main};
    }
  }
`;

const StyledProfileHolder=styled.div`
  min-width: 480px;
  width: 480px; 
  top: 70px;
  right: 0px;
  position: absolute;
  border-radius: 8px;
  background: #ffffff;
  // -webkit-box-shadow: 5px 14px 37px 0px #4EA4CB; 
  // box-shadow: 5px 15px 37px 0px #4EA4CB;
  
  background: #f4f4f4;
  filter: drop-shadow(0px 0px 40px rgba(135, 135, 135, 0.25));
`

const StyledNeverGiveSafety = styled.div`
  margin-top: 240px;
  display: flex;
  flex-direction: column-reverse; 
  align-items: center;

  > * + *{
    margin-top:24px;
  }

  @media (min-width: ${Breakpoints.desktop}) {
    flex-direction: row;
    justify-conten: space-between;
    justify-conten: space-between;
  }
`;

const ProfileLabelHolder=styled.div`
  display:flex;
  align-items: center;
    
  > * + *{
    margin-left:8px;
    color:${Pallete.main};
  }
`

const StyledNeverGiveSafetyLeft = styled.div`
  max-width: 670px;
  margin-top: 48px;
  display: flex;
  flex-direction: column;

  > * + * {
    margin-top: 30px;
  }

  @media (min-width: ${Breakpoints.desktop}) {
    margin-top: unset;
  }
`;

const StyledNeverGiveSafetyRight = styled.img`

  @media (min-width: ${Breakpoints.desktop}) {
    margin-top: -73px;
    margin-right: -80px;
  } 
`;



const StyledBuyButton = styled(StyledButton)`
  margin-top: 60px;
  max-width: 200px;
  width: 200px;
  align-self: center;
`;

const StyledRoadMap = styled.div`
  margin-top: 260px;
  position:relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledRoadMapList = styled.ul`
  max-width: 670px;
  margin-top: 80px;
  padding-left: 0px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: stretch;

  > * + * {
    margin-top: 100px;
  }

  ::before {
    width: 2px;
    height: calc(100% + 50px);
    top: -25px;
    left: 12px;
    position: absolute;
    content: "";
    background: #000000;
  }
`;

const StyledRoadMapItem = styled.li`
  display: flex;
  list-style-type: none;

  > * + * {
    margin-left: 100px;
  }
`;

const StyledRoadMapPoint = styled.div<{ isCompleted: boolean }>`
  min-width: 26px;
  min-height: 26px;
  width: 26px;
  height: 26px;
  position: relative;
  border-radius: 13px;
  background: ${(props) =>
    props.isCompleted ? "rgba(8, 142, 162, 0.5)" : "rgba(66, 66, 66, 0.5)"};

  ::after {
    width: 14px;
    height: 14px;
    max-width: 14px;
    max-height: 14px;
    top: calc(50% - 7px);
    left: calc(50% - 7px);
    position: absolute;
    content: "";
    background: #${(props) => (props.isCompleted ? "088ea2" : "444444")};
    border-radius: 7px;
  }
`;

const StyledRoadMapDateLabel = styled(StyledLabel)`
  position: relative;
  min-width: 150px;
  width: 150px;

  ::before {
    width: 58px;
    height: 1px;
    top: 10px;
    left: -80px;
    position: absolute;
    content: "";
    background: #000000;
  }
`;

const StyledRoadMapDescriptionLabel = styled(StyledLabel)``;

const StyledToken = styled.div`
  max-widht: 1261px;
  margin-top: 130px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;   
`;

const StyledTokenBody = styled.div`
  margin-top: 80px;
  display: flex;
  flex-direction:column;
  align-items: center;
  
  
  > * + * {
    margin-top: 48px;
  }
  
  @media (min-width: ${Breakpoints.desktop}) {
    flex-direction:row;

    > * + * {
      margin-top: unset;
      margin-left: 178px;
    }
  }
`;

const StyledTokenLeft = styled.img`
  width: 413px;
`;

const StyledTokenRight = styled.div`
  max-width: 670px;
  display: flex;
  flex-direction: column;

  > * + * {
    margin-top: 8px;
  }
`;

const StyledSymbolLabel = styled(StyledLabel)`
  margin-top: 25px;
`;

const StyledCoinBaseWeapper=styled.div`
  position:relative;
  display: flex;  
`

const StyledCoinBaseList=styled.ul`
  position: absolute;
  left: -1px;
  right: -1px;
  top: calc(100% - 14px);
  padding:4px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  background: #f4f4f4;
  filter: drop-shadow(0px 0px 40px rgba(135, 135, 135, 0.25));
  z-index: 1;
`

const StyledCoinBaseListItem=styled.li`
  padding:8px 8px;
  display: flex;
  list-style-type: none;  
  cursor: pointer;
  border-radius: 8px;

  a {
    width: 100%;
  }
  
  :hover{
    ${StyledLabel}{
      color: #FFFFFF;
    }    
    background: ${Pallete.main};
  }
`

const StyledCopyCodeButton = styled(StyledButton)`
  width:100%;  
  background: ${Pallete.main};
  color: #ffffff;
  border: none;
`;

const StyledBuyOnLobstrButton = styled(StyledButton)`
  flex-grow: 1;
`;

const StyledBuyOnScopulyButton = styled(StyledButton)`
  flex-grow: 1;
`;

const StyledTokenButtons = styled.div`
  margin-top: 38px;
  width: 445px;
  max-width: 445px;
  display: flex;
  flex-direction: column;
  align-self: center;

  > * + * {
    margin-top: 18px;
  }
`;

const StyledTokenSecondaryButtons = styled.div`
  display: flex;
  justify-content: stretch;

  > * + * {
    margin-left: 45px;
  }

  > a {
    width: 100%;
  }
`;

const StyledAboutAs = styled.div`
  margin-top: 130px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledAboutAsFirstRow = styled.div`
  max-width: 670px;
  margin-top: 80px;
  display: flex;
  flex-direction:column;

  > * + *{
    margin-top: 48px;
  }

  @media (min-width: ${Breakpoints.desktop}) {
    max-width: unset;
    flex-direction:row;

    > * + *{
      margin-top: unset;
    }
  }
`;

const StyledAboutAsToken = styled.div`
  padding-left: 20px;
  position: relative;
  display: flex;
  flex-direction: column;

  > * + * {
    margin-top: 30px;
  }

  ::before {
    width: 5px;
    height: 100%;
    left: 0;
    position: absolute;
    content: "";
    background: ${Pallete.main};
  }
`;

const StyledAboutAsFutureVision = styled(StyledAboutAsToken)`

  @media (min-width: ${Breakpoints.desktop}) {
    margin-left: 30px;
  }  
`;

const StyledAboutAsSecondRow = styled.div`
  margin-top: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;

  > * + *{
    margin-top: 48px;
  }

  @media (min-width: ${Breakpoints.desktop}) {
    flex-direction:row;

    > * + *{
      margin-top: unset;
    }
  }
`;

const StyledAboutAsCompanySection = styled.div`
  display: flex;
  flex-direction: column;

  > * + * {
    margin-top: 30px;
  }

  @media (min-width: ${Breakpoints.desktop}) {
    display: block;

    > * + * {
      margin-top: 30px;
    }
  } 
`;

const StyledAboutAsTargetsList = styled.ul`
  margin-top: 70px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  @media (min-width: ${Breakpoints.desktop}) {
    margin: 70px 0 0 48px;
  }
`;

const StyledAboutAsTargetItem = styled.li`
  display: flex;
  flex-direction: column;

  > * + * {
    margin-top: 20px;
  }
`;

const StyledTargetLabel = styled(StyledLabel)`
  position: relative;

  // ::before {
  //   width: 40px;
  //   height: 3px;
  //   top: 10px;
  //   left: -96px;
  //   position: absolute;
  //   content: "";
  //   background: ${Pallete.main};
  // }
`;

const StyledFAQ = styled.div`
  margin-top: 130px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledFAQList = styled.ul`
  max-width: 1075px;
  width: -webkit-fill-available;
  margin-top: 30px;  
  padding: 0 20px 0 20px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;

  > * + * {
    margin-top: 30px;
  }

  @media (min-width: ${Breakpoints.desktop}) {
    padding: 0;
  }
`;

const StyledFAQItem = styled.li<{ showFullDetails: boolean }>`
  width: -webkit-fill-available;
  margin-top: 30px;
  padding: 26px 35px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  cursor: pointer;
  background: #f4f4f4;

  > * + * {
    margin-top: 25px;
  }

  ::before {
    width: 5px;
    height: 100%;
    left: 0;
    position: absolute;
    content: "";
    background: #${(props) => (props.showFullDetails ? "088ea2" : "D7D7D7")};
  }
`;

const StyledArrowHolder = styled.div<{ isOpened: boolean }>`
  position: absolute;
  top: 10px;
  right: 24px;

  ${(props) => (props.isOpened ? `transform: rotate(90deg);` : ``)}
`;

const StyledGallery = styled.div`
  width: calc(100% - 20px);
  margin-top: 130px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledGalleryList = styled.ul`
  margin-top: 80px;
  width: 100%;
  display: flex;

  > * + * {
    margin-left: 100px;
  }

  overflow: hidden;
`;

const StyledGalleryItem = styled.li`
  max-width: 1280px;
  max-height: 720px;
  height: 720px;
  display: flex;
  list-style-type: none;

  img {
    object-fit: cover;
  }
`;

const StyledGalleryScrollIndicatorsList = styled.ul`
  margin-top: 42px;
  width: 80%;
  display: flex;
`;

const StyledGalleryScrollIndicatorItem = styled.li<{ background: string }>`
  width: 100%;
  height: 1px;
  list-style-type: none;
  background: #${(props) => props.background};
`;

const StyledGetInTouchWithUs = styled.div`
  margin-top: 130px;
  position: relative;
  padding: 0 20px 0 20px;  
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (min-width: ${Breakpoints.desktop}) {
    padding: 0;
  }
`;

const StyledFeelFreeLabel = styled(StyledLabel)`
  margin-top: 20px;
`;

const StyledSendUsMessage = styled.div`
  width: -webkit-fill-available;
  max-width: 1075px;
  margin-top: 80px;
  position: relative;
  display: flex;
  justify-content: space-between;
  background: #f4f4f4;
  filter: drop-shadow(0px 0px 40px rgba(135, 135, 135, 0.25));
`;

const StyledSendUsMessageForm = styled.form`
  width: 100%;
  padding: 45px 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;



const StyledSendButton = styled(StyledButton)`
  margin-top: 45px;
  max-width: 200px;
  width: 200px;
  align-self: center;
`;

const StyledContactUs = styled.div`  
  width: 339px;
  padding: 45px 50px;
  background: ${Pallete.main};
  color: #ffffff;

  > * + * {
    margin-top: 25px;
  }
`;

const StyledContactUsItem = styled.div`
  display: flex;
  align-items: center;
  > * + * {
    margin-left: 25px;
  }
`;

const StyledFooter = styled.div`
  width: 100%;
  margin: 150px 0 0 0;
  padding-top: 8px;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;

  ::before {
    width: 100%;
    height: 1px;
    top: 0;
    position: absolute;
    content: "";
    background: #a5a5a5;
  }
`;

const StaledCopyrightLabelsHolder = styled.span``;

const StyledAnchor = styled.div`
  top:-120px;
  position:absolute;
  background:red;
`
