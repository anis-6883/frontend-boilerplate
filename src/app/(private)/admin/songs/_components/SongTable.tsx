"use client";
import { useDeleteSongMutation, useGetSongsQuery } from "@/features/song/songApi";
import { type MRT_ColumnDef, MRT_PaginationState } from "mantine-react-table";
import { useMemo, useState } from "react";
import { routes } from "@/config/routes";
import CustomTable from "../../../../../components/ui/CustomTable";
import { LOADING_DATA } from "@/config/constants";

interface Song {
  bookName: string;
  songTitle: string;
  lyrics: string;
}

export default function SongTable() {
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10
  });
  const [query, setQuery] = useState({});
  const { isLoading, data: songData } = useGetSongsQuery({
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
    ...(query && { ...query })
  });

  const [deleteSong] = useDeleteSongMutation();

  const data: Song[] = songData?.data?.docs ? songData.data.docs : songData?.data;

  const columns = useMemo<MRT_ColumnDef<Song>[]>(
    () => [
      {
        accessorFn: (originalRow) => originalRow.songTitle,
        id: "songTitle",
        header: "SongTitle"
      },
      {
        accessorFn: (originalRow) => <p dangerouslySetInnerHTML={{ __html: originalRow.lyrics }}></p>,
        id: "lyrics",
        header: "Lyrics"
      }
    ],
    []
  );

  return (
    <CustomTable<Song>
      columns={columns as []}
      isLoading={isLoading}
      data={isLoading ? LOADING_DATA : data}
      pagination={pagination}
      setPagination={setPagination}
      totalDocs={songData?.data?.totalDocs}
      deleteRow={deleteSong as any}
      editRow={routes?.admin?.song?.edit}
      setQuery={setQuery}
      searchField='songTitle'
    />
  );
}
