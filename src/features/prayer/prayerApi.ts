import { apiSlice } from "@/features/api/apiSlice";
import { IPrayer } from "@/types";
import hitToast from "@/utils/hitToast";
import { addPrayer, deletePrayer, setValue, updatePrayer } from "./prayerReducer";

const prayerApi = apiSlice.injectEndpoints({
  // @ts-ignore
  overrideExisting: module.hot?.status() === "apply",
  endpoints: (builder) => ({
    getPrayers: builder.query({
      query: (queries) => {
        const values = Object.values(queries);
        if (values.length) return `/prayer/all?${new URLSearchParams(queries)}`;
        return "/prayer/all";
      },
      providesTags: ["prayer"],
    }),
    getSinglePrayer: builder.query({
      query: (id) => `/prayer/${id}`
    }),
    createPrayer: builder.mutation<{ data: { newPrayer: IPrayer; status: boolean; message: string } }, IPrayer>({
      query: (data) => {
        return {
          url: "/prayer/create",
          method: "POST",
          body: data
        };
      },
      invalidatesTags: ["prayer"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const {
            data: { data }
          } = await queryFulfilled;
          dispatch(addPrayer(data.newPrayer));
          hitToast("success", "Added");
        } catch (err) {
          console.log(err);
          hitToast("error", "Error adding");
        }
      }
    }),
    updatePrayer: builder.mutation<{ data: { updatedPrayer: IPrayer; status: boolean; message: string } }, {}>({
      query: ({ id, data }: { id: string; data: IPrayer }) => {
        return {
          url: `/prayer/update/${id}`,
          method: "PUT",
          body: data
        };
      },
      invalidatesTags: ["prayer"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const {
            data: { data }
          } = await queryFulfilled;
          dispatch(updatePrayer(data.updatedPrayer));
          hitToast("success", "Updated");
        } catch (err) {
          console.log(err);
          hitToast("error", "Error updating");
        }
      }
    }),
    deletePrayer: builder.mutation<{ data: { deletedPrayer: IPrayer; status: boolean; message: string } }, IPrayer>({
      query: (id) => {
        return {
          url: `/prayer/delete/${id}`,
          method: "DELETE"
        };
      },
      invalidatesTags: ["prayer"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const {
            data: { data }
          } = await queryFulfilled;
          dispatch(deletePrayer({ id: data.deletedPrayer.id! }));
          hitToast("success", "Deleted");
        } catch (err) {
          console.log(err);
          hitToast("error", "Error Deleting");
        }
      }
    })
  })
});

export const { useGetPrayersQuery, useCreatePrayerMutation, useGetSinglePrayerQuery, useUpdatePrayerMutation, useDeletePrayerMutation } =
  prayerApi;
