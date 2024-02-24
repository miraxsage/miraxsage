import { ReactNode } from "react";

export type ReactContentProps = {
    children: ReactNode;
};

export type ReactContentFC<P = object> = React.FunctionComponent<
    P & ReactContentProps
>;
