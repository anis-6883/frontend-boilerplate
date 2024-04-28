"use client";
import { type MRT_ColumnDef, MRT_PaginationState } from "mantine-react-table";
import { useMemo, useState } from "react";

import { routes } from "@/config/routes";
import CustomTable from "../../../../../components/ui/CustomTable";
import { LOADING_DATA } from "@/config/constants";
import { IPosterCategory, IQaCategory } from "@/types";
import { useDeleteQaCategoryMutation, useGetQaCategoriesQuery } from "@/features/questionAnswer/qaCategoryApi";

export default function QaCategoryTable() {
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10
  });
  const [query, setQuery] = useState({});
  const { isLoading, data: qaCategoryData } = useGetQaCategoriesQuery({
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
    ...(query && { ...query })
  });

  const [deleteQaCategory] = useDeleteQaCategoryMutation();

  const data: IQaCategory[] = qaCategoryData?.data?.docs ? qaCategoryData?.data?.docs : [];

  const columns = useMemo<MRT_ColumnDef<IPosterCategory>[]>(
    () => [
      {
        accessorFn: (originalRow) => originalRow.name,
        id: "name",
        header: "Name"
      },
      {
        accessorFn: (originalRow) => (originalRow.status === "1" ? "Active" : "Inactive"),
        id: "status",
        header: "Status"
      }
    ],
    []
  );

  return (
    <CustomTable<IPosterCategory>
      columns={columns as []}
      isLoading={isLoading}
      data={isLoading ? LOADING_DATA : data}
      pagination={pagination}
      setPagination={setPagination}
      totalDocs={qaCategoryData?.data?.totalDocs}
      deleteRow={deleteQaCategory as any}
      editRow={routes?.admin?.questionAnswerCategory?.edit}
      setQuery={setQuery}
      searchField='name'
    />
  );
}
