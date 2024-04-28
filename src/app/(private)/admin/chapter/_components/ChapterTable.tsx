"use client";

import { type MRT_ColumnDef, MRT_PaginationState } from "mantine-react-table";
import { useMemo, useState } from "react";
import { routes } from "@/config/routes";
import CustomTable from "../../../../../components/ui/CustomTable";
import { LOADING_DATA } from "@/config/constants";
import { IChapter } from "@/types";
import { useDeleteChapterMutation, useGetChaptersQuery } from "@/features/chapter/chapterApi";


export default function ChapterTable() {
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10
  });
  const [query, setQuery] = useState({});
  const { isLoading, data: chapterData } = useGetChaptersQuery({
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
    ...(query && { ...query })
  });

  const [deleteChapter] = useDeleteChapterMutation();

  const data: IChapter[] = chapterData?.data?.docs ? chapterData?.data?.docs : chapterData?.data;

  const columns = useMemo<MRT_ColumnDef<IChapter>[]>(
    () => [
      {
        accessorFn: (originalRow) => originalRow.chapterId,
        id: "name",
        header: "Name"
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
    <CustomTable<IChapter>
      columns={columns as []}
      isLoading={isLoading}
      data={isLoading ? LOADING_DATA : data}
      pagination={pagination}
      setPagination={setPagination}
      totalDocs={chapterData?.data?.totalDocs}
      deleteRow={deleteChapter as any}
      editRow={routes?.admin?.chapter?.edit}
      setQuery={setQuery}
    />
  );
}
