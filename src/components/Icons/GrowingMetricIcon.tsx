import { SvgIcon } from "@mui/material";

const GrowingMetricIcon: React.FC = (props) => (
    <SvgIcon>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlSpace="preserve"
            width={24}
            height={24}
            viewBox="30 30 512 512"
            fill="currentColor"
            {...props}
        >
            <g transform="translate(0,512) scale(0.09,-0.09)">
                <path
                    d="M3795 4630 l179 -179 -19 -21 c-44 -49 -1233 -1182 -1239 -1181 -3 0
-169 170 -368 377 l-362 375 -127 -128 c-71 -70 -517 -524 -993 -1008 l-865
-880 117 -118 c64 -64 119 -116 123 -115 3 2 396 400 874 886 l869 883 26 -28
c266 -278 596 -621 640 -667 l58 -59 753 722 753 721 173 -172 173 -173 0 473
0 472 -472 0 -473 0 180 -180z"
                />
                <path
                    d="M3990 1885 l0 -1575 565 0 565 0 0 1575 0 1575 -565 0 -565 0 0
-1575z"
                />
                <path
                    d="M2410 1360 l0 -1050 565 0 565 0 0 1050 0 1050 -565 0 -565 0 0
-1050z"
                />
                <path d="M832 1113 l3 -798 568 -3 567 -2 0 800 0 800 -570 0 -570 0 2 -797z" />
            </g>
        </svg>
    </SvgIcon>
);
export default GrowingMetricIcon;
