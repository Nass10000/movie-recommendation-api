import React, { useEffect, useState } from 'react';
import { getAllComments } from '../api/comments';
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
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

export default function CommentList({ movieId: id }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllComments()
      .then(data => {
        if (id) {
          setComments(data.filter(comment => comment.movie && comment.movie.id === id));
        } else {
          setComments(data);
        }
      })
      .catch(() => setComments([]))
      .finally(() => setLoading(false));
  }, [id]);

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

  return (
    <Box sx={{ my: 4 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Comentarios
      </Typography>
      <List>
        {comments.map(comment => (
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
                      <Chip
                        icon={<StarIcon sx={{ color: '#ffb71d' }} />}
                        label={comment.rating}
                        size="small"
                        color="secondary"
                        variant="outlined"
                      />
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
              </Stack>
            </Paper>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}