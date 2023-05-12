import React, { Suspense, useEffect, useState } from "react";

interface IProps {
	children: React.ReactNode;
	fallback: React.ReactNode;
}

export default function SuspenseAfterInitialRender({ children, fallback }: IProps) {
	const [isInitialRender, setIsInitialRender] = useState(true);
	return isInitialRender ? (
		<>
			{children}
			<LifeCycle setIsInitialRender={setIsInitialRender} />
		</>
	) : (
		<Suspense fallback={fallback}>{children}</Suspense>
	);
}

function LifeCycle({
	setIsInitialRender,
}: {
	setIsInitialRender: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	useEffect(() => {
		setIsInitialRender(false);
	}, [setIsInitialRender]);
	return <></>;
}
