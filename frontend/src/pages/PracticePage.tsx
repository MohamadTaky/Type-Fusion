import Keyboard from "@/components/practice/Keyboard";
import OfflineStats from "@/components/practice/OfflineStats";
import OnlineStats from "@/components/practice/OnlineStats";
import Quote from "@/components/practice/Quote";
import AnimatedPage from "@/components/shared/AnimatedPage";
import useUserAuthQuery from "@/hooks/auth/useUserAuthQuery.hook";

export default function PracticePage() {
  const { data: userAuth } = useUserAuthQuery();
  return (
    <AnimatedPage className="mx-auto w-fit space-y-4">
      <Quote />
      {userAuth ? <OnlineStats /> : <OfflineStats />}
      <Keyboard />
    </AnimatedPage>
  );
}
