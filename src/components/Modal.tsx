import { ReactNode } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
  width?: string;
}

export default function Modal({ open, onClose, title, children, footer, width = "max-w-md" }: Props) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={onClose}>
      <div
        className={`bg-white rounded-2xl shadow-2xl w-full ${width} mx-4 overflow-hidden`}
        onClick={e => e.stopPropagation()}
      >
        <div className="px-6 pt-6 pb-4">
          <h3 className="font-jakarta text-lg font-bold text-gray-900">{title}</h3>
        </div>
        <div className="px-6 pb-4">{children}</div>
        {footer && (
          <div className="px-6 py-4 border-t border-gray-100 flex gap-3 justify-end">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
