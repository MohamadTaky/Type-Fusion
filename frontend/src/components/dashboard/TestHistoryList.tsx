import { Info } from "@phosphor-icons/react";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";
import useTestsQuery from "@/hooks/stats/useTestsQuery";
import TestHistoryItem from "./TestHistoryItem";

export default function TestHistoryList() {
  const { data } = useTestsQuery();
  const today = data.tests[format(new Date(), "yyyyMMdd")];
  const { t } = useTranslation();

  return (
    <ul className="scrollbar-rounded relative flex-1 overflow-auto px-4 scrollbar-thin scrollbar-thumb-indigo-600">
      {data.tests[format(new Date(), "yyyyMMdd")]?.quote.map((quote: string, i: number) => (
        <TestHistoryItem
          key={`history${quote}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ease: "easeInOut", delay: 0.15 + i * 0.1 }}
          quote={quote}
          speed={today.speed[i]}
          accuracy={today.accuracy[i]}
          errorCount={today.errorCount[i]}
          wrongEntries={today.wrongEntries[i]}
        />
      )) ?? (
        <div className="mx-auto mt-6 text-center text-secondary">
          <Info size="50" weight="fill" className="mx-auto" />
          <p className="first-letter:uppercase">{t("no completed tests today")}</p>
        </div>
      )}
    </ul>
  );
}
