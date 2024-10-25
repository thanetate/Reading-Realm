import * as atoms from "../../store/store";
import { useAtomValue } from "jotai";

export function Posts() {
	const posts = useAtomValue(atoms.posts);

	return (
		<div className="d-card-post">
			<div className="post-name">Posts</div>
			<div className="post-main-container">
                { posts.map((p, i) => (
                    <div key={i} className="post-container">
                        <div className="post-img"></div>
                        <div className="post-title">{p.title}</div>
                        <div className="post-desc">{p.description}</div>
                        <button className="post-heart">
                            <img src="./icons/heart.svg" alt="heart icon" />
                        </button>
				    </div>
                ))}
			</div>
		</div>
	);
}
