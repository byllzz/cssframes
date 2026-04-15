import { ArrowLeft, ArrowRight } from "lucide-react";

export default function Pagination({
  currentPage,
  totalPages,
  paginate,
}) {
  if (totalPages <= 1) return null;

  return (
    <nav className="mt-8 px-4 sm:px-6">
      <div className="mx-auto flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* PREV */}
        <div className="w-full sm:w-auto flex justify-start">
          {currentPage > 1 && (
            <button
              onClick={() => paginate(currentPage - 1)}
              className="group flex w-full sm:w-auto items-center justify-start gap-3 rounded-[8px] px-4 sm:px-16 py-4 sm:py-6 cursor-pointer text-zinc-300 bg-[#161616] transition-all"
            >
              <ArrowLeft size={22} className="group-hover:-translate-x-1 transition-transform" />
              <span className="text-base sm:text-lg font-semibold">Prev page</span>
            </button>
          )}
        </div>

        {/* CENTER */}
        <div className="text-center order-first sm:order-none">
          <p className="text-xs sm:text-sm font-medium text-zinc-500">Page</p>
          <p className="text-xl sm:text-2xl font-bold text-white">
            {currentPage} / {totalPages}
          </p>
        </div>

        {/* NEXT */}
        <div className="w-full sm:w-auto flex justify-end">
          {currentPage < totalPages && (
            <button
              onClick={() => paginate(currentPage + 1)}
              className="group flex w-full sm:w-auto items-center justify-end gap-3 rounded-[8px] px-4 sm:px-16 py-4 sm:py-6 cursor-pointer text-zinc-300 bg-[#161616] transition-all"
            >
              <span className="text-base sm:text-lg font-semibold">Next page</span>
              <ArrowRight size={22} />
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
