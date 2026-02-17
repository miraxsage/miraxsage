import { SvgIcon } from "@mui/material";

const MUIIcon: React.FC = (props) => (
    <SvgIcon>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlSpace="preserve"
            width={24}
            height={24}
            viewBox="-3 -3 31 31"
            fill="currentColor"
            {...props}
        >
            <path d="m0 2.475v10.39l3 1.733v-6.928l6 3.465 6-3.465v3.465l-6 3.463v3.464l6 3.463 9-5.195v-6.928l-3 1.733v3.463l-6 3.464-3-1.732 6-3.465v-10.39l-9 5.195zm24 0-3 1.73v3.465l3-1.732v-3.464z" />
        </svg>
    </SvgIcon>
);
export default MUIIcon;
