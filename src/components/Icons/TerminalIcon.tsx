import { SvgIcon } from "@mui/material";

const TerminalIcon: React.FC = (props) => (
    <SvgIcon>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlSpace="preserve"
            width={24}
            height={24}
            viewBox="0 0 740 512"
            fill="currentColor"
            {...props}
        >
            <path d="m257.981 272.971-194.343 194.343c-9.373 9.373-24.569 9.373-33.941 0l-22.668-22.667c-9.357-9.357-9.375-24.522-.04-33.901l154.022-154.746-154.021-154.745c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0l194.343 194.343c9.373 9.372 9.373 24.568 0 33.941zm382.019 183.029v-32c0-13.255-10.745-24-24-24h-304c-13.255 0-24 10.745-24 24v32c0 13.255 10.745 24 24 24h304c13.255 0 24-10.745 24-24z" />
        </svg>
    </SvgIcon>
);
export default TerminalIcon;
