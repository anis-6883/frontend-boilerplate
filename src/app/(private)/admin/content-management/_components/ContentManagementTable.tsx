"use client";
import { LOADING_DATA } from "@/config/constants";
import { routes } from "@/config/routes";
import { useDeleteContentMutation, useGetContentsQuery } from "@/features/contentManagement/contentManagementApi";
import { MRT_PaginationState, type MRT_ColumnDef } from "mantine-react-table";
import { useMemo, useState } from "react";
import CustomTable from "../../../../../components/ui/CustomTable";

interface IContentManagement {
  title: string;
  content: string;
  status: string;
}

export default function ContentManagementTable() {
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10
  });

  const [query, setQuery] = useState({});

  const { isLoading, data: contentManagementData } = useGetContentsQuery({
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
    ...(query && { ...query })
  });

  const [deleteContent] = useDeleteContentMutation();

  const data: IContentManagement[] = contentManagementData?.data?.docs ? contentManagementData.data?.docs : [];

  const modifiedData = data.map((item) => ({
    ...item,
    content: item?.content?.replace(/<[^>]+>/g, "")
  }));

  const columns = useMemo<MRT_ColumnDef<IContentManagement>[]>(
    () => [
      {
        accessorFn: (originalRow) => originalRow.title,
        id: "title",
        header: "Title"
      },
      {
        accessorFn: (originalRow) => originalRow.content,
        id: "content",
        header: "Content"
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
    <CustomTable<IContentManagement>
      columns={columns as []}
      isLoading={isLoading}
      data={isLoading ? LOADING_DATA : modifiedData}
      pagination={pagination}
      setPagination={setPagination}
      totalDocs={contentManagementData?.data.totalDocs}
      deleteRow={deleteContent as any}
      editRow={routes?.admin?.contentManagement?.edit}
      setQuery={setQuery}
    />
  );
}
