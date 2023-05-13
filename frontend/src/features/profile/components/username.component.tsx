import { useState } from "react";
import InputField from "~/common/components/inputField.component";
import { CircleNotch, PencilSimple, Check, X } from "@phosphor-icons/react";
import useUserAuthQuery from "~/features/auth/hooks/useUserAuthQuery.hook";
import useCheckUsernameQuery from "../hooks/checkUsernameQuery.hook";
import { useTranslation } from "react-i18next";
import useEditUsernameMutation from "../hooks/useEditUsernameMutation.hook";

export default function Username() {
	const { data: userAuth } = useUserAuthQuery();
	const [editedUsername, setEditedUsername] = useState("");
	const [isEditingUsername, setIsEditingUsername] = useState(false);
	const { data, isFetching, remove: removeCheckUsername } = useCheckUsernameQuery(editedUsername);
	const { mutate: editUsername, isLoading } = useEditUsernameMutation(() => {
		setEditedUsername("");
		removeCheckUsername();
		setIsEditingUsername(false);
	});
	const { t } = useTranslation();
	return (
		<div className="flex items-center gap-4">
			{isEditingUsername ? (
				<>
					<InputField
						value={editedUsername}
						onChange={e => setEditedUsername(e.target.value)}
						id="username"
						autoComplete="off"
						autoFocus
					/>
					{isFetching ? (
						<CircleNotch className="animate-spin" weight="bold" size="24" />
					) : data ? (
						<p className={data.exists ? "text-error-2" : "text-success-1"}>
							{t(data.exists ? "username alrady exists" : "username is available")}
						</p>
					) : (
						<></>
					)}
					<button
						onClick={() => editUsername({ username: editedUsername })}
						disabled={
							!editedUsername ||
							!(editedUsername.length > 7) ||
							!(editedUsername.length < 16) ||
							isFetching ||
							(data && data.exists)
						}
						className="flex items-center gap-2 rounded-md bg-accent p-2 capitalize text-gray-100 disabled:cursor-not-allowed disabled:opacity-50 ltr:ml-auto rtl:mr-auto">
						{isLoading ? (
							<CircleNotch className="animate-spin" weight="bold" size="24" />
						) : (
							<>
								{t("confirm")} <Check weight="bold" size="24" />
							</>
						)}
					</button>
					<button
						onClick={() => {
							setIsEditingUsername(false);
							removeCheckUsername();
							setEditedUsername("");
						}}
						className="flex items-center gap-2 rounded-md bg-accent p-2 capitalize text-gray-100">
						{t("cancel")} <X weight="bold" size="24" />
					</button>
				</>
			) : (
				<>
					<p className="first-letter:uppercase">
						{t("username")} : {userAuth?.username}
					</p>
					<button
						onClick={() => {
							setIsEditingUsername(true);
							setEditedUsername(userAuth.username);
						}}
						className="flex items-center gap-2 rounded-md bg-accent p-2 capitalize text-gray-100 ltr:ml-auto rtl:mr-auto">
						{t("edit")}
						<PencilSimple weight="fill" size="24" />
					</button>
				</>
			)}
		</div>
	);
}
