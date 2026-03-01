"use client";

import { useState, useEffect, useCallback, useRef } from "react";

interface UseAdminDataOptions<T> {
    url: string;
    transform?: (data: unknown) => T;
}

export default function useAdminData<T>({ url, transform }: UseAdminDataOptions<T>) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const timeoutRef = useRef<ReturnType<typeof setTimeout>>();
    const debounceRef = useRef<ReturnType<typeof setTimeout>>();

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError("");
        try {
            const res = await fetch(url);
            if (!res.ok) throw new Error("Failed to fetch data");
            const json = await res.json();
            setData(transform ? transform(json) : json);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to load data");
        } finally {
            setLoading(false);
        }
    }, [url, transform]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    useEffect(() => {
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            if (debounceRef.current) clearTimeout(debounceRef.current);
        };
    }, []);

    const save = useCallback(
        async (body: unknown, options?: { method?: string; successMessage?: string }) => {
            setSaving(true);
            setError("");
            setSuccess("");
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            try {
                const res = await fetch(url, {
                    method: options?.method || "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body),
                });
                if (!res.ok) {
                    const errData = await res.json().catch(() => null);
                    throw new Error(errData?.error || "Failed to save");
                }
                const result = await res.json();
                setSuccess(options?.successMessage || "Saved successfully");
                timeoutRef.current = setTimeout(() => setSuccess(""), 3000);
                return result;
            } catch (err) {
                const msg = err instanceof Error ? err.message : "Save failed";
                setError(msg);
                throw err;
            } finally {
                setSaving(false);
            }
        },
        [url],
    );

    const scheduleAutoSave = useCallback(
        (body: unknown, delay = 800) => {
            if (debounceRef.current) clearTimeout(debounceRef.current);
            debounceRef.current = setTimeout(() => {
                save(body).catch(() => {});
            }, delay);
        },
        [save],
    );

    const clearMessages = useCallback(() => {
        setError("");
        setSuccess("");
    }, []);

    return { data, setData, loading, saving, error, success, save, scheduleAutoSave, refetch: fetchData, clearMessages };
}
