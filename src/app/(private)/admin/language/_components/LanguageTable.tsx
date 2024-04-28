"use client";
import { useDeleteLanguageMutation, useGetLanguagesQuery } from "@/features/language/languageApi";
import { type MRT_ColumnDef, MRT_PaginationState } from "mantine-react-table";
import { useMemo, useState } from "react";

import { routes } from "@/config/routes";
import CustomTable from "../../../../../components/ui/CustomTable";
import { LOADING_DATA } from "@/config/constants";

interface Language {
  name: string;
  nameLocal: string;
}

export default function LanguageTable() {
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10
  });
  const [query, setQuery] = useState({});
  const { isLoading, data: languageData } = useGetLanguagesQuery({
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
    ...(query && { ...query })
  });

  const [deleteLanguage] = useDeleteLanguageMutation();

  const data: Language[] = languageData?.data?.docs ? languageData?.data?.docs : [];

  const columns = useMemo<MRT_ColumnDef<Language>[]>(
    () => [
      {
        accessorFn: (originalRow) => originalRow.name,
        id: "name",
        header: "Name"
      },
      {
        accessorFn: (originalRow) => originalRow.nameLocal,
        id: "nameLocal",
        header: "Local Name"
      }
    ],
    []
  );

  return (
    <CustomTable<Language>
      columns={columns as []}
      isLoading={isLoading}
      data={isLoading ? LOADING_DATA : data}
      pagination={pagination}
      setPagination={setPagination}
      totalDocs={languageData?.data?.totalDocs}
      deleteRow={deleteLanguage as any}
      editRow={routes?.admin?.language?.edit}
      setQuery={setQuery}
    />
  );
}
