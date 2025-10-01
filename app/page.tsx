import { Container, Typography, Button, Card, CardContent, Box } from '@mui/material';
import Link from 'next/link';

export default function HomePage() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box textAlign="center" mb={4}>
        <Typography variant="h1" gutterBottom>
          WizyVision Form Builder
        </Typography>
        <Typography variant="body1" color="text.secondary" mb={3}>
          Device-based form layout builder prototype for stakeholder feedback
        </Typography>
        <Button
          variant="contained"
          size="large"
          color='primary'
          component={Link}
          href="/admin/layout-builder"
        >
          Open Layout Builder
        </Button>
      </Box>

      <Card>
        <CardContent>
          <Typography variant="h2" gutterBottom>
            Prototype Features
          </Typography>
          <Typography variant="body1" mb={2}>
            This prototype demonstrates:
          </Typography>
          <ul>
            <li>Device preview toggle (mobile/tablet/desktop)</li>
            <li>Pages list with create/reorder functionality</li>
            <li>Sections list with create/reorder functionality</li>
            <li>Fields list with drag-to-reorder between sections</li>
            <li>Visual distinction between device layouts</li>
            <li>Material UI design system implementation</li>
          </ul>
        </CardContent>
      </Card>
    </Container>
  );
}