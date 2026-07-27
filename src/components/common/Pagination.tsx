import type { PaginationMeta } from '../../types';

interface PaginationProps {
  meta: PaginationMeta | null;
  onPageChange: (page: number) => void;
}

export default function Pagination({ meta, onPageChange }: PaginationProps) {
  if (!meta || meta.total_pages <= 1) return null;

  return (
    <div className="flex items-center justify-between pt-4">
      <p className="text-sm text-gray-500">
        Page {meta.page} sur {meta.total_pages} — {meta.total} résultat{meta.total > 1 ? 's' : ''}
      </p>
      <div className="flex gap-2">
        <button
          className="px-3 py-1.5 text-sm font-medium rounded-md border border-gray-300 text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50"
          disabled={meta.page <= 1}
          onClick={() => onPageChange(meta.page - 1)}
        >
          Précédent
        </button>
        <button
          className="px-3 py-1.5 text-sm font-medium rounded-md border border-gray-300 text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50"
          disabled={meta.page >= meta.total_pages}
          onClick={() => onPageChange(meta.page + 1)}
        >
          Suivant
        </button>
      </div>
    </div>
  );
}
