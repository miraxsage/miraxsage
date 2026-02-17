import { SvgIcon } from "@mui/material";

const CSSIcon: React.FC = (props) => (
    <SvgIcon>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlSpace="preserve"
            width={24}
            height={24}
            viewBox="-3 -3 30 30"
            fill="currentColor"
            {...props}
        >
            <path d="m1.5 0h21l-1.91 21.563-8.613 2.437-8.565-2.438zm17.09 4.413-13.18-.003.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.855 5.465 1.703 5.373-1.53 1.217-13.344z" />
        </svg>
    </SvgIcon>
);
export default CSSIcon;
