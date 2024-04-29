import { apiSlice } from "@/features/api/apiSlice";
import { addDailyManna, deleteDailyManna, setValue, updateDailyManna } from "@/features/daily-manna/dailyMannaSlice";
import { IDailyManna } from "@/types";
import hotToast from "@/utils/hotToast";
const dailyMannaApi = apiSlice.injectEndpoints({
  // @ts-ignore
  overrideExisting: module.hot?.status() === "apply",
  endpoints: (builder) => ({
    getDailyMannas: builder.query({
      query: (queries) => {
        const values = Object.values(queries);
        if (values.length) return `/daily-manna/all?${new URLSearchParams(queries)}`;
        return "/daily-manna/all";
      },
      providesTags: ["dailyManna"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const {
            data: { data }
          } = await queryFulfilled;
          if (data.docs) {
            const { docs, ...rest } = data;
            dispatch(setValue({ target: "dailyMannas", value: docs }));
            dispatch(setValue({ target: "pagination", value: rest }));
            return;
          }
          dispatch(setValue({ target: "dailyMannas", value: data }));
        } catch (err) {
          console.log(err);
        }
      }
    }),
    getSingleDailyManna: builder.query({
      query: (id) => `/daily-manna/${id}`
    }),
    createDailyManna: builder.mutation<{ data: { newDailyManna: IDailyManna; status: boolean; message: string } }, IDailyManna>({
      query: (data) => {
        return {
          url: "/daily-manna/create",
          method: "POST",
          body: data
        };
      },
      invalidatesTags: ["dailyManna"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const {
            data: { data }
          } = await queryFulfilled;
          dispatch(addDailyManna(data.newDailyManna));
          hotToast("success", "Added");
        } catch (err) {
          console.log(err);
          hotToast("error", "Error adding");
        }
      }
    }),
    updateDailyManna: builder.mutation<{ data: { updatedDailyManna: IDailyManna; status: boolean; message: string } }, {}>({
      query: ({ id, data }: { id: string; data: IDailyManna }) => {
        return {
          url: `/daily-manna/update/${id}`,
          method: "PUT",
          body: data
        };
      },
      invalidatesTags: ["dailyManna"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const {
            data: { data }
          } = await queryFulfilled;
          dispatch(updateDailyManna(data.updatedDailyManna));
          hotToast("success", "Updated");
        } catch (err) {
          console.log(err);
          hotToast("error", "Error updating");
        }
      }
    }),
    deleteDailyManna: builder.mutation<{ data: { deletedDailyManna: IDailyManna; status: boolean; message: string } }, IDailyManna>({
      query: (id) => {
        return {
          url: `/daily-manna/delete/${id}`,
          method: "DELETE"
        };
      },
      invalidatesTags: ["dailyManna"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const {
            data: { data }
          } = await queryFulfilled;
          console.log("data", data);
          dispatch(deleteDailyManna({ id: data.deletedDailyManna.id! }));
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
  useGetDailyMannasQuery,
  useCreateDailyMannaMutation,
  useGetSingleDailyMannaQuery,
  useUpdateDailyMannaMutation,
  useDeleteDailyMannaMutation
} = dailyMannaApi;
