import { motion } from "framer-motion";
import { FC, MouseEvent } from "react";

export interface IButton {
	text: string;
	color: "red" | "green" | "yellow";
	side?: -1 | 1;
	fullRotate?: boolean;
	onClick: (
		e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
	) => unknown;
}

export const Button: FC<IButton> = ({
	text,
	color,
	side,
	fullRotate,
	onClick,
}) => (
	<motion.button
		className={`flex-no-shrink p-2 ml-4 mr-2 border-2 rounded focus:outline-none hover:text-white text-${color}-500 border-${color}-500 hover:bg-${color}-400`}
		whileTap={{
			scale: 0.7,
			rotate: (fullRotate ? 360 : 10) * (side ? side : 1),
		}}
		onClick={onClick}
	>
		{text}
	</motion.button>
);
