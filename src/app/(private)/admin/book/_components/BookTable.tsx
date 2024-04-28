"use client";

import { type MRT_ColumnDef, MRT_PaginationState } from "mantine-react-table";
import { useMemo, useState } from "react";
import { routes } from "@/config/routes";
import CustomTable from "../../../../../components/ui/CustomTable";
import { LOADING_DATA } from "@/config/constants";
import { useDeleteBookMutation, useGetBooksQuery } from "@/features/book/bookApi";
import { IBook } from "@/types";

export default function BookTable() {
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10
  });
  const [query, setQuery] = useState({});
  const { isLoading, data: bookData } = useGetBooksQuery({
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
    ...(query && { ...query })
  });

  const [deleteLanguage] = useDeleteBookMutation();

  const data: IBook[] = bookData?.data?.docs ? bookData?.data?.docs : bookData?.data;

  const columns = useMemo<MRT_ColumnDef<IBook>[]>(
    () => [
      {
        accessorFn: (originalRow) => originalRow.name,
        id: "name",
        header: "Name"
      },
      {
        accessorFn: (originalRow) => originalRow.numberOfChapters,
        id: "numberOfChapters",
        header: "Chapters"
      },
      {
        accessorFn: (originalRow) => originalRow.type,
        id: "type",
        header: "Type"
      }
    ],
    []
  );

  return (
    <CustomTable<IBook>
      columns={columns as []}
      isLoading={isLoading}
      data={isLoading ? LOADING_DATA : data}
      pagination={pagination}
      setPagination={setPagination}
      totalDocs={bookData?.data?.totalDocs}
      deleteRow={deleteLanguage as any}
      editRow={routes?.admin?.book?.edit}
      setQuery={setQuery}
    />
  );
}
