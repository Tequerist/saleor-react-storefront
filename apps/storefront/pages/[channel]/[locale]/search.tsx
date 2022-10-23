import { useQueryState } from "next-usequerystate";
import React, { ReactElement } from "react";
import { useIntl } from "react-intl";
import { useDebounce } from "react-use";

import { Layout, ProductCollection } from "@/components";
import { messages } from "@/components/translations";
import { ProductFilterInput } from "@/saleor/api";
import SearchIcon from "./account/searchIcon.svg";

function SearchPage() {
  const t = useIntl();
  const [searchQuery, setSearchQuery] = useQueryState("q");
  const [debouncedFilter, setDebouncedFilter] = React.useState<ProductFilterInput>({});

  useDebounce(
    () => {
      if (searchQuery) {
        setDebouncedFilter({ search: searchQuery });
      } else {
        setDebouncedFilter({});
      }
    },
    1000,
    [searchQuery]
  );

  return (
    <main className="container w-full px-8 mt-5">
      <p className="font-semibold text-[20px] mb-4 mt-4">
        {t.formatMessage(messages.searchHeader)}
      </p>
      <div className="flex items-center md:w-1/2 lg:w-1/2 mb-12 !border-gray-300 rounded-3xl border px-4">
        <SearchIcon />
        <input
          className="w-full ml-1 focus:border-0 focus:outline-0 focus:ring-transparent md:w-96 block border-0 text-[14px] text-md py-4 px-3 rounded-3xl"
          type="text"
          value={searchQuery || ""}
          placeholder={t.formatMessage(messages.searchFieldPlaceholder)}
          onChange={(e) => setSearchQuery(e.target.value, { scroll: false, shallow: true })}
          data-testid="searchInput"
        />
      </div>
      <ProductCollection filter={debouncedFilter} />
    </main>
  );
}

SearchPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default SearchPage;
