interface QuoteDeclineFormProps {
  declineReason: string;
  setDeclineReason: (reason: string) => void;
  isSubmitting: boolean;
  onDecline: () => void;
}

export default function QuoteDeclineForm({
  declineReason,
  setDeclineReason,
  isSubmitting,
  onDecline,
}: QuoteDeclineFormProps) {
  return (
    <div className="border-t border-gray-100 pt-6 space-y-4">
      <div>
        <h3 className="text-base font-bold text-red-650 mb-1">Refuser le devis</h3>
        <p className="text-xs text-gray-500 mb-3">Si vous refusez ce devis, veuillez nous indiquer le motif.</p>
        
        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-500" htmlFor="decline_reason">Motif du refus</label>
          <textarea
            id="decline_reason"
            className="w-full px-3.5 py-2 border border-gray-200 rounded-md text-sm bg-white text-gray-950 placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all disabled:opacity-50"
            rows={3}
            value={declineReason}
            onChange={(e) => setDeclineReason(e.target.value)}
            placeholder="Expliquez pourquoi vous refusez ce devis..."
            disabled={isSubmitting}
          />
        </div>
      </div>

      <button
        className="px-4 py-2 border border-red-200 text-red-600 bg-red-50/50 rounded-md text-sm font-semibold hover:bg-red-600 hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5 cursor-pointer"
        onClick={onDecline}
        disabled={isSubmitting || !declineReason.trim()}
      >
        {isSubmitting ? (
          <>
            <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
            Refus en cours...
          </>
        ) : (
          '❌ Refuser le devis'
        )}
      </button>
    </div>
  );
}
