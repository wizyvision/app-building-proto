export type PreviewMode = 'web' | 'mobile';

export interface PreviewToggleProps {
  value: PreviewMode;
  onChange: (mode: PreviewMode) => void;
}
