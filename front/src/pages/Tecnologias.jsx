import { Box, Typography, Paper, Divider } from '@mui/material';

export default function Tecnologias() {
  return (
    <Box sx={{ maxWidth: 700, mx: 'auto', my: 6 }}>
      <Paper elevation={4} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 900, mb: 2, color: 'primary.main' }}>
          Tecnologías Utilizadas
        </Typography>
        <Divider sx={{ mb: 3 }} />
        <Typography variant="h6" sx={{ fontWeight: 700, mt: 2, mb: 1 }}>
          Buenas Prácticas Implementadas
        </Typography>
        <ul style={{ marginLeft: 24, marginBottom: 16 }}>
          <li>
            <Typography variant="body1">
              <b>Automatización de pruebas:</b> Usé <b>Python</b> para probar todos los endpoints de la API, optimizando el tiempo y garantizando la calidad del sistema.
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              <b>Análisis de datos:</b> Implementé un modelo básico de análisis de sentimientos en comentarios, añadiendo valor a las recomendaciones.
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              <b>Autenticación avanzada:</b> Integré <b>JWT</b> y <b>Auth0</b> para una experiencia segura y profesional.
            </Typography>
          </li>
        </ul>
        <Typography variant="h6" sx={{ fontWeight: 700, mt: 2, mb: 1 }}>
          Stack Tecnológico
        </Typography>
        <Typography variant="body1">
          <b>Backend:</b> NestJS, TypeScript, PostgreSQL.<br />
          <b>Frontend:</b> React, Vite.<br />
          <b>Testing:</b> Python (pytest, Schemathesis).<br />
          <b>Contenedores:</b> Docker.
        </Typography>
      </Paper>
    </Box>
  );
}