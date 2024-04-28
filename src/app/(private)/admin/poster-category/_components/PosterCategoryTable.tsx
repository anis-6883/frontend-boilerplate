"use client";
import { type MRT_ColumnDef, MRT_PaginationState } from "mantine-react-table";
import { useMemo, useState } from "react";

import { routes } from "@/config/routes";
import CustomTable from "../../../../../components/ui/CustomTable";
import { LOADING_DATA } from "@/config/constants";
import { useDeletePosterCategoryMutation, useGetPosterCategoriesQuery } from "@/features/poster/posterCategoryApi";
import { IPosterCategory } from "@/types";

export default function PosterCategoryTable() {
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10
  });
  const [query, setQuery] = useState({});
  const { isLoading, data: posterCategoryData } = useGetPosterCategoriesQuery({
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
    ...(query && { ...query })
  });

  const [deletePosterCategory] = useDeletePosterCategoryMutation();

  const data: IPosterCategory[] = posterCategoryData?.data?.docs ? posterCategoryData?.data?.docs : [];

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
      totalDocs={posterCategoryData?.data?.totalDocs}
      deleteRow={deletePosterCategory as any}
      editRow={routes?.admin?.posterCategory?.edit}
      setQuery={setQuery}
      searchField='name'
    />
  );
}
