import { useContext, useEffect } from "react";
import PostDetails from "../components/PostDetails";
import { PostsContext } from "../contexts/PostsContext";

const HomePage = () => {

    const { posts, dispatch } = useContext(PostsContext);
    // const [posts, setPosts] = useState(null);

    const sortPosts = () => {
        let sortValue = document.querySelector('select').value;

        switch (sortValue) {
            case 'newest':
                return dispatch({ type: 'SET_POSTS_BY_NEWEST' });
            case 'oldest':
                return dispatch({ type: 'SET_POSTS_BY_OLDEST' });
            case 'loved':
                return dispatch({ type: 'SET_POSTS_BY_MOST_LIKES' });
            case 'hated':
                return dispatch({ type: 'SET_POSTS_BY_LEAST_LIKES' });
            default:
                break
        }

        console.log(posts)
    }


    useEffect(() => {


        const fetchPosts = async () => {
            const response = await fetch('http://localhost:4000/api/posts');
            const json = await response.json();

            if (response.ok) {
                dispatch({ type: 'SET_POSTS', payload: json });


            }
        }

        fetchPosts();


    }, [dispatch])

    return (
        <main className="home">
            {/* <div className="trending articles">
                <h2>Trending</h2>
                <div className="trending-post">
                    <PostDetails key={posts[0]._id} post={posts[0]} />
                </div>
            </div> */}
            <div className="articles">
                <div className="articles__header">
                    <h2>Articles</h2>
                    <select onChange={sortPosts} defaultValue={"none"} name="sort-posts" id="sort-posts"> 
                        <option value="none" disabled>--Trier--</option>
                        <option value="newest">Le plus récent</option>
                        <option value="oldest">Le plus ancien</option>
                        <option value="loved">Le plus aimé</option>
                        <option value="hated">Le moins aimé</option>
                    </select>
                </div>
                <div className="articles__posts">
                    {posts && posts.map(post => (
                        <PostDetails key={post._id} post={post} />
                    ))}
                </div>
            </div>
        </main>
    );
}

export default HomePage;