"use client";
import { useDeleteVideoCategoryMutation, useGetvideoCategorysQuery } from "@/features/video/videoCategoryApi";
import { type MRT_ColumnDef, MRT_PaginationState } from "mantine-react-table";
import { useMemo, useState } from "react";

import { routes } from "@/config/routes";
import CustomTable from "../../../../../components/ui/CustomTable";
import { LOADING_DATA } from "@/config/constants";

interface VideoCategory {
  name: string;
  status: string;
}

export default function VideoCategoryTable() {
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10
  });
  const [query, setQuery] = useState({});
  const { isLoading, data: videoCategoryData } = useGetvideoCategorysQuery({
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
    ...(query && { ...query })
  });

  const [deleteVideoCategory] = useDeleteVideoCategoryMutation();

  const data: VideoCategory[] = videoCategoryData?.data?.docs ? videoCategoryData?.data?.docs : [];

  const columns = useMemo<MRT_ColumnDef<VideoCategory>[]>(
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
    <CustomTable<VideoCategory>
      columns={columns as []}
      isLoading={isLoading}
      data={isLoading ? LOADING_DATA : data}
      pagination={pagination}
      setPagination={setPagination}
      totalDocs={videoCategoryData?.data?.totalDocs}
      deleteRow={deleteVideoCategory as any}
      editRow={routes?.admin?.videoCategory?.edit}
      setQuery={setQuery}
    />
  );
}
