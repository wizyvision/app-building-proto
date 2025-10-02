import { AppBar as MuiAppBar, Toolbar, Box, Avatar, Typography } from '@mui/material';

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
 * - Fitts's Law: Avatar positioned in easy-reach corner area
 *
 * INTERACTIONS:
 * - None (visual shell only, no menus/navigation)
 */
export const AppBar = () => {
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
        <Box>
          <Typography variant="h6" color="text.primary">
            Form Builder
          </Typography>
        </Box>

        <Box>
          <Avatar sx={{ width: 40, height: 40 }} />
        </Box>
      </Toolbar>
    </MuiAppBar>
  );
};
