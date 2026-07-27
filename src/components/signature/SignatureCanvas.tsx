import React, { useRef, useEffect, useState, useCallback } from 'react';

interface SignatureCanvasProps {
  onSave: (dataUrl: string) => void;
  onClear: () => void;
  disabled?: boolean;
}

export default function SignatureCanvas({ onSave, onClear, disabled = false }: SignatureCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasContent, setHasContent] = useState(false);
  const [hasSigned, setHasSigned] = useState(false);

  const getCanvasContext = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    return canvas.getContext('2d');
  }, []);

  const getCoordinates = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    const xScale = canvas.width / rect.width;
    const yScale = canvas.height / rect.height;

    if ('touches' in e) {
      const touch = e.touches[0] || e.changedTouches[0];
      return {
        x: (touch.clientX - rect.left) * xScale,
        y: (touch.clientY - rect.top) * yScale,
      };
    }

    return {
      x: (e.clientX - rect.left) * xScale,
      y: (e.clientY - rect.top) * yScale,
    };
  }, []);

  const startDrawing = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (disabled || hasSigned) return;
    e.preventDefault();
    const ctx = getCanvasContext();
    const coords = getCoordinates(e);
    if (!ctx) return;

    ctx.beginPath();
    ctx.moveTo(coords.x, coords.y);
    setIsDrawing(true);
    setHasContent(true);
  }, [disabled, hasSigned, getCanvasContext, getCoordinates]);

  const draw = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing || disabled || hasSigned) return;
    e.preventDefault();
    const ctx = getCanvasContext();
    const coords = getCoordinates(e);
    if (!ctx) return;

    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = '#1f2937';
    ctx.lineTo(coords.x, coords.y);
    ctx.stroke();
  }, [isDrawing, disabled, hasSigned, getCanvasContext, getCoordinates]);

  const stopDrawing = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    e.preventDefault();
    setIsDrawing(false);
    const ctx = getCanvasContext();
    if (ctx) ctx.closePath();
  }, [isDrawing, getCanvasContext]);

  const handleSave = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL('image/png');
    setHasSigned(true);
    onSave(dataUrl);
  }, [onSave]);

  const handleClear = useCallback(() => {
    const ctx = getCanvasContext();
    const canvas = canvasRef.current;
    if (!ctx || !canvas) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasContent(false);
    setHasSigned(false);
    onClear();
  }, [getCanvasContext, onClear]);

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * (window.devicePixelRatio || 1);
    canvas.height = rect.height * (window.devicePixelRatio || 1);

    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.strokeStyle = '#1f2937';
    }
  }, []);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas || hasContent) return;

      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * (window.devicePixelRatio || 1);
      canvas.height = rect.height * (window.devicePixelRatio || 1);

      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.strokeStyle = '#1f2937';
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [hasContent]);

  return (
    <div>
      {!hasSigned && (
        <p className="text-sm text-gray-500 mb-2">
          Signez en dessinant dans la zone ci-dessous avec votre souris ou votre doigt (sur écran tactile)
        </p>
      )}

      <div
        className={`w-full h-[200px] border-2 border-dashed border-gray-300 rounded-lg bg-white relative transition-colors ${
          disabled || hasSigned ? 'cursor-default' : 'cursor-crosshair focus-within:border-blue-500'
        }`}
      >
        <canvas
          ref={canvasRef}
          className="w-full h-full block"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />

        {!hasContent && !hasSigned && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none text-gray-400 text-sm">
            Dessinez votre signature ici
          </div>
        )}
      </div>

      <div className="flex gap-3 mt-3">
        {hasContent && !hasSigned && (
          <>
            <button
              type="button"
              className="px-4 py-2 border border-gray-300 text-gray-700 bg-white rounded-md text-sm font-semibold hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleClear}
              disabled={disabled}
            >
              Effacer
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleSave}
              disabled={disabled}
            >
              Confirmer la signature
            </button>
          </>
        )}

        {hasSigned && (
          <button
            type="button"
            className="px-4 py-2 border border-gray-300 text-gray-700 bg-white rounded-md text-sm font-semibold hover:bg-gray-50 transition-colors"
            onClick={handleClear}
          >
            Re-signer
          </button>
        )}
      </div>
    </div>
  );
}
