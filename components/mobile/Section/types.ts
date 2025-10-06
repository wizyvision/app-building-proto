export interface MobileSectionProps {
  /** Section title/name (e.g., "Basic Details", "Inspector") */
  title: string;
  /** Completion percentage text (e.g., "0/0 (0%)", "3/5 (60%)") */
  completionText?: string;
  /** Whether section is expanded (showing children) */
  isExpanded: boolean;
  /** Callback when toggle expand/collapse */
  onToggle: () => void;
  /** Section content (fields) */
  children?: React.ReactNode;
}
