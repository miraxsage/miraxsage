import { getDb } from "@/db";
import LandingClient from "./LandingClient";
import type { LandingButton } from "@/widgets/landing/MainSlide";

function getLandingButtons(): LandingButton[] {
    const db = getDb();
    return db.prepare("SELECT * FROM landing_buttons ORDER BY sort_order").all() as LandingButton[];
}

export default function Landing() {
    const buttons = getLandingButtons();
    return <LandingClient buttons={buttons} />;
}
