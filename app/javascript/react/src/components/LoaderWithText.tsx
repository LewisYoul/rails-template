import * as React from 'react'

type LoaderWithTextProps = {
  text: string;
  width: number;
  height: number;
}

export default function LoaderWithText(props: LoaderWithTextProps) {
  const { text, width, height } = props;

  return(
    <div className="flex flex-col justify-center h-full text-center">
      <div className="flex justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="block m-auto" width={`${width}px`} height={`${height}px`} viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
          <circle cx="50" cy="50" fill="none" stroke="#8140b6" stroke-width="10" r="35" stroke-dasharray="164.93361431346415 56.97787143782138">
            <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1">
            </animateTransform>
          </circle>
        </svg>
      </div>

      <span className="mt-3 block text-gray-700">{text}</span>
    </div>
  )
}