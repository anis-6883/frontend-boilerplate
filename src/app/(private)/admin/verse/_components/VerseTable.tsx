"use client";

import { type MRT_ColumnDef, MRT_PaginationState } from "mantine-react-table";
import { useMemo, useState } from "react";
import { routes } from "@/config/routes";
import CustomTable from "../../../../../components/ui/CustomTable";
import { LOADING_DATA } from "@/config/constants";
import { useDeleteVerseMutation, useGetVersesQuery } from "@/features/verse/verseApi";
import { IVerse } from "@/types";

export default function VerseTable() {
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10
  });
  const [query, setQuery] = useState({});
  const { isLoading, data: verseData } = useGetVersesQuery({
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
    ...(query && { ...query })
  });

  const [deleteVerse] = useDeleteVerseMutation();

  const data: IVerse[] = verseData?.data?.docs ? verseData?.data?.docs : verseData?.data;

  const columns = useMemo<MRT_ColumnDef<IVerse>[]>(
    () => [
      {
        accessorFn: (originalRow) => originalRow.version?.name,
        id: "bible",
        header: "Bible"
      },
      {
        accessorFn: (originalRow) => originalRow.content,
        id: "verse",
        header: "Verse"
      },
    ],
    []
  );

  return (
    <CustomTable<IVerse>
      columns={columns as []}
      isLoading={isLoading}
      data={isLoading ? LOADING_DATA : data}
      pagination={pagination}
      setPagination={setPagination}
      totalDocs={verseData?.data?.totalDocs}
      deleteRow={deleteVerse as any}
      editRow={routes?.admin?.verse?.edit}
      setQuery={setQuery}
      searchField="content"
    />
  );
}
