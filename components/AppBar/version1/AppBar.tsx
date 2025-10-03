import { AppBar as MuiAppBar, Toolbar, Box, Avatar, Typography, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

/**
 * AppBar Component - Version 1
 *
 * VERSION INFO:
 * - Version: 1
 * - Created: 2025-10-02
 * - Initial implementation: Basic top navigation bar
 *
 * UX PRINCIPLES APPLIED:
 * - Jakob's Law: Familiar top app bar pattern (standard across web/mobile apps)
 * - Visual Hierarchy: App name prominent on left, user avatar on right
 * - Fitts's Law: Avatar positioned in easy-reach corner area, back button 44x44px
 *
 * INTERACTIONS:
 * - Optional back button for navigation
 */

interface AppBarProps {
  showBackButton?: boolean;
  onBackClick?: () => void;
  title?: string;
}

export const AppBar = ({ showBackButton = false, onBackClick, title = 'Form Builder' }: AppBarProps) => {
  return (
    <MuiAppBar
      position="fixed"
      elevation={1}
      sx={{
        height: 64,
        backgroundColor: 'common.white',
        borderBottom: 1,
        borderColor: 'grey.300',
      }}
    >
      <Toolbar
        sx={{
          height: '100%',
          px: 2,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {showBackButton && (
            <IconButton
              onClick={onBackClick}
              aria-label="Back"
              sx={{
                minWidth: 44,
                minHeight: 44,
                color: 'text.primary',
                '&:hover': {
                  backgroundColor: 'action.hover',
                  color: 'primary.main',
                },
              }}
            >
              <ArrowBackIcon />
            </IconButton>
          )}
          <Typography variant="h6" color="text.primary">
            {title}
          </Typography>
        </Box>

        <Box>
          <Avatar sx={{ width: 40, height: 40 }} />
        </Box>
      </Toolbar>
    </MuiAppBar>
  );
};
