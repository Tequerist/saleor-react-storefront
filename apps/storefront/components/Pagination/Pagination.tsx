import { useIntl } from "react-intl";

import { PageInfo } from "@/saleor/api";

import { messages } from "../translations";

export interface PaginationProps {
  pageInfo?: PageInfo;
  onLoadMore: () => void;
  totalCount?: number;
  itemsCount?: number;
}

export function Pagination({ pageInfo, onLoadMore, itemsCount, totalCount }: PaginationProps) {
  const t = useIntl();
  if (!pageInfo || !pageInfo?.hasNextPage) {
    return null;
  }

  return (
    <nav className="mt-8 p-4 ">
      <div className="flex justify-center flex-col items-center">
        <button
          type="button"
          onClick={onLoadMore}
          className="bg-white relative inline-flex rounded-3xl items-center px-8 py-3 border text-base font-medium text-gray-700 hover:border-gray-700  cursor-pointer"
        >
          {t.formatMessage(messages.loadMoreButton)}
        </button>
        {itemsCount && totalCount && (
          <div className="text-sm text-gray-500 mt-2">
            {t.formatMessage(messages.paginationProductCounter, {
              totalItemsCount: totalCount,
              currentItemsCount: itemsCount,
            })}
          </div>
        )}
      </div>
    </nav>
  );
}
