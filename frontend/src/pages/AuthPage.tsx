import { useIsMutating } from "@tanstack/react-query";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import useMeasure from "react-use-measure";
import SigninForm from "@/components/auth/SignInForm";
import SignupForm from "@/components/auth/SignUpForm";
import AnimatedPage from "@/components/shared/AnimatedPage";
import useUserAuthQuery from "@/hooks/auth/useUserAuthQuery.hook";
import useToggle from "@/hooks/useToggle";

export default function AuthPage() {
  const { data: userAuth } = useUserAuthQuery();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [signingUp, toggleSignup] = useToggle(false);
  const [isInitital, setIsInitial] = useState(true);
  const [ref, { height: formHeight }] = useMeasure();
  useEffect(() => {
    setIsInitial(false);
    return () => setIsInitial(true);
  }, []);
  useEffect(() => {
    if (userAuth) navigate("/");
  }, [userAuth]);
  const signsup = useIsMutating({ mutationKey: ["signup"] });
  const signsin = useIsMutating({ mutationKey: ["signin"] });

  return (
    <AnimatedPage className="grid place-items-center">
      <div className="overflow-hidden rounded-md border border-gray-300 bg-gray-200 p-4 dark:border-hatai-600 dark:bg-hatai-800">
        <h2 className="text-center text-2xl font-bold">Type Fusion</h2>
        <MotionConfig transition={{ duration: 0.4 }}>
          <motion.div animate={{ height: formHeight }} className="my-2">
            <AnimatePresence mode="wait">
              {signingUp ? (
                <SignupForm
                  ref={ref}
                  key="signup"
                  initial={{ translateX: "100%", opacity: 0 }}
                  animate={{ translateX: "0", opacity: 1 }}
                  exit={{ translateX: "100%", opacity: 0 }}
                  className="flex flex-col gap-4"
                />
              ) : (
                <SigninForm
                  ref={ref}
                  key="signin"
                  initial={!isInitital ? { translateX: "-100%", opacity: 0 } : {}}
                  animate={{ translateX: "0", opacity: 1 }}
                  exit={{ translateX: "-100%", opacity: 0 }}
                  className="flex flex-col gap-4"
                />
              )}
            </AnimatePresence>
          </motion.div>
          <AnimatePresence mode="wait">
            <motion.p
              key={+signingUp}
              initial={{ opacity: 0 }}
              animate={{ opacity: signsin + signsup > 0 ? 0 : 1 }}
              exit={{ opacity: 0 }}
              className={`text-sm first-letter:uppercase ${
                signsin + signsup > 0 ? "pointer-events-none select-none" : ""
              }`}
            >
              {t(signingUp ? "already have an account ?" : "don't have an account ?")}
              <button
                disabled={signsin + signsup > 0}
                tabIndex={signsin + signsup ? -1 : 0}
                onClick={toggleSignup}
                className="mx-1 rounded border border-transparent p-0.5 text-indigo-500 outline-none focus:border-indigo-600 dark:focus:border-indigo-600"
                type="button"
              >
                {t(signingUp ? "sign in" : "sign up")}
              </button>
            </motion.p>
          </AnimatePresence>
        </MotionConfig>
      </div>
    </AnimatedPage>
  );
}
