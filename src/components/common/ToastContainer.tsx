import React from 'react';
import { useEventContext } from '../../context/EventContext';
import { Info, CheckCircle2, AlertTriangle, AlertOctagon, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useEventContext();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-20 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map(toast => {
        let Icon = Info;
        let borderColor = 'border-violet-500/40 bg-white/95 text-slate-800';
        let iconColor = 'text-violet-600';

        if (toast.type === 'success') {
          Icon = CheckCircle2;
          borderColor = 'border-emerald-500/40 bg-emerald-50/95 text-emerald-950 dark:bg-emerald-950/90 dark:text-emerald-100';
          iconColor = 'text-emerald-600';
        } else if (toast.type === 'warning') {
          Icon = AlertTriangle;
          borderColor = 'border-amber-500/40 bg-amber-50/95 text-amber-950 dark:bg-amber-950/90 dark:text-amber-100';
          iconColor = 'text-amber-600';
        } else if (toast.type === 'danger') {
          Icon = AlertOctagon;
          borderColor = 'border-rose-500/40 bg-rose-50/95 text-rose-950 dark:bg-rose-950/90 dark:text-rose-100';
          iconColor = 'text-rose-600';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl shadow-lg border backdrop-blur-md transition-all duration-300 animate-in slide-in-from-right-full ${borderColor}`}
          >
            <Icon className={`w-5 h-5 mt-0.5 flex-shrink-0 ${iconColor}`} />
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold leading-snug">{toast.title}</h4>
              <p className="text-xs opacity-90 mt-0.5 leading-relaxed">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-slate-600 transition-colors p-0.5 rounded-lg"
              aria-label="Dismiss toast"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
