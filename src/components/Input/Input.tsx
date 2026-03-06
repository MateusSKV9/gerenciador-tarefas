import React, { forwardRef } from "react";

type InputProps = {
	text: string;
	error?: string;
} & React.ComponentProps<"input">;

export const Input = forwardRef<HTMLInputElement, InputProps>(({ text, error, ...props }: InputProps, ref) => {
	return (
		<div>
			<label htmlFor={props.id}>{text}</label>
			<input ref={ref} {...props} />
			{error && <span>{error}</span>}
		</div>
	);
});

Input.displayName = "Input";
