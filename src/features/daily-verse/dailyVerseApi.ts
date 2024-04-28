import { apiSlice } from "@/features/api/apiSlice";
import { IDailyVerse } from "@/types";
const dailyVerseApi = apiSlice.injectEndpoints({
  // @ts-ignore
  overrideExisting: module.hot?.status() === "apply",
  endpoints: (builder) => ({
    getDailyVerses: builder.query({
      query: (queries) => {
        const values = Object.values(queries);
        if (values.length) return `/daily-verse/all?${new URLSearchParams(queries)}`;
        return "/daily-verse/all";
      },
      providesTags: ["dailyVerse"]
    }),
    getSingleDailyVerse: builder.query({
      query: (id) => `/daily-verse/${id}`
    }),
    createDailyVerse: builder.mutation<{ data: { newDailyVerse: IDailyVerse; status: boolean; message: string } }, IDailyVerse>({
      query: (data) => {
        return {
          url: "/daily-verse/create",
          method: "POST",
          body: data
        };
      },
      invalidatesTags: ["dailyVerse"]
    }),
    updateDailyVerse: builder.mutation<{ data: { updatedDailyVerse: IDailyVerse; status: boolean; message: string } }, {}>({
      query: ({ id, data }: { id: string; data: IDailyVerse }) => {
        return {
          url: `/daily-verse/update/${id}`,
          method: "PUT",
          body: data
        };
      },
      invalidatesTags: ["dailyVerse"]
    }),
    deleteDailyVerse: builder.mutation<{ data: { deletedDailyVerse: IDailyVerse; status: boolean; message: string } }, IDailyVerse>({
      query: (id) => {
        return {
          url: `/daily-verse/delete/${id}`,
          method: "DELETE"
        };
      },
      invalidatesTags: ["dailyVerse"]
    })
  })
});

export const {
  useGetDailyVersesQuery,
  useCreateDailyVerseMutation,
  useGetSingleDailyVerseQuery,
  useUpdateDailyVerseMutation,
  useDeleteDailyVerseMutation
} = dailyVerseApi;
