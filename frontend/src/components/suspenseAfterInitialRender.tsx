import React, { Suspense, useEffect, useState } from "react";

interface IProps {
	children: React.ReactNode;
	fallback: React.ReactNode;
}

export default function SuspenseAfterInitialRender({ children, fallback }: IProps) {
	const [isInitialRender, setIsInitialRender] = useState(true);
	if (isInitialRender) return <>{children}</>;

	return (
		<Suspense fallback={fallback}>
			<LifeCycle setIsInitialRender={setIsInitialRender} />
		</Suspense>
	);
}

function LifeCycle({
	setIsInitialRender,
}: {
	setIsInitialRender: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	useEffect(() => {
		setIsInitialRender(false);
	}, []);
	return <></>;
}
