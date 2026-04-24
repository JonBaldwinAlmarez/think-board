import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { ArrowLeft, Loader2, Trash } from "lucide-react";
import axios from "axios";

const NoteDetailPage = () => {
	const [loading, setLoading] = useState<boolean>(true);
	const [note, setNote] = useState<any>(null);
	const [saving, setSaving] = useState<boolean>(false);

	const navigate = useNavigate();
	const { id } = useParams();

	useEffect(() => {
		const fetchNote = async () => {
			try {
				const res = await api.get(`/notes/${id}`);
				setNote(res.data);
			} catch (error) {
				toast.error("Fail to load note");
				navigate("/");
				console.error(`Fetching failed:	${error}`);
			} finally {
				setLoading(false);
			}
		};

		fetchNote();
	}, [id]);

	const handleDelete = async () => {
		if (!window.confirm("Are you sure you want to delete the note")) return;

		try {
			await api.delete(`/notes/${id}`);
			toast.success("Successfully Deleted");
			navigate("/");
		} catch (error) {
			console.log(error);
			toast.error("fail to delete!");
		}
	};

	const handleSave = async () => {
		if (!note.title.trim() || !note.content.trim()) {
			toast.error("Please provide title and content");
			return;
		}
		setSaving(true);

		try {
			await api.put(`/notes/${id}`, note);
			toast.success("Update note successfully");
			navigate("/");
		} catch (error) {
			toast.error("Fail to save data");
			console.error(error);
		} finally {
			setSaving(false);
		}
	};

	if (loading) {
		return (
			<div className="min-h-screen bg-base-200 flex items-center justify-center">
				<Loader2 className="animate-spin size-10" />
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-base-200">
			<div className="container mx-auto px-4 py-8">
				<div className="max-w-2xl mx-auto">
					<div className="flex items-center justify-between mb-6">
						<Link to="/" className="btn btn-ghost">
							<ArrowLeft className="h-5 w-5" />
							Back to Home
						</Link>
						<div
							onClick={handleDelete}
							className="button btn btn-error btn-oputline"
						>
							<Trash className="h-5 w-5" />
							Delete Note
						</div>
					</div>
					<div className="card bg-base-200">
						<div className="card-body">
							<div className="form-control mb-4">
								<label className="label">
									<span className="label-text">Title</span>
								</label>
								<input
									type="text"
									placeholder="Note Title"
									value={note.title}
									className="input input-bordered"
									onChange={(e) => setNote({ ...note, title: e.target.value })}
								/>
							</div>

							<div className="form-control mb-4">
								<label className="label">
									<span className="label-text">Content</span>
								</label>
								<textarea
									placeholder="Note Content"
									value={note.content}
									className="textarea textarea-bordered h-32"
									onChange={(e) =>
										setNote({ ...note, content: e.target.value })
									}
								></textarea>
							</div>

							<div className="card-action justify-end">
								<button
									className="btn btn-primary"
									disabled={saving}
									onClick={handleSave}
								>
									{saving ? "Loading..." : "Save Changes"}
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default NoteDetailPage;
