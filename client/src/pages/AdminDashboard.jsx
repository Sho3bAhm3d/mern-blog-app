import { useEffect, useState } from 'react';
import api from '../api';

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');

  const loadData = async () => {
    try {
      const [u, p] = await Promise.all([
        api.get('/admin/users'), 
        api.get('/posts')
      ]);
      setUsers(u.data || []);
      setPosts(p.data || []);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to load admin data. Is the backend running?');
    }
  };

  useEffect(() => { loadData(); }, []);

  const deletePost = async (id) => {
    if (!window.confirm('Delete this post?')) return;
    await api.delete(`/admin/posts/${id}`);
    loadData();
  };

  const deleteUser = async (id) => {
    if (!window.confirm('Delete this user?')) return;
    await api.delete(`/admin/users/${id}`);
    loadData();
  };

  if (error) return <div style={{ padding: '2rem', color: 'red' }}><h2>Error:</h2><p>{error}</p></div>;

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>⚙️ Admin Dashboard</h1>

      <h2>Users ({users.length})</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '2rem' }}>
        <thead>
          <tr style={{ background: '#eee', textAlign: 'left' }}>
            <th style={{ padding: '10px' }}>Username</th>
            <th style={{ padding: '10px' }}>Email</th>
            <th style={{ padding: '10px' }}>Role</th>
            <th style={{ padding: '10px' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id} style={{ borderTop: '1px solid #ddd' }}>
              <td style={{ padding: '10px' }}>{u.username}</td>
              <td style={{ padding: '10px' }}>{u.email}</td>
              <td style={{ padding: '10px' }}>{u.role}</td>
              <td style={{ padding: '10px' }}>
                <button onClick={() => deleteUser(u._id)} style={{ cursor: 'pointer', color: 'red' }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>All Posts ({posts.length})</h2>
      {posts.map((p) => (
        <div key={p._id} style={{ borderTop: '1px solid #ddd', padding: '10px 0', display: 'flex', justifyContent: 'space-between' }}>
          <span><strong>{p.title}</strong> — <em>{p.author?.username}</em></span>
          <button onClick={() => deletePost(p._id)} style={{ cursor: 'pointer', color: 'red' }}>Delete</button>
        </div>
      ))}
    </div>
  );
}