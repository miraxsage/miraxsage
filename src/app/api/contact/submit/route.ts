import { NextRequest } from "next/server";
import { jsonResponse, errorResponse } from "@/shared/api/response";

const GOOGLE_FORMS_WEBHOOK =
    "https://script.google.com/macros/s/AKfycbzYYk-OXS3GTDuVA5R_1UA2Q1hqovcL5gDmZzwQw5mvIvIcEgQJ4Q5WiLtqSPfr2rmxCw/exec";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, email, subject, message } = body;

        if (!name || !email || !subject || !message) {
            return errorResponse(
                "name, email, subject, and message are required",
            );
        }

        const response = await fetch(GOOGLE_FORMS_WEBHOOK, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, subject, message }),
        });

        if (!response.ok) {
            const text = await response.text();
            console.error("Google Forms webhook error:", text);
            return errorResponse("Failed to submit contact form", 502);
        }

        let data;
        const contentType = response.headers.get("content-type");
        if (contentType?.includes("application/json")) {
            data = await response.json();
        } else {
            data = { message: await response.text() };
        }

        return jsonResponse(data);
    } catch (error) {
        console.error("Contact submit error:", error);
        return errorResponse("Internal server error", 500);
    }
}
