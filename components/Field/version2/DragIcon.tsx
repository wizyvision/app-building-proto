/**
 * Vertical Dots Drag Icon - Version 2
 * A drag handle icon with 6 vertical dots (2 columns x 3 rows)
 */
export const DragIcon = () => {
  return (
    <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Left column */}
      <circle cx="2" cy="2" r="1.5" fill="#8C8C8C" />
      <circle cx="2" cy="7" r="1.5" fill="#8C8C8C" />
      <circle cx="2" cy="12" r="1.5" fill="#8C8C8C" />
      {/* Right column */}
      <circle cx="6" cy="2" r="1.5" fill="#8C8C8C" />
      <circle cx="6" cy="7" r="1.5" fill="#8C8C8C" />
      <circle cx="6" cy="12" r="1.5" fill="#8C8C8C" />
    </svg>
  );
};
