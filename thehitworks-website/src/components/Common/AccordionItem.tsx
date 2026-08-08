import { Minus, Plus } from "lucide-react";

interface AccordionItemProps {
  q: string;
  a: string;
  open: boolean;
  onToggle: () => void;
}

export default function AccordionItem({
  q,
  a,
  open,
  onToggle,
}: AccordionItemProps) {
  return (
    <div className="border-b-2 border-ink">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 py-5 text-left"
      >
        <span className="font-term text-lg sm:text-xl text-ink pr-4">
          {q}
        </span>

        <span className="shrink-0 w-8 h-8 flex items-center justify-center border-2 border-ink bg-milk-deep pixel-corners-sm">
          {open ? <Minus size={14} /> : <Plus size={14} />}
        </span>
      </button>

      {open && (
        <p className="pb-5 text-ink-70 text-lg font-term max-w-2xl">
          {a}
        </p>
      )}
    </div>
  );
}