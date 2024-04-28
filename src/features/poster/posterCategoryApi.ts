import { apiSlice } from "@/features/api/apiSlice";
import { IPosterCategory } from "@/types";
import hitToast from "@/utils/hitToast";
import { addPosterCategory, deletePosterCategory, setValue, updatePosterCategory } from "./posterCategoryReducer";

const posterCategoryApi = apiSlice.injectEndpoints({
  // @ts-ignore
  overrideExisting: module.hot?.status() === "apply",
  endpoints: (builder) => ({
    getPosterCategories: builder.query({
      query: (queries) => {
        const values = Object.values(queries);
        if (values.length) return `/poster-category/all?${new URLSearchParams(queries)}`;
        return "/poster-category/all";
      },
      providesTags: ["posterCategory"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const {
            data: { data }
          } = await queryFulfilled;
          if (data.docs) {
            const { docs, ...rest } = data;
            dispatch(setValue({ target: "posterCategories", value: docs }));
            dispatch(setValue({ target: "pagination", value: rest }));
            return;
          }
          dispatch(setValue({ target: "posterCategories", value: data }));
        } catch (err) {
          console.log(err);
        }
      }
    }),
    getSinglePosterCategory: builder.query({
      query: (id) => `/poster-category/${id}`
    }),
    createPosterCategory: builder.mutation<{ data: { newPosterCategory: IPosterCategory; status: boolean; message: string } }, IPosterCategory>({
      query: (data) => {
        return {
          url: "/poster-category/create",
          method: "POST",
          body: data
        };
      },
      invalidatesTags: ["posterCategory"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const {
            data: { data }
          } = await queryFulfilled;
          dispatch(addPosterCategory(data.newPosterCategory));
          hitToast("success", "Added");
        } catch (err) {
          console.log(err);
          hitToast("error", "Error adding");
        }
      }
    }),
    updatePosterCategory: builder.mutation<{ data: { updatedPosterCategory: IPosterCategory; status: boolean; message: string } }, {}>({
      query: ({ id, data }: { id: string; data: IPosterCategory }) => {
        return {
          url: `/poster-category/update/${id}`,
          method: "PUT",
          body: data
        };
      },
      invalidatesTags: ["posterCategory"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const {
            data: { data }
          } = await queryFulfilled;
          dispatch(updatePosterCategory(data.updatedPosterCategory));
          hitToast("success", "Updated");
        } catch (err) {
          console.log(err);
          hitToast("error", "Error updating");
        }
      }
    }),
    deletePosterCategory: builder.mutation<{ data: { deletedPosterCategory: IPosterCategory; status: boolean; message: string } }, IPosterCategory>({
      query: (id) => {
        return {
          url: `/poster-category/delete/${id}`,
          method: "DELETE"
        };
      },
      invalidatesTags: ["posterCategory"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const {
            data: { data }
          } = await queryFulfilled;
          dispatch(deletePosterCategory({ id: data.deletedPosterCategory.id! }));
          hitToast("success", "Deleted");
        } catch (err) {
          console.log(err);
          hitToast("error", "Error Deleting");
        }
      }
    })
  })
});

export const {
  useGetPosterCategoriesQuery,
  useCreatePosterCategoryMutation,
  useGetSinglePosterCategoryQuery,
  useUpdatePosterCategoryMutation,
  useDeletePosterCategoryMutation
} = posterCategoryApi;
