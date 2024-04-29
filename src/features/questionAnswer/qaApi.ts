import { apiSlice } from "@/features/api/apiSlice";
import { IQa } from "@/types";
import hotToast from "@/utils/hotToast";
import { addQa, deleteQa, setValue, updateQa } from "./qaReducer";

const qaApi = apiSlice.injectEndpoints({
  // @ts-ignore
  overrideExisting: module.hot?.status() === "apply",
  endpoints: (builder) => ({
    getQas: builder.query({
      query: (queries) => {
        const values = Object.values(queries);
        if (values.length) return `/qa/all?${new URLSearchParams(queries)}`;
        return "/qa/all";
      },
      providesTags: ["qa"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const {
            data: { data }
          } = await queryFulfilled;
          if (data.docs) {
            const { docs, ...rest } = data;
            dispatch(setValue({ target: "qas", value: docs }));
            dispatch(setValue({ target: "pagination", value: rest }));
            return;
          }
          dispatch(setValue({ target: "qas", value: data }));
        } catch (err) {
          console.log(err);
        }
      }
    }),
    getSingleQa: builder.query({
      query: (id) => `/qa/${id}`
    }),
    createQa: builder.mutation<{ data: { newQa: IQa; status: boolean; message: string } }, IQa>({
      query: (data) => {
        return {
          url: "/qa/create",
          method: "POST",
          body: data
        };
      },
      invalidatesTags: ["qa"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const {
            data: { data }
          } = await queryFulfilled;
          dispatch(addQa(data.newQa));
          hotToast("success", "Added");
        } catch (err) {
          console.log(err);
          hotToast("error", "Error adding");
        }
      }
    }),
    updateQa: builder.mutation<{ data: { updatedQa: IQa; status: boolean; message: string } }, {}>({
      query: ({ data, id }: { id: string; data: IQa }) => {
        return {
          url: `/qa/update/${id}`,
          method: "PUT",
          body: data
        };
      },
      invalidatesTags: ["qa"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const {
            data: { data }
          } = await queryFulfilled;
          dispatch(updateQa(data.updatedQa));
          hotToast("success", "Updated");
        } catch (err) {
          console.log(err);
          hotToast("error", "Error updating");
        }
      }
    }),
    deleteQa: builder.mutation<{ data: { deletedQa: IQa; status: boolean; message: string } }, IQa>({
      query: (id) => {
        return {
          url: `/qa/delete/${id}`,
          method: "DELETE"
        };
      },
      invalidatesTags: ["qa"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const {
            data: { data }
          } = await queryFulfilled;
          dispatch(deleteQa({ id: data.deletedQa.id! }));
          hotToast("success", "Deleted");
        } catch (err) {
          console.log(err);
          hotToast("error", "Error Deleting");
        }
      }
    })
  })
});

export const { useGetQasQuery, useCreateQaMutation, useGetSingleQaQuery, useUpdateQaMutation, useDeleteQaMutation } = qaApi;
