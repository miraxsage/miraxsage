import { Box, SxProps } from "@mui/material";
import { ReactNode, forwardRef } from "react";

export type OverlapedChildrenContainerProps = {
    children: ReactNode;
    sx?: SxProps;
};
const OverlapedChildrenContainer = forwardRef(({ children, sx }: OverlapedChildrenContainerProps, ref) => {
    return (
        <Box
            ref={ref}
            sx={{
                display: "grid",
                gridTemplateColumns: "1fr",
                alignItems: "center",
                justifyItems: "center",
                width: "100%",
                height: "100%",
                "& > *": {
                    gridArea: "1/1/1/1",
                },
                ...sx,
            }}
        >
            {children}
        </Box>
    );
});

export default OverlapedChildrenContainer;
