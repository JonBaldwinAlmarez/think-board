import toast from "react-hot-toast";

const HomePage = () => {
	return (
		<div data-theme="black">
			<button
				onClick={() => {
					toast.success("Fuck Yeah");
				}}
				className="btn btn-outline"
			>
				Click
			</button>
			<button className="btn">Button</button>
			<button className="btn btn-neutral">Neutral</button>
			<button className="btn btn-primary">Primary</button>
			<button className="btn btn-secondary">Secondary</button>
			<button className="btn btn-accent">Accent</button>
			<button className="btn btn-ghost">Ghost</button>
			<button className="btn btn-link">Link</button>
		</div>
	);
};

export default HomePage;
