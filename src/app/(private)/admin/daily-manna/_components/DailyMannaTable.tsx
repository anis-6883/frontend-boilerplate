"use client";
import { useDeleteDailyMannaMutation, useGetDailyMannasQuery } from "@/features/daily-manna/dailyMannaApi";
import { type MRT_ColumnDef, MRT_PaginationState } from "mantine-react-table";
import { useMemo, useState } from "react";

import { routes } from "@/config/routes";
import dayjs from "dayjs";
import CustomTable from "../../../../../components/ui/CustomTable";
import { LOADING_DATA } from "@/config/constants";

interface DailyManna {
  title: string;
  description: string;
  date: string;
}

export default function DailyMannaTable() {
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10
  });

  const [query, setQuery] = useState({});

  const { isLoading, data: mannaData } = useGetDailyMannasQuery({
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
    ...(query && { ...query })
  });

  const [deleteDailyManna] = useDeleteDailyMannaMutation();

  const data: DailyManna[] = mannaData?.data?.docs ? mannaData?.data?.docs : [];

  const modifiedData = data.map((item) => ({
    ...item,
    description: item?.description?.replace(/<[^>]+>/g, ""),
    date: dayjs(dayjs(item.date, "DD/MM/YYYY").toISOString()).format("DD/MM/YYYY")
  }));

  const columns = useMemo<MRT_ColumnDef<DailyManna>[]>(
    () => [
      {
        accessorFn: (originalRow) => originalRow.title,
        id: "title",
        header: "Title"
      },
      {
        accessorFn: (originalRow) => originalRow.description,
        id: "description",
        header: "Description"
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
    <CustomTable<DailyManna>
      columns={columns as []}
      isLoading={isLoading}
      data={isLoading ? LOADING_DATA : modifiedData}
      pagination={pagination}
      setPagination={setPagination}
      totalDocs={mannaData?.data?.totalDocs}
      deleteRow={deleteDailyManna as any}
      editRow={routes?.admin?.dailyManna?.edit}
      setQuery={setQuery}
    />
  );
}
