import { apiSlice } from "@/features/api/apiSlice";
import { ISong } from "@/types";
import hotToast from "@/utils/hotToast";
import { deleteSong } from "./songReducer";

const songApi = apiSlice.injectEndpoints({
  // @ts-ignore
  overrideExisting: module.hot?.status() === "apply",
  endpoints: (builder) => ({
    getSongs: builder.query({
      query: (queries) => {
        const values = Object.values(queries);
        if (values.length) return `/song/all?${new URLSearchParams(queries)}`;
        return "/song/all";
      },
      providesTags: ["song"]
    }),
    getSingleSong: builder.query({
      query: (id) => `/song/${id}`
    }),
    createSong: builder.mutation<{ data: { newSong: ISong; status: boolean; message: string } }, ISong>({
      query: (data) => {
        return {
          url: "/song/create",
          method: "POST",
          body: data
        };
      },
      invalidatesTags: ["song"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const res: any = await queryFulfilled;
          console.log(res.status);
          hotToast("success", "Added");
        } catch (err) {
          console.log(err);
          hotToast("error", "Error adding");
        }
      }
    }),
    updateSong: builder.mutation<{ data: { updatedSongBook: ISong; status: boolean; message: string } }, {}>({
      query: ({ id, data }: { id: string; data: ISong }) => {
        return {
          url: `/song/update/${id}`,
          method: "PUT",
          body: data
        };
      },
      invalidatesTags: ["song"]
    }),
    deleteSong: builder.mutation<{ data: { deletedSong: ISong; status: boolean; message: string } }, ISong>({
      query: (id) => {
        return {
          url: `/song/delete/${id}`,
          method: "DELETE"
        };
      },
      invalidatesTags: ["song"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const {
            data: { data }
          } = await queryFulfilled;
          dispatch(deleteSong({ id: data.deletedSong.id! }));
          hotToast("success", "Deleted");
        } catch (err) {
          console.log(err);
          hotToast("error", "Error Deleting");
        }
      }
    })
  })
});

export const { useGetSongsQuery, useCreateSongMutation, useGetSingleSongQuery, useUpdateSongMutation, useDeleteSongMutation } = songApi;
