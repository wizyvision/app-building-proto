/**
 * Actions Component - Action buttons for mobile fields
 *
 * Contains three action buttons:
 * - Media: Camera icon
 * - Remarks: Comment icon
 * - Actions: Menu icon
 *
 * Figma reference: node-id 318-5694
 */

interface ActionsProps {
  hasMedia?: boolean;
  hasRemarks?: boolean;
  hasActions?: boolean;
}

export const Actions = ({
  hasMedia = true,
  hasRemarks = true,
  hasActions = true
}: ActionsProps) => {
  return (
    <div className="flex gap-[12px] items-start w-full cursor-pointer" data-name="Action">
      {hasMedia && (
        <div className="flex flex-col gap-[8px] items-center justify-center overflow-clip rounded-[100px]">
          <div className="box-border flex gap-[8px] h-[40px] items-center justify-center pl-[12px] pr-[16px] py-[10px]">
            <div className="overflow-clip w-[18px] h-[18px]" data-name="icon">
              {/* Media icon placeholder - will be replaced with actual icon */}
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M3 3h12v12H3z" fill="#EB4236" />
              </svg>
            </div>
            <p
              className="font-['Roboto:Medium',_sans-serif] font-medium leading-[20px] text-[#eb4236] text-[14px] text-center tracking-[0.1px]"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              Media
            </p>
          </div>
        </div>
      )}

      {hasRemarks && (
        <div className="flex flex-col gap-[8px] items-center justify-center overflow-clip rounded-[100px]">
          <div className="box-border flex gap-[8px] h-[40px] items-center justify-center pl-[12px] pr-[16px] py-[10px]">
            <div className="overflow-clip w-[18px] h-[18px]" data-name="icon">
              {/* Remarks icon placeholder - will be replaced with actual icon */}
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M3 3h12v12H3z" fill="#EB4236" />
              </svg>
            </div>
            <p
              className="font-['Roboto:Medium',_sans-serif] font-medium leading-[20px] text-[#eb4236] text-[14px] text-center tracking-[0.1px]"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              Remarks
            </p>
          </div>
        </div>
      )}

      {hasActions && (
        <div className="flex flex-col gap-[8px] items-center justify-center overflow-clip rounded-[100px]">
          <div className="box-border flex gap-[8px] h-[40px] items-center justify-center pl-[12px] pr-[16px] py-[10px]">
            <div className="bg-white overflow-clip w-[18px] h-[18px]" data-name="icon">
              {/* Actions icon placeholder - will be replaced with actual icon */}
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M3 3h12v12H3z" fill="#EB4236" />
              </svg>
            </div>
            <p
              className="font-['Roboto:Medium',_sans-serif] font-medium leading-[20px] text-[#eb4236] text-[14px] text-center tracking-[0.1px]"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              Actions
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
