"use client";
import { useDeleteSongBookMutation, useGetSongBooksQuery } from "@/features/song/songBookApi";
import { type MRT_ColumnDef, MRT_PaginationState } from "mantine-react-table";
import { useMemo, useState } from "react";

import { routes } from "@/config/routes";
import CustomTable from "../../../../../components/ui/CustomTable";
import { LOADING_DATA } from "@/config/constants";

interface SongBook {
  name: string;
  image: string;
}

export default function SongBookTable() {
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10
  });
  const [query, setQuery] = useState({});
  const { isLoading, data: songBookData } = useGetSongBooksQuery({
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
    ...(query && { ...query })
  });

  const [deleteSongBook] = useDeleteSongBookMutation();

  const data: SongBook[] = songBookData?.data?.docs ? songBookData?.data?.docs : [];

  const columns = useMemo<MRT_ColumnDef<SongBook>[]>(
    () => [
      {
        accessorFn: (originalRow) => originalRow.name,
        id: "name",
        header: "Name"
      },
      {
        accessorFn: (originalRow) => originalRow.image,
        id: "image",
        header: "Image",
        Cell: ({ cell }) => <img width={100} height={100} src={cell.getValue() as string} alt='image' />
      }
    ],
    []
  );

  return (
    <CustomTable<SongBook>
      columns={columns as []}
      isLoading={isLoading}
      data={isLoading ? LOADING_DATA : data}
      pagination={pagination}
      setPagination={setPagination}
      totalDocs={songBookData?.data?.totalDocs}
      deleteRow={deleteSongBook as any}
      editRow={routes?.admin?.songBook?.edit}
      setQuery={setQuery}
      searchField='name'
    />
  );
}
