import SignatureCanvas from '../signature/SignatureCanvas';

interface QuoteSignatureFormProps {
  signerName: string;
  setSignerName: (name: string) => void;
  signerEmail: string;
  setSignerEmail: (email: string) => void;
  signatureImage: string;
  setSignatureImage: (img: string) => void;
  isSubmitting: boolean;
  onSign: () => void;
}

export default function QuoteSignatureForm({
  signerName,
  setSignerName,
  signerEmail,
  setSignerEmail,
  signatureImage,
  setSignatureImage,
  isSubmitting,
  onSign,
}: QuoteSignatureFormProps) {
  return (
    <div className="space-y-5">
      <div>
        <h3 className="text-base font-bold text-gray-900 mb-4">Accepter et signer le devis</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500" htmlFor="signer_name">Nom complet</label>
            <input
              id="signer_name"
              className="w-full px-3.5 py-2 border border-gray-200 rounded-md text-sm bg-white text-gray-950 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all disabled:opacity-50 disabled:bg-gray-50"
              type="text"
              value={signerName}
              onChange={(e) => setSignerName(e.target.value)}
              placeholder="Votre nom complet"
              disabled={isSubmitting}
              required
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500" htmlFor="signer_email">Email</label>
            <input
              id="signer_email"
              className="w-full px-3.5 py-2 border border-gray-200 rounded-md text-sm bg-white text-gray-950 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all disabled:opacity-50 disabled:bg-gray-50"
              type="email"
              value={signerEmail}
              onChange={(e) => setSignerEmail(e.target.value)}
              placeholder="votre@email.com"
              disabled={isSubmitting}
              required
            />
          </div>
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-bold text-gray-500">Signature manuscrite</label>
        <SignatureCanvas
          onSave={(dataUrl) => setSignatureImage(dataUrl)}
          onClear={() => setSignatureImage('')}
          disabled={isSubmitting}
        />
      </div>

      <button
        className="w-full py-3 px-4 bg-emerald-600 text-white rounded-lg text-sm font-bold shadow-sm shadow-emerald-500/10 hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
        onClick={onSign}
        disabled={isSubmitting || !signerName.trim() || !signatureImage}
      >
        {isSubmitting ? (
          <>
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Signature en cours...
          </>
        ) : (
          '✅ Accepter et signer le devis'
        )}
      </button>
    </div>
  );
}
