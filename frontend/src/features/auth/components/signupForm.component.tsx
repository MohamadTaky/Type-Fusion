import { forwardRef, Ref, useEffect, FormEvent } from "react";
import { HTMLMotionProps, motion } from "framer-motion";
import Button from "~/components/button.component";
import InputField from "~/components/inputField.component";
import useSignup from "../hooks/useSignup.hook";
import { useTranslation } from "react-i18next";
import { CircleNotch } from "@phosphor-icons/react";

function SignupForm({ ...props }: HTMLMotionProps<"form">, ref: Ref<HTMLFormElement>) {
	const { mutate, isLoading, error, reset } = useSignup();
	useEffect(() => reset, []);
	const { t } = useTranslation();
	const handleSignUp = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = new FormData(event.target as HTMLFormElement);
		const email = formData.get("signupEmail") as string;
		const password = formData.get("signupPassword") as string;
		const confirmedPassword = formData.get("signupConfirmPassword") as string;
		mutate({ email, password, confirmedPassword });
	};
	return (
		<motion.form onSubmit={handleSignUp} ref={ref} {...props}>
			<p className="text-xl font-semibold first-letter:uppercase">{t("sign up")}</p>
			<InputField disabled={isLoading} id="signupEmail" name="signupEmail" label="email" type="email" />
			<InputField
				disabled={isLoading}
				id="signupPassword"
				name="signupPassword"
				label="password"
				type="password"
			/>
			<InputField
				disabled={isLoading}
				id="signupConfirmPassword"
				name="signupConfirmPassword"
				label="confirm password"
				type="password"
			/>
			<Button disabled={isLoading}>
				<span>{t(isLoading ? "signing up" : "sign up")}</span>
				{isLoading && <CircleNotch className="mx-1 inline-block animate-spin" weight="bold" size="24" />}
			</Button>

			<p className="grid h-10 items-center rounded border-2 border-error-1 bg-error-2 p-2 text-sm transition-opacity first-letter:uppercase empty:opacity-0">
				{t(error?.message ?? "")}
			</p>
		</motion.form>
	);
}

export default forwardRef(SignupForm);
