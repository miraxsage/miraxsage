import { useLanguage } from "@/store/appearanceSlice";

export default function AboutSpecsMetricsBlock() {
    const lang = useLanguage();
    return (
        <div className="px-4 py-3">
            {lang.ru
                ? `Метрики производительности временно в состоянии предварительной актуализации.`
                : `The performance metrics are currently undergoing preliminary updating.`}
        </div>
    );
}
