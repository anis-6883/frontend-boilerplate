"use client";
import { useDeleteDailyMannaMutation, useGetDailyMannasQuery } from "@/features/daily-manna/dailyMannaApi";
import { type MRT_ColumnDef, MRT_PaginationState } from "mantine-react-table";
import { useMemo, useState } from "react";

import { routes } from "@/config/routes";
import dayjs from "dayjs";
import CustomTable from "../../../../../components/ui/CustomTable";
import { LOADING_DATA } from "@/config/constants";
import { useDeleteDailyVerseMutation, useGetDailyVersesQuery } from "@/features/daily-verse/dailyVerseApi";
import { IDailyVerse } from "@/types";

export default function DailyVerseTable() {
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10
  });

  const [query, setQuery] = useState({});

  const { isLoading, data: mannaData } = useGetDailyVersesQuery({
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
    sortBy: "date:desc",
    ...(query && { ...query })
  });

  const [deleteDailyVerse] = useDeleteDailyVerseMutation();

  const data: IDailyVerse[] = mannaData?.data?.docs ? mannaData?.data?.docs : mannaData?.data;

  const modifiedData = data.map((item) => ({
    ...item,
    content: item?.content?.replace(/<[^>]+>/g, ""),
    date: dayjs(dayjs(item.date, "DD/MM/YYYY").toISOString()).format("DD/MM/YYYY")
  }));

  const columns = useMemo<MRT_ColumnDef<IDailyVerse>[]>(
    () => [
      {
        accessorFn: (originalRow) => originalRow.content,
        id: "content",
        header: "Content"
      },
      {
        accessorFn: (originalRow) => originalRow.date,
        id: "date",
        header: "Date"
      }
    ],
    []
  );

  return (
    <CustomTable<IDailyVerse>
      columns={columns as []}
      isLoading={isLoading}
      data={isLoading ? LOADING_DATA : modifiedData}
      pagination={pagination}
      setPagination={setPagination}
      totalDocs={mannaData?.data?.totalDocs}
      deleteRow={deleteDailyVerse as any}
      editRow={routes?.admin?.dailyManna?.edit}
      setQuery={setQuery}
    />
  );
}
