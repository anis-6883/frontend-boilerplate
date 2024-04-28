import { apiSlice } from "@/features/api/apiSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    adminLogin: builder.mutation({
      query: (data) => {
        return {
          url: `/admin/login`,
          method: "POST",
          body: data
        };
      }
      // async onQueryStarted(arg, { dispatch, queryFulfilled }) {
      //   try {
      //     const {
      //       data: { data }
      //     } = await queryFulfilled;

      //     if (data.accessToken) {
      //       const { accessToken, user, ...rest } = data;
      //       dispatch(userLoggedIn({ accessToken, user }));
      //       return;
      //     }
      //   } catch (err) {
      //     console.log(err);
      //   }
      // }
    }),
    getProfile: builder.query({
      query: (id: string) => `/admin/${id}`,
      providesTags: ["userProfile"]
    }),
    getOwnProfile: builder.mutation({
      query: () => "/admin/userProfile"
    }),
    logoutUser: builder.mutation({
      query: () => {
        return {
          url: "/admin/logout",
          method: "POST"
        };
      }
    })
  })
});

export const { useGetProfileQuery, useAdminLoginMutation, useGetOwnProfileMutation, useLogoutUserMutation } = authApi;
