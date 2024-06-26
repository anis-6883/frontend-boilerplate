import { apiSlice } from "@/features/api/apiSlice";

export const generalSettingsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getGeneralSettings: builder.query({
      query: () => "/admin/administration-settings"
    }),
    updateGeneralSettings: builder.mutation<{}, FormData>({
      query: (data) => {
        return {
          url: `/admin/administration-settings/update`,
          method: "POST",
          body: data
          // credentials: 'include',
        };
      }
    })
  })
});

export const { useGetGeneralSettingsQuery, useUpdateGeneralSettingsMutation } = generalSettingsApi;
