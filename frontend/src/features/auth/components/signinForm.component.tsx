import { FormEvent, forwardRef, Ref, useEffect } from "react";
import useSingin from "../hooks/useSignin.hook";
import Button from "~/common/components/button.component";
import InputField from "~/common/components/inputField.component";
import { useTranslation } from "react-i18next";
import { HTMLMotionProps, motion } from "framer-motion";
import { CircleNotch } from "@phosphor-icons/react";

function SigninForm({ ...props }: HTMLMotionProps<"form">, ref: Ref<HTMLFormElement>) {
	const { mutate, isLoading, error, reset } = useSingin();
	const { t } = useTranslation();
	useEffect(() => reset, []);
	const handleSignIn = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const email = new FormData(event.target as HTMLFormElement).get("signinEmail") as string;
		const password = new FormData(event.target as HTMLFormElement).get("signinPassword") as string;
		mutate({ email, password });
	};

	return (
		<motion.form onSubmit={handleSignIn} ref={ref} {...props}>
			<p className="text-xl font-semibold first-letter:uppercase">{t("sign in")}</p>
			<InputField disabled={isLoading} id="signinEmail" name="signinEmail" label="email" type="email" />
			<InputField
				disabled={isLoading}
				id="signinPassword"
				name="signinPassword"
				label="password"
				type="password"
			/>
			<Button disabled={isLoading}>
				<span>{t(isLoading ? "signing in" : "sign in")}</span>
				{isLoading && <CircleNotch className="mx-1 inline-block animate-spin" weight="bold" size="24" />}
			</Button>
			<p className="grid h-10 items-center rounded border-2 border-error-2 bg-error-1 p-2 text-sm transition-opacity first-letter:uppercase empty:opacity-0">
				{t(error?.message ?? "")}
			</p>
		</motion.form>
	);
}

export default forwardRef(SigninForm);
