import { useState, useEffect, useCallback } from 'react';
import { fetchPublicQuote, acceptPublicQuote, declinePublicQuote } from '../services/api';
import type { PublicQuote, SignatureResult } from '../types';

export type ViewState = 'loading' | 'error' | 'view' | 'signing' | 'signed' | 'declined';

export function usePublicQuote(quoteId: string | undefined) {
  const [viewState, setViewState] = useState<ViewState>('loading');
  const [quote, setQuote] = useState<PublicQuote | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Signature / Decline forms state
  const [signerName, setSignerName] = useState('');
  const [signerEmail, setSignerEmail] = useState('');
  const [signatureImage, setSignatureImage] = useState<string>('');
  const [declineReason, setDeclineReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [signatureResult, setSignatureResult] = useState<SignatureResult | null>(null);

  // Load the public quote
  useEffect(() => {
    if (!quoteId) {
      setViewState('error');
      setError('Identifiant du devis manquant.');
      return;
    }

    setViewState('loading');
    setError(null);

    fetchPublicQuote(quoteId)
      .then((data) => {
        setQuote(data);
        if (data.status === 'accepted' || data.status === 'invoiced' || data.status === 'paid') {
          setViewState('signed');
          setSignatureResult({
            id: data.id,
            signer_name: data.signer_name ?? undefined,
            signature_image: data.signature_image,
            hash: data.signature_hash ?? 'Voir le certificat pour l\'empreinte complète',
            timestamp: data.signature_timestamp ?? new Date().toISOString(),
            certificate_url: null,
            verification_url: data.signature_verification_url ?? `${window.location.origin}/signatures/${data.id}/verify`,
            qr_code: null,
          });
        } else if (data.status === 'declined') {
          setViewState('declined');
        } else {
          setViewState('view');
        }
      })
      .catch((err) => {
        setViewState('error');
        setError(err?.response?.data?.error?.message || 'Impossible de charger le devis. Vérifiez le lien.');
      });
  }, [quoteId]);

  const handleSign = useCallback(async () => {
    if (!quoteId || !quote || !signerName.trim() || !signatureImage) return;

    setIsSubmitting(true);
    setError(null);
    try {
      const updatedQuote = await acceptPublicQuote(quoteId, {
        signer_name: signerName.trim(),
        signer_email: signerEmail.trim(),
        signature_image: signatureImage,
      });

      setQuote(updatedQuote);
      setViewState('signed');
      setSignatureResult({
        id: updatedQuote.id,
        signer_name: updatedQuote.signer_name ?? undefined,
        signature_image: updatedQuote.signature_image,
        hash: updatedQuote.signature_hash ?? 'Voir le certificat pour l\'empreinte complète',
        timestamp: updatedQuote.signature_timestamp ?? new Date().toISOString(),
        certificate_url: null,
        verification_url: updatedQuote.signature_verification_url ?? `${window.location.origin}/signatures/${updatedQuote.id}/verify`,
        qr_code: null,
      });
    } catch (err: any) {
      setError(err?.response?.data?.error?.message || 'Erreur lors de la signature. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  }, [quoteId, quote, signerName, signerEmail, signatureImage]);

  const handleDecline = useCallback(async () => {
    if (!quoteId || !declineReason.trim()) return;

    setIsSubmitting(true);
    setError(null);
    try {
      const updatedQuote = await declinePublicQuote(quoteId, {
        reason: declineReason.trim(),
      });
      setQuote(updatedQuote);
      setViewState('declined');
    } catch (err: any) {
      setError(err?.response?.data?.error?.message || 'Erreur lors du refus. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  }, [quoteId, declineReason]);

  return {
    viewState,
    quote,
    error,
    setError,
    signerName,
    setSignerName,
    signerEmail,
    setSignerEmail,
    signatureImage,
    setSignatureImage,
    declineReason,
    setDeclineReason,
    isSubmitting,
    signatureResult,
    handleSign,
    handleDecline,
  };
}
