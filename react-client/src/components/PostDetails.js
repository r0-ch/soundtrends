import { Link } from "react-router-dom";
import { format } from "date-fns";

const PostDetails = ({ post }) => {
    const likes = post.likes ? post.likes.length : 0;
    console.log(likes);

    const date = post.createdAt ? format(new Date(post.createdAt), 'd MMM yy') : 'N/A';

    return (
        <div className="post">
            <Link className="post__link" to={`/post/${post._id}`}>
                <img className="post__cover" src={post.coverPath} alt="cover" />
                <div className="post__infos">
                    <div className="info">
                        <p>le <span className="info__date">{date}</span></p>
                        <p>par <span className="info__author">{post.author.fullName}</span></p>
                        <span><span className="info__likes">{likes}</span> like(s)</span>
                    </div>
                    <h3>{post.title}</h3>
                    <p className="summary">{post.summary}</p>
                </div>
            </Link>
        </div>
    );
}

export default PostDetails;