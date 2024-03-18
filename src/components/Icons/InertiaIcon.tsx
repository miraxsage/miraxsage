import { SvgIcon } from "@mui/material";

const InertiaIcon: React.FC = (props) => (
    <SvgIcon>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlSpace="preserve"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12.5 8l4 4l-4 4h4.5l4 -4l-4 -4z" />
            <path d="M3.5 8l4 4l-4 4h4.5l4 -4l-4 -4z" />
        </svg>
    </SvgIcon>
);
export default InertiaIcon;
