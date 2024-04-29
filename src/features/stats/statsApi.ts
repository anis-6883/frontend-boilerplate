import { apiSlice } from "@/features/api/apiSlice";
import { setValue } from "./statsReducer";

const statsApi = apiSlice.injectEndpoints({
  // @ts-ignore
  overrideExisting: module.hot?.status() === "apply",
  endpoints: (builder) => ({
    getStats: builder.query({
      query: () => "/stats",
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const {
            data: { data }
          } = await queryFulfilled;
          dispatch(setValue({ target: "stats", value: data }));
        } catch (err) {
          console.log(err);
        }
      }
    })
  })
});

export const { useGetStatsQuery } = statsApi;
