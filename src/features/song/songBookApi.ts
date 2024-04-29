import { apiSlice } from "@/features/api/apiSlice";
import { ISongBook } from "@/types";
import hotToast from "@/utils/hotToast";
import { addSongBook, deleteSongBook, setValue, updateSongBook } from "./songBookReducer";

const songBookApi = apiSlice.injectEndpoints({
  // @ts-ignore
  overrideExisting: module.hot?.status() === "apply",
  endpoints: (builder) => ({
    getSongBooks: builder.query({
      query: (queries) => {
        const values = Object.values(queries);
        if (values.length) return `/song-book/all?${new URLSearchParams(queries)}`;
        return "/song-book/all";
      },
      providesTags: ["songBook"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const {
            data: { data }
          } = await queryFulfilled;
          if (data.docs) {
            const { docs, ...rest } = data;
            dispatch(setValue({ target: "songBooks", value: docs }));
            dispatch(setValue({ target: "pagination", value: rest }));
            return;
          }
          dispatch(setValue({ target: "songBooks", value: data }));
        } catch (err) {
          console.log(err);
        }
      }
    }),
    getSingleSongBook: builder.query({
      query: (id) => `/song-book/${id}`
    }),
    createSongBook: builder.mutation<{ data: { newSongBook: ISongBook; status: boolean; message: string } }, ISongBook>({
      query: (data) => {
        return {
          url: "/song-book/create",
          method: "POST",
          body: data
        };
      },
      invalidatesTags: ["songBook"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const {
            data: { data }
          } = await queryFulfilled;
          dispatch(addSongBook(data.newSongBook));
          hotToast("success", "Added");
        } catch (err) {
          console.log(err);
          hotToast("error", "Error adding");
        }
      }
    }),
    updateSongBook: builder.mutation<{ data: { updatedSongBook: ISongBook; status: boolean; message: string } }, {}>({
      query: ({ id, data }: { id: string; data: ISongBook }) => {
        return {
          url: `/song-book/update/${id}`,
          method: "PUT",
          body: data
        };
      },
      invalidatesTags: ["songBook"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const {
            data: { data }
          } = await queryFulfilled;
          dispatch(updateSongBook(data.updatedSongBook));
          hotToast("success", "Updated");
        } catch (err) {
          console.log(err);
          hotToast("error", "Error updating");
        }
      }
    }),
    deleteSongBook: builder.mutation<{ data: { deletedSongBook: ISongBook; status: boolean; message: string } }, ISongBook>({
      query: (id) => {
        return {
          url: `/song-book/delete/${id}`,
          method: "DELETE"
        };
      },
      invalidatesTags: ["songBook"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const {
            data: { data }
          } = await queryFulfilled;
          dispatch(deleteSongBook({ id: data.deletedSongBook.id! }));
          hotToast("success", "Deleted");
        } catch (err) {
          console.log(err);
          hotToast("error", "Error Deleting");
        }
      }
    })
  })
});

export const {
  useGetSongBooksQuery,
  useCreateSongBookMutation,
  useGetSingleSongBookQuery,
  useUpdateSongBookMutation,
  useDeleteSongBookMutation
} = songBookApi;
