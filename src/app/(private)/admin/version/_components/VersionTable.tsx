"use client";

import { type MRT_ColumnDef, MRT_PaginationState } from "mantine-react-table";
import { useMemo, useState } from "react";
import { routes } from "@/config/routes";
import CustomTable from "../../../../../components/ui/CustomTable";
import { LOADING_DATA } from "@/config/constants";
import { IVersion } from "@/types";
import { useDeleteVersionMutation, useGetVersionsQuery } from "@/features/version/versionApi";

export default function VersionTable() {
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10
  });
  const [query, setQuery] = useState({});
  const { isLoading, data: versionData } = useGetVersionsQuery({
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
    ...(query && { ...query })
  });

  const [deleteVersion] = useDeleteVersionMutation();

  const data: IVersion[] = versionData?.data?.docs ? versionData?.data?.docs : [];

  const columns = useMemo<MRT_ColumnDef<IVersion>[]>(
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
      },
      {
        accessorFn: (originalRow) => originalRow.language?.name,
        id: "language",
        header: "Language"
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
    <CustomTable<IVersion>
      columns={columns as []}
      isLoading={isLoading}
      data={isLoading ? LOADING_DATA : data}
      pagination={pagination}
      setPagination={setPagination}
      totalDocs={versionData?.data?.totalDocs}
      deleteRow={deleteVersion as any}
      editRow={routes?.admin?.version?.edit}
      setQuery={setQuery}
      searchField='name'
    />
  );
}
