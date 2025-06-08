import React, { useState, useContext } from 'react';
import { createComment } from '../api/comments';
import { AuthContext } from '../context/Authcontext';

export default function CommentForm({ movieId, onCommentAdded }) {
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(5);
  const [error, setError] = useState('');
  const { token, user } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!content.trim()) {
      setError('El comentario no puede estar vacío');
      return;
    }
    try {
      const data = {
        content,
        movieId,
        userId: user?.id,
        rating: Number(rating),
      };
      await createComment(data, token);
      setContent('');
      setRating(5);
      if (onCommentAdded) onCommentAdded();
    } catch (err) {
      setError('Error al enviar el comentario');
    }
  };

  if (!token) return <div>Inicia sesión para comentar.</div>;

  return (
    <form onSubmit={handleSubmit}>
      <h4>Agregar comentario</h4>
      <textarea
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder="Escribe tu comentario"
        required
      />
      <br />
      <label>
        Rating:
        <select value={rating} onChange={e => setRating(e.target.value)}>
          {[1,2,3,4,5].map(n => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>
      </label>
      <br />
      <button type="submit">Comentar</button>
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </form>
  );
}