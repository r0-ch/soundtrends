import Comments from "../components/Comments";
import Post from "../components/Post";


const PostPage = () => {
    

    return (
        <main>
            <div className="post-page">
                <Post />
                <Comments />
            </div>
        </main>
    );
}

export default PostPage;