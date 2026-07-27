import React, { useEffect, useState } from 'react';
import type { SignatureResult } from '../../types';

interface CertificateDisplayProps {
  signature: SignatureResult;
  quoteNumber: string;
}

export default function CertificateDisplay({ signature, quoteNumber }: CertificateDisplayProps) {
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null);

  useEffect(() => {
    if (signature.verification_url) {
      import('qrcode').then((QRCode) => {
        QRCode.toDataURL(signature.verification_url!, {
          width: 150,
          margin: 2,
          color: { dark: '#1f2937', light: '#ffffff' },
        }).then((url: string) => setQrDataUrl(url));
      });
    }
  }, [signature.verification_url]);

  if (!signature) return null;

  const formattedDate = new Date(signature.timestamp).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short',
  });

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 mt-6">
      <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
        <h3 className="font-semibold text-gray-900 text-base">Certificat de signature électronique</h3>
        <p className="text-gray-500 text-xs mt-1">
          Devis {quoteNumber} — Signé électroniquement le {formattedDate}
        </p>
      </div>

      <div className="p-6">
        {signature.signature_image && (
          <div className="mb-6 flex flex-col items-center">
            <p className="text-gray-500 text-xs mb-2 self-start font-semibold">Signature manuscrite</p>
            <div className="border border-gray-200 rounded-lg bg-gray-50/50 p-3 w-full flex justify-center">
              <img src={signature.signature_image} alt="Signature du client" className="max-h-24" />
            </div>
          </div>
        )}

        <table className="w-full text-sm text-left text-gray-700">
          <tbody>
            {signature.signer_name && (
              <tr className="border-b border-gray-100">
                <td className="py-3 pr-4 font-semibold text-gray-600 w-1/3">
                  Signataire
                </td>
                <td className="py-3 text-gray-800">
                  {signature.signer_name}
                </td>
              </tr>
            )}
            <tr className="border-b border-gray-100">
              <td className="py-3 pr-4 font-semibold text-gray-600 w-1/3">
                Identifiant de signature
              </td>
              <td className="py-3 font-mono text-xs text-gray-500 break-all select-all">
                {signature.id}
              </td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="py-3 pr-4 font-semibold text-gray-600">
                Empreinte SHA-256
              </td>
              <td className="py-3 font-mono text-xs text-gray-500 break-all select-all">
                {signature.hash}
              </td>
            </tr>
            <tr className="border-b border-gray-100">
              <td className="py-3 pr-4 font-semibold text-gray-600">
                Horodatage
              </td>
              <td className="py-3 text-gray-800">
                {formattedDate}
              </td>
            </tr>
            <tr>
              <td className="py-3 pr-4 font-semibold text-gray-600">
                Cachet électronique
              </td>
              <td className="py-3">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                  Valide
                </span>
              </td>
            </tr>
          </tbody>
        </table>

        {signature.certificate_url && (
          <div className="mt-4">
            <a
              href={signature.certificate_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 bg-white rounded-md text-sm font-semibold hover:bg-gray-50 transition-colors"
            >
              Télécharger le certificat PDF
            </a>
          </div>
        )}

        {qrDataUrl && (
          <div className="mt-6 flex flex-col items-center border-t border-gray-100 pt-6">
            <p className="text-gray-500 text-xs mb-3">
              Scannez pour vérifier l'authenticité du document
            </p>
            <div className="p-2 bg-gray-50 rounded-lg border border-gray-200">
              <img
                src={qrDataUrl}
                alt="QR Code de vérification"
                className="w-[150px] h-[150px] rounded"
              />
            </div>
            <p className="text-[10px] text-gray-400 mt-2 text-center break-all select-all max-w-sm">
              {signature.verification_url}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
