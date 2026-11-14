import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import { Clock, User, PenTool } from 'lucide-react';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/posts')
      .then((res) => setPosts(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center py-24 text-blue-600 animate-pulse text-lg font-medium">Loading posts...</div>;

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="max-w-5xl mx-auto px-4 py-16">
        
        {/* Hero Section */}
        <div className="mb-16 text-center">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 tracking-tight mb-4">
            Latest Articles
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Thoughts, stories, and ideas from the community. Discover what people are writing about today.
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-3xl border border-gray-200 border-dashed shadow-sm">
            <PenTool className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No posts yet</h3>
            <p className="text-gray-500 mb-6">Be the first to share your thoughts with the world.</p>
            <Link to="/create" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-medium transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
              Write a Post
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2">
            {posts.map((post) => (
              <div 
                key={post._id} 
                className="group bg-white p-8 rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-in-out flex flex-col justify-between cursor-pointer"
              >
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 leading-tight group-hover:text-blue-600 transition-colors duration-200">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed text-[15px]">
                    {post.content}
                  </p>
                </div>
                <div className="flex items-center justify-between mt-auto pt-5 border-t border-gray-100 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                      {post.author?.username?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <span className="font-medium text-gray-700">{post.author?.username || 'Unknown'}</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1 rounded-full">
                    <Clock className="w-3.5 h-3.5" />
                    <span className="text-xs font-medium">{new Date(post.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}