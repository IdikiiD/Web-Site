import { Pallete } from "app/utils/Pallete";
import styled from "styled-components";

type Props={
    fill: string;
    className?: string;
}

export function LoaderIcon({fill, className}:Props) {
    return (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <path        
          d="M12 21C14.4826 21.0004 16.7375 19.9917 18.3637 18.3639C19.9914 16.7378 21.0003 14.4834 21 12.0002C21.0003 9.51722 19.9914 7.26267 18.3637 5.63619C17.9851 5.25687 17.5714 4.91176 17.1291 4.60461L15.7672 5.4631C16.3412 5.7947 16.869 6.19809 17.3355 6.66428C18.702 8.03241 19.5453 9.91418 19.5455 12.0002C19.5453 14.0862 18.702 15.968 17.3355 17.3359C15.9679 18.7025 14.0859 19.5454 12 19.5457V21Z"
          fill={`url(#paint1_linear${fill})`}
        />
      <defs>
        <linearGradient
          id={`paint0_linear${fill}`}
          x1="12"
          y1="19.5"
          x2="12"
          y2="1.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={fill || Pallete.black} stopOpacity="0.5" />
          <stop offset="1" stopColor={fill || Pallete.black} />
        </linearGradient>
        <linearGradient
          id={`paint1_linear${fill}`}
          x1="12"
          y1="3"
          x2="12"
          y2="19.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor={fill || Pallete.black} stopOpacity="0" />
          <stop offset="1" stopColor={fill || Pallete.black} stopOpacity="0.5" />
        </linearGradient>
      </defs>
      </svg>
    );
  };


  export const StyledLoaderIcon = styled(LoaderIcon)`
    animation: rotation 0.7s infinite linear;
    z-index: 1;

    path {
        stroke: none !important;
    }

    @keyframes rotation {
        from {
        transform: rotate(0deg);
        }
        to {
        transform: rotate(359deg);
        }
    }
`