import { useTranslation } from "react-i18next";

type StatsProps = {
  latestSpeed: number;
  latestAccuracy: number;
  latestScore: number;
  errorCount: number;
};

export default function Stats({ latestSpeed, latestAccuracy, latestScore, errorCount }: StatsProps) {
  const { t } = useTranslation();
  return (
    <div className="mt-auto flex justify-around rounded-md border border-fill-2 bg-fill-3 p-2 text-sm capitalize">
      <div>
        {t("errors")} : <span className="text-error-2">{errorCount}</span>
      </div>
      <div>
        {t("speed")} :{" "}
        {latestSpeed ? (
          <span>
            {latestSpeed} <span className="text-xs lowercase">{t("wpm")}</span>
          </span>
        ) : (
          "N/A"
        )}
      </div>
      <div>
        {t("accuracy")} :{" "}
        {latestAccuracy ? (
          <span dir="ltr">
            {latestAccuracy} <span className="text-xs">%</span>
          </span>
        ) : (
          "N/A"
        )}
      </div>
      <div>
        {t("score")} : {latestScore || "N/A"}
      </div>
    </div>
  );
}
