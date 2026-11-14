import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { Send } from 'lucide-react';

export default function WritePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/posts', { title, content });
      navigate('/'); 
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create post.');
    }
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-3xl mx-auto">
        
        <div className="mb-10 flex items-center justify-between">
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Create a new post</h2>
        </div>

        {error && <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6 border border-red-100">{error}</div>}
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div>
            <input 
              type="text" 
              placeholder="Post Title..." 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              required 
              className="w-full text-4xl font-bold text-gray-900 placeholder-gray-300 border-none outline-none focus:ring-0 px-0 bg-transparent"
            />
          </div>
          
          <div className="border-t border-gray-100 pt-6">
            <textarea 
              placeholder="Tell your story..." 
              value={content} 
              onChange={(e) => setContent(e.target.value)} 
              required 
              rows="15" 
              className="w-full text-lg text-gray-700 placeholder-gray-400 border-none outline-none focus:ring-0 px-0 bg-transparent resize-none leading-relaxed"
            />
          </div>
          
          <div className="flex justify-end pt-4 border-t border-gray-100">
            <button 
              type="submit" 
              className="inline-flex items-center gap-2 bg-gray-900 hover:bg-black text-white px-8 py-3 rounded-full font-medium transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
            >
              <Send className="w-4 h-4" /> Publish Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}