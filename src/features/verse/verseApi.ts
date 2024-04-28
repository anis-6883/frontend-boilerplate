import { apiSlice } from "@/features/api/apiSlice";
import { IVerse } from "@/types";
import hitToast from "@/utils/hitToast";
import { addVerse, deleteVerse, setValue, updateVerse } from "./verseReducer";

const verseApi = apiSlice.injectEndpoints({
  // @ts-ignore
  overrideExisting: module.hot?.status() === "apply",
  endpoints: (builder) => ({
    getVerses: builder.query({
      query: (queries) => {
        const values = Object.values(queries);
        if (values.length) return `/verse/all?${new URLSearchParams(queries)}`;
        return "/verse/all";
      },
      providesTags: ["verse"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const {
            data: { data }
          } = await queryFulfilled;
          if (data.docs) {
            const { docs, ...rest } = data;
            dispatch(setValue({ target: "verses", value: docs }));
            dispatch(setValue({ target: "pagination", value: rest }));
            return;
          }
          dispatch(setValue({ target: "verses", value: data }));
        } catch (err) {
          console.log(err);
        }
      }
    }),
    getSingleVerse: builder.query({
      query: (id) => `/verse/${id}`
    }),
    createVerse: builder.mutation<{ data: { newVerse: IVerse; status: boolean; message: string } }, IVerse>({
      query: (data) => {
        return {
          url: "/verse/create",
          method: "POST",
          body: data
        };
      },
      invalidatesTags: ["verse"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const {
            data: { data }
          } = await queryFulfilled;
          dispatch(addVerse(data.newVerse));
          hitToast("success", "Added");
        } catch (err) {
          console.log(err);
          hitToast("error", "Error adding");
        }
      }
    }),
    updateVerse: builder.mutation<{ data: { updatedVerse: IVerse; status: boolean; message: string } }, {}>({
      query: ({ id, data }: { id: string; data: IVerse }) => {
        return {
          url: `/verse/update/${id}`,
          method: "PUT",
          body: data
        };
      },
      invalidatesTags: ["verse"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const {
            data: { data }
          } = await queryFulfilled;
          dispatch(updateVerse(data.updatedVerse));
          hitToast("success", "Updated");
        } catch (err) {
          console.log(err);
          hitToast("error", "Error updating");
        }
      }
    }),
    deleteVerse: builder.mutation<{ data: { deletedVerse: IVerse; status: boolean; message: string } }, IVerse>({
      query: (id) => {
        return {
          url: `/verse/delete/${id}`,
          method: "DELETE"
        };
      },
      invalidatesTags: ["verse"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const {
            data: { data }
          } = await queryFulfilled;
          dispatch(deleteVerse({ id: data.deletedVerse.id! }));
          hitToast("success", "Deleted");
        } catch (err) {
          console.log(err);
          hitToast("error", "Error Deleting");
        }
      }
    })
  })
});

export const { useGetVersesQuery, useCreateVerseMutation, useGetSingleVerseQuery, useUpdateVerseMutation, useDeleteVerseMutation } =
  verseApi;
