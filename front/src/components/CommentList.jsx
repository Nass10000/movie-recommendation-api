import React, { useEffect, useState, useContext } from 'react';
import { getCommentsByMovie, deleteComment } from '../api/comments';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Paper,
  Stack,
  Chip,
  CircularProgress,
  Button,
} from '@mui/material';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import { AuthContext } from '../context/Authcontext';

export default function CommentList({ movieId: id, reload }) {
  const { token, user } = useContext(AuthContext);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getCommentsByMovie(id, token)
      .then(data => {
        console.log('Comentarios recibidos del backend:', data);
        setComments(Array.isArray(data) ? data : []);
      })
      .catch(() => setComments([]))
      .finally(() => setLoading(false));
  }, [id, token, reload]);

  if (loading)
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
        <CircularProgress />
      </Box>
    );
  if (!comments.length)
    return (
      <Typography variant="body1" color="text.secondary" sx={{ my: 2 }}>
        No hay comentarios.
      </Typography>
    );

  console.log('Renderizando comentarios:', comments);

  return (
    <Box sx={{ my: 4 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Comentarios
      </Typography>
      <List>
        {comments.map(comment => {
          console.log('Usuario logueado:', user);
          console.log('Usuario del comentario:', comment.user);

          return (
            <ListItem key={comment.id} alignItems="flex-start" sx={{ mb: 2 }}>
              <Paper sx={{ p: 2, width: '100%' }} elevation={3}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <ListItemAvatar>
                    <Avatar>
                      {comment.user?.username?.[0]?.toUpperCase() || 'A'}
                    </Avatar>
                  </ListItemAvatar>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      {comment.user?.username || 'Anónimo'}
                    </Typography>
                    <Typography variant="body1" sx={{ mt: 0.5 }}>
                      {comment.content}
                    </Typography>
                    <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                      {comment.rating && (
                        <Rating value={comment.rating} readOnly size="small" max={5} />
                      )}
                      {comment.sentiment && (
                        <Chip
                          label={`Sentimiento: ${comment.sentiment}`}
                          size="small"
                          color={
                            comment.sentiment === 'positivo'
                              ? 'success'
                              : comment.sentiment === 'negativo'
                              ? 'error'
                              : 'default'
                          }
                          variant="outlined"
                        />
                      )}
                    </Stack>
                  </Box>
                  {(user && (user.id === comment.user?.id || user.role === 'admin')) && (
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      sx={{ ml: 2 }}
                      onClick={async () => {
                        await deleteComment(comment.id, token);
                        setLoading(true);
                        getCommentsByMovie(id, token)
                          .then(data => setComments(Array.isArray(data) ? data : []))
                          .catch(() => setComments([]))
                          .finally(() => setLoading(false));
                      }}
                    >
                      Borrar
                    </Button>
                  )}
                </Stack>
              </Paper>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
}