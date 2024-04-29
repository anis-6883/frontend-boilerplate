import { apiSlice } from "@/features/api/apiSlice";
import { IQaCategory } from "@/types";
import hotToast from "@/utils/hotToast";
import { addQaCategory, deleteQaCategory, setValue, updateQaCategory } from "./qaCategoryReducer";

const qaCategoryApi = apiSlice.injectEndpoints({
  // @ts-ignore
  overrideExisting: module.hot?.status() === "apply",
  endpoints: (builder) => ({
    getQaCategories: builder.query({
      query: (queries) => {
        const values = Object.values(queries);
        if (values.length) return `/qa-category/all?${new URLSearchParams(queries)}`;
        return "/qa-category/all";
      },
      providesTags: ["qaCategory"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const {
            data: { data }
          } = await queryFulfilled;
          if (data.docs) {
            const { docs, ...rest } = data;
            dispatch(setValue({ target: "qaCategories", value: docs }));
            dispatch(setValue({ target: "pagination", value: rest }));
            return;
          }
          dispatch(setValue({ target: "qaCategories", value: data }));
        } catch (err) {
          console.log(err);
        }
      }
    }),
    getSingleQaCategory: builder.query({
      query: (id) => `/qa-category/${id}`
    }),
    createQaCategory: builder.mutation<{ data: { newQaCategory: IQaCategory; status: boolean; message: string } }, IQaCategory>({
      query: (data) => {
        return {
          url: "/qa-category/create",
          method: "POST",
          body: data
        };
      },
      invalidatesTags: ["qaCategory"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const {
            data: { data }
          } = await queryFulfilled;
          dispatch(addQaCategory(data.newQaCategory));
          hotToast("success", "Added");
        } catch (err) {
          console.log(err);
          hotToast("error", "Error adding");
        }
      }
    }),
    updateQaCategory: builder.mutation<{ data: { updatedQaCategory: IQaCategory; status: boolean; message: string } }, {}>({
      query: ({ id, data }: { id: string; data: IQaCategory }) => {
        return {
          url: `/qa-category/update/${id}`,
          method: "PUT",
          body: data
        };
      },
      invalidatesTags: ["qaCategory"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const {
            data: { data }
          } = await queryFulfilled;
          dispatch(updateQaCategory(data.updatedQaCategory));
          hotToast("success", "Updated");
        } catch (err) {
          console.log(err);
          hotToast("error", "Error updating");
        }
      }
    }),
    deleteQaCategory: builder.mutation<{ data: { deletedQaCategory: IQaCategory; status: boolean; message: string } }, IQaCategory>({
      query: (id) => {
        return {
          url: `/qa-category/delete/${id}`,
          method: "DELETE"
        };
      },
      invalidatesTags: ["qaCategory"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const {
            data: { data }
          } = await queryFulfilled;
          dispatch(deleteQaCategory({ id: data.deletedQaCategory.id! }));
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
  useGetQaCategoriesQuery,
  useCreateQaCategoryMutation,
  useGetSingleQaCategoryQuery,
  useUpdateQaCategoryMutation,
  useDeleteQaCategoryMutation
} = qaCategoryApi;
