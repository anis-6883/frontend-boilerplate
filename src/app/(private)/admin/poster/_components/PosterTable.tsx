"use client";

import { type MRT_ColumnDef, MRT_PaginationState } from "mantine-react-table";
import { useMemo, useState } from "react";
import { routes } from "@/config/routes";
import CustomTable from "../../../../../components/ui/CustomTable";
import { LOADING_DATA } from "@/config/constants";
import { useDeletePosterMutation, useGetPostersQuery } from "@/features/poster/posterApi";
import { IPoster } from "@/types";

export default function PosterTable() {
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10
  });
  const [query, setQuery] = useState({});
  const { isLoading, data: posterData } = useGetPostersQuery({
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
    ...(query && { ...query })
  });

  const [deleteSong] = useDeletePosterMutation();

  const data: IPoster[] = posterData?.data?.docs ? posterData?.data?.docs : [];

  const columns = useMemo<MRT_ColumnDef<IPoster>[]>(
    () => [
      {
        accessorFn: (originalRow) => originalRow.title,
        id: "title",
        header: "Title"
      },
      {
        accessorFn: (originalRow) => originalRow.image,
        id: "image",
        header: "Image",
        Cell: ({ cell }) => <img width={100} height={100} src={cell.getValue() as string} alt='image' />
      },
      {
        accessorFn: (originalRow) => originalRow.description,
        id: "description",
        header: "Description"
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
    <CustomTable<IPoster>
      columns={columns as []}
      isLoading={isLoading}
      data={isLoading ? LOADING_DATA : data}
      pagination={pagination}
      setPagination={setPagination}
      totalDocs={posterData?.data?.totalDocs}
      deleteRow={deleteSong as any}
      editRow={routes?.admin?.poster?.edit}
      setQuery={setQuery}
      searchField='title'
    />
  );
}
