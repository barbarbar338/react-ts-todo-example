import { useState } from "react";
import { motion, Variants } from "framer-motion";
import { Button } from "./components/Button";
import { Item } from "./components/Item";
import { generate } from "randomstring";

const container: Variants = {
	hidden: {
		opacity: 1,
		scale: 0,
	},
	visible: {
		opacity: 1,
		scale: 1,
		transition: {
			delayChildren: 0.3,
			staggerChildren: 0.2,
		},
	},
};

const item: Variants = {
	hidden: {
		x: 20,
		opacity: 0,
	},
	visible: {
		x: 0,
		opacity: 1,
	},
};

export const App = () => {
	const [todo, setTodo] = useState("");
	const [todos, setTodos] = useState([
		{
			text: "Lorem ipsum dolor sit amet.",
			done: true,
			id: generate(15),
		},
		{
			text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
			done: false,
			id: generate(15),
		},
	]);

	const handleAdd = () => {
		if (!todo) return;
		todos.push({
			done: false,
			id: generate(),
			text: todo,
		});
		setTodos(todos);
		setTodo("");
	};

	const handleDelete = (id: string) => {
		setTodos(todos.filter((todo) => todo.id != id));
	};

	const handleDone = (id: string) => {
		setTodos(
			todos.map((todo) => {
				if (todo.id === id) todo.done = true;
				return todo;
			}),
		);
	};

	const handleUndone = (id: string) => {
		setTodos(
			todos.map((todo) => {
				if (todo.id === id) todo.done = false;
				return todo;
			}),
		);
	};

	return (
		<div className="h-screen w-screen flex items-center justify-center bg-blue-200">
			<motion.div
				className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg"
				variants={container}
				initial="hidden"
				animate="visible"
			>
				<motion.div className="mb-4" variants={item}>
					<h1 className="text-black">Todo List</h1>
					<div className="flex mt-4">
						<input
							className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-gray-500"
							placeholder="Add Todo"
							value={todo}
							onChange={(e) => setTodo(e.target.value)}
						/>
						<Button
							color="green"
							text="Add"
							side={-1}
							fullRotate={true}
							onClick={handleAdd}
						/>
					</div>
				</motion.div>
				<div>
					{todos.map((todo, idx) => (
						<Item
							key={idx}
							{...todo}
							onDelete={() => handleDelete(todo.id)}
							onDone={() => handleDone(todo.id)}
							onUndone={() => handleUndone(todo.id)}
						/>
					))}
				</div>
			</motion.div>
		</div>
	);
};
