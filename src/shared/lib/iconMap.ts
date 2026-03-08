import HTMLIcon from "@/shared/icons/HTMLIcon";
import CSSIcon from "@/shared/icons/CSSIcon";
import JSIcon from "@/shared/icons/JSIcon";
import TSIcon from "@/shared/icons/TSIcon";
import JQueryIcon from "@/shared/icons/JQueryIcon";
import ReactIcon from "@/shared/icons/ReactIcon";
import ReduxIcon from "@/shared/icons/ReduxIcon";
import ReactRouterIcon from "@/shared/icons/ReactRouterIcon";
import FramerMotionIcon from "@/shared/icons/FramerMotionIcon";
import MUIIcon from "@/shared/icons/MUIIcon";
import PHPIcon from "@/shared/icons/PHPIcon";
import MySqlIcon from "@/shared/icons/MySqlIcon";
import WordpressIcon from "@/shared/icons/WordpressIcon";
import LaravelIcon from "@/shared/icons/LaravelIcon";
import YiiIcon from "@/shared/icons/YiiIcon";
import InertiaIcon from "@/shared/icons/InertiaIcon";
import DotNetFrameworkIcon from "@/shared/icons/DotNetFrameworkIcon";
import CSharpIcon from "@/shared/icons/CSharpIcon";
import WindowsIcon from "@/shared/icons/WindowsIcon";
import OneCIcon from "@/shared/icons/OneCIcon";
import BootstrapIcon from "@/shared/icons/BootstrapIcon";
import MSSQLServerIcon from "@/shared/icons/MSSQLServerIcon";
import SQLiteIcon from "@/shared/icons/SQLiteIcon";
import MusclesIcon from "@/shared/icons/MusclesIcon";
import RudderIcon from "@/shared/icons/RudderIcon";

const iconMap: Record<string, React.FC> = {
    HTMLIcon,
    CSSIcon,
    JSIcon,
    TSIcon,
    JQueryIcon,
    ReactIcon,
    ReduxIcon,
    ReactRouterIcon,
    FramerMotionIcon,
    MUIIcon,
    PHPIcon,
    MySqlIcon,
    WordpressIcon,
    LaravelIcon,
    YiiIcon,
    InertiaIcon,
    DotNetFrameworkIcon,
    CSharpIcon,
    WindowsIcon,
    OneCIcon,
    BootstrapIcon,
    MSSQLServerIcon,
    SQLiteIcon,
    MusclesIcon,
    RudderIcon,
};

export function getIconComponent(iconName: string): React.FC {
    return iconMap[iconName] ?? (() => null);
}

export default iconMap;
