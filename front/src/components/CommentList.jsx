import React, { useEffect, useState } from 'react';
import { getAllComments } from '../api/comments';

export default function CommentList({ movieId: id }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllComments()
      .then(data => {
        // Si recibes todos los comentarios, filtra por movieId si se pasa como prop
        if (id) {
          setComments(data.filter(comment => comment.movie && comment.movie.id === id));
        } else {
          setComments(data);
        }
      })
      .catch(() => setComments([]))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div>Cargando comentarios...</div>;
  if (!comments.length) return <div>No hay comentarios.</div>;

  return (
    <div>
      <h3>Comentarios</h3>
      <ul>
        {comments.map(comment => (
          <li key={comment.id}>
            <strong>{comment.user?.username || 'Anónimo'}:</strong> {comment.content}
            {comment.rating && <span> | ⭐ {comment.rating}</span>}
            {comment.sentiment && <span> | Sentimiento: {comment.sentiment}</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}