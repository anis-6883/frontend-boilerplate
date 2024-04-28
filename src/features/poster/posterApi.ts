import { apiSlice } from "@/features/api/apiSlice";
import { IPoster } from "@/types";
import hitToast from "@/utils/hitToast";
import { addPoster, deletePoster, setValue, updatePoster } from "./posterReducer";

const posterApi = apiSlice.injectEndpoints({
  // @ts-ignore
  overrideExisting: module.hot?.status() === "apply",
  endpoints: (builder) => ({
    getPosters: builder.query({
      query: (queries) => {
        const values = Object.values(queries);
        if (values.length) return `/poster/all?${new URLSearchParams(queries)}`;
        return "/poster/all";
      },
      providesTags: ["poster"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const {
            data: { data }
          } = await queryFulfilled;
          if (data.docs) {
            const { docs, ...rest } = data;
            dispatch(setValue({ target: "posters", value: docs }));
            dispatch(setValue({ target: "pagination", value: rest }));
            return;
          }
          dispatch(setValue({ target: "posters", value: data }));
        } catch (err) {
          console.log(err);
        }
      }
    }),
    getSinglePoster: builder.query({
      query: (id) => `/poster/${id}`
    }),
    createPoster: builder.mutation<{ data: { newPoster: IPoster; status: boolean; message: string } }, IPoster>({
      query: (data) => {
        return {
          url: "/poster/create",
          method: "POST",
          body: data
        };
      },
      invalidatesTags: ["poster"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const {
            data: { data }
          } = await queryFulfilled;
          dispatch(addPoster(data.newPoster));
          hitToast("success", "Added");
        } catch (err) {
          console.log(err);
          hitToast("error", "Error adding");
        }
      }
    }),
    updatePoster: builder.mutation<{ data: { updatedPoster: IPoster; status: boolean; message: string } }, {}>({
      query: ({ id, data }: { id: string; data: IPoster }) => {
        return {
          url: `/poster/update/${id}`,
          method: "PUT",
          body: data
        };
      },
      invalidatesTags: ["poster"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const {
            data: { data }
          } = await queryFulfilled;
          hitToast("success", "Updated");
        } catch (err) {
          console.log(err);
          hitToast("error", "Error updating");
        }
      }
    }),
    deletePoster: builder.mutation<{ data: { deletedPoster: IPoster; status: boolean; message: string } }, IPoster>({
      query: (id) => {
        return {
          url: `/poster/delete/${id}`,
          method: "DELETE"
        };
      },
      invalidatesTags: ["poster"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const {
            data: { data }
          } = await queryFulfilled;
          dispatch(deletePoster({ id: data.deletedPoster.id! }));
          hitToast("success", "Deleted");
        } catch (err) {
          console.log(err);
          hitToast("error", "Error Deleting");
        }
      }
    })
  })
});

export const { useGetPostersQuery, useCreatePosterMutation, useGetSinglePosterQuery, useUpdatePosterMutation, useDeletePosterMutation } = posterApi;
