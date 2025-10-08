import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';

interface PropertySectionProps {
  title: string;
  defaultExpanded?: boolean;
  children: React.ReactNode;
}

const StyledAccordion = styled(Accordion)(({ theme }) => ({
  boxShadow: 'none',
  borderBottom: `1px solid ${theme.palette.divider}`,
  '&:before': {
    display: 'none',
  },
  '&.Mui-expanded': {
    margin: 0,
  },
}));

const StyledAccordionSummary = styled(AccordionSummary)(({ theme }) => ({
  padding: theme.spacing(0, 2),
  minHeight: 48,
  '&.Mui-expanded': {
    minHeight: 48,
  },
}));

const StyledAccordionDetails = styled(AccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));

/**
 * PropertySection Component
 *
 * UX PRINCIPLES APPLIED:
 * - Jakob's Law: Familiar accordion pattern for collapsible sections
 * - Miller's Law: Groups related properties into digestible chunks (5-7 items max per section)
 * - Progressive Disclosure: Hides advanced options until needed, reducing cognitive load
 *
 * INTERACTION DESIGN:
 * - Click header: Toggle expand/collapse
 * - Smooth expand animation (200ms)
 * - Expand icon rotates on expand
 */
export const PropertySection = ({ title, defaultExpanded = false, children }: PropertySectionProps) => {
  return (
    <StyledAccordion defaultExpanded={defaultExpanded} disableGutters>
      <StyledAccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant="subtitle2" fontWeight={600}>
          {title}
        </Typography>
      </StyledAccordionSummary>
      <StyledAccordionDetails>
        {children}
      </StyledAccordionDetails>
    </StyledAccordion>
  );
};
