import React, { ReactNode } from "react";

interface CustomTitleProps {
  children: ReactNode;
}

const CustomTitle = ({ children }: CustomTitleProps) => {
  return (
    <h1 className="text-lg ssm:text-xl mdd:text-2xl lgg:text-3xl 2xl:text-4xl font-bold text-transparent bg-clip-text bg-yellowGradient relative w-fit">
      {children}

      <svg
        className="w-auto h-5 absolute top-[50%] translate-y-[-40%] -right-6"
        viewBox="0 0 15 19"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="6.5" cy="12.5" r="6.5" fill="url(#paint0_linear_26_1905)" />
        <circle cx={12} cy={3} r={3} fill="url(#paint1_linear_26_1905)" />
        <circle cx="4.5" cy="2.5" r="1.5" fill="url(#paint2_linear_26_1905)" />
        <g filter="url(#filter0_f_26_1905)">
          <ellipse
            cx="5.00595"
            cy="10.829"
            rx="1.66978"
            ry="1.11318"
            transform="rotate(-32 5.00595 10.829)"
            fill="white"
          />
        </g>
        <defs>
          <filter
            id="filter0_f_26_1905"
            x="0.131991"
            y="6.19548"
            width="9.74792"
            height="9.26687"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity={0} result="BackgroundImageFix" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="BackgroundImageFix"
              result="shape"
            />
            <feGaussianBlur
              stdDeviation="1.66978"
              result="effect1_foregroundBlur_26_1905"
            />
          </filter>
          <linearGradient
            id="paint0_linear_26_1905"
            x1={0}
            y1={6}
            x2="15.2941"
            y2="9.82353"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#E25901" />
            <stop offset={1} stopColor="#FEB400" />
          </linearGradient>
          <linearGradient
            id="paint1_linear_26_1905"
            x1={9}
            y1={0}
            x2="16.0588"
            y2="1.76471"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#E25901" />
            <stop offset={1} stopColor="#FEB400" />
          </linearGradient>
          <linearGradient
            id="paint2_linear_26_1905"
            x1={3}
            y1={1}
            x2="6.52941"
            y2="1.88235"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#E25901" />
            <stop offset={1} stopColor="#FEB400" />
          </linearGradient>
        </defs>
      </svg>
    </h1>
  );
};

export default CustomTitle;
