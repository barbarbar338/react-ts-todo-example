import { motion, Variants } from "framer-motion";
import { FC, MouseEvent } from "react";
import { Button } from "./Button";

const item: Variants = {
	hidden: {
		y: 20,
		opacity: 0,
	},
	visible: {
		y: 0,
		opacity: 1,
	},
};

export type TButtonFN = (
	e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
) => unknown;

export interface IItem {
	text: string;
	done: boolean;
	onDone: TButtonFN;
	onUndone: TButtonFN;
	onDelete: TButtonFN;
}

export const Item: FC<IItem> = ({ text, done, onDone, onUndone, onDelete }) => (
	<motion.div className="flex mb-4 items-center" variants={item}>
		<p
			className={`w-full ${
				done ? "line-through text-green-500" : "text-black"
			}`}
		>
			{text}
		</p>
		<Button
			color={done ? "yellow" : "green"}
			text={done ? "Undone" : "Done"}
			side={-1}
			onClick={done ? onUndone : onDone}
		/>
		<Button color="red" text="Delete" side={1} onClick={onDelete} />
	</motion.div>
);
