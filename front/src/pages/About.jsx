import { Box, Typography, Paper, Divider } from '@mui/material';

export default function About() {
  return (
    <Box sx={{ maxWidth: 700, mx: 'auto', my: 6 }}>
      <Paper elevation={4} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 900, mb: 2, color: 'primary.main' }}>
          About Us
        </Typography>
        <Divider sx={{ mb: 3 }} />
        <Typography variant="body1" sx={{ mb: 2 }}>
          Este proyecto, <b>Movie Recommendation API</b>, fue desarrollado como una demostración de mis habilidades técnicas y mi capacidad para implementar buenas prácticas en el desarrollo de software. Está diseñado para mostrar mi enfoque en la automatización, el análisis de datos y la creación de sistemas escalables, todo pensado para un entorno profesional.
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          <b>Roles y funcionalidades:</b> Los administradores pueden agregar nuevas películas a la plataforma, mientras que los usuarios pueden dejar comentarios y calificar las películas. El sistema calcula el promedio de los ratings de los usuarios para cada película, permitiendo así medir con precisión qué tan buena es cada película para el público en general y ofrecer una referencia confiable de películas recomendadas.
        </Typography>
      </Paper>
    </Box>
  );
}