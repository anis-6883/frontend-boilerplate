"use client";
import { ActionIcon, Box } from "@mantine/core";
import { useDeletePrayerMutation, useGetPrayersQuery } from "@/features/prayer/prayerApi";
import { MRT_PaginationState, type MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import { routes } from "@/config/routes";
import CustomTable from "../../../../../components/ui/CustomTable";
import { LOADING_DATA } from "@/config/constants";
import { IPrayer } from "@/types";

export default function PrayerTable() {
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10
  });
  const [query, setQuery] = useState({});
  const { isLoading, data: prayerData } = useGetPrayersQuery({
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
    ...(query && { ...query })
  });

  const [deletePrayer] = useDeletePrayerMutation();

  const data: IPrayer[] = prayerData?.data?.docs ? prayerData?.data?.docs : [];

  const modifiedData = data.map((item) => ({
    ...item,
    description: item?.description?.replace(/<[^>]+>/g, "")
  }));

  const columns = useMemo<MRT_ColumnDef<IPrayer>[]>(
    () => [
      {
        accessorFn: (originalRow) => originalRow.email,
        id: "email",
        header: "Email"
      },
      {
        accessorFn: (originalRow) => originalRow.title,
        id: "title",
        header: "Title"
      },
      {
        accessorFn: (originalRow) => originalRow.description,
        id: "description",
        header: "Description"
      }
    ],
    []
  );

  return (
    <CustomTable<IPrayer>
      columns={columns as []}
      isLoading={isLoading}
      data={isLoading ? LOADING_DATA : modifiedData}
      pagination={pagination}
      setPagination={setPagination}
      totalDocs={prayerData?.data?.totalDocs}
      deleteRow={deletePrayer as any}
      editRow={routes?.admin?.prayer?.edit}
      setQuery={setQuery}
      // rowActions={({ row }: any) => (
      //   <Box sx={{ display: "flex", flexWrap: "nowrap", gap: "8px" }}>
      //     <ActionIcon>Hello</ActionIcon>
      //   </Box>
      // )}
    />
  );
}
