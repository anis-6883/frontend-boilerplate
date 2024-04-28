import { apiSlice } from "@/features/api/apiSlice";
import { IVersion } from "@/types";
import hitToast from "@/utils/hitToast";
import { addVersion, deleteVersion, setValue, updateVersion } from "./versionReducer";

const versionApi = apiSlice.injectEndpoints({
  // @ts-ignore
  overrideExisting: module.hot?.status() === "apply",
  endpoints: (builder) => ({
    getVersions: builder.query({
      query: (queries) => {
        const values = Object.values(queries);
        if (values.length) return `/version/all?${new URLSearchParams(queries)}`;
        return "/version/all";
      },
      providesTags: ["version"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const {
            data: { data }
          } = await queryFulfilled;
          if (data.docs) {
            const { docs, ...rest } = data;
            dispatch(setValue({ target: "versions", value: docs }));
            dispatch(setValue({ target: "pagination", value: rest }));
            return;
          }
          dispatch(setValue({ target: "versions", value: data }));
        } catch (err) {
          console.log(err);
        }
      }
    }),
    getSingleVersion: builder.query({
      query: (id) => `/version/${id}`
    }),
    createVersion: builder.mutation<{ data: { newVersion: IVersion; status: boolean; message: string } }, IVersion>({
      query: (data) => {
        return {
          url: "/version/create",
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
          dispatch(addVersion(data.newVersion));
          hitToast("success", "Added");
        } catch (err) {
          console.log(err);
          hitToast("error", "Error adding");
        }
      }
    }),
    updateVersion: builder.mutation<{ data: { updatedVersion: IVersion; status: boolean; message: string } }, {}>({
      query: ({ id, data }: { id: string; data: IVersion }) => {
        return {
          url: `/version/update/${id}`,
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
          dispatch(updateVersion(data.updatedVersion));
          hitToast("success", "Updated");
        } catch (err) {
          console.log(err);
          hitToast("error", "Error updating");
        }
      }
    }),
    deleteVersion: builder.mutation<{ data: { deletedVersion: IVersion; status: boolean; message: string } }, IVersion>({
      query: (id) => {
        return {
          url: `/version/delete/${id}`,
          method: "DELETE"
        };
      },
      invalidatesTags: ["qaCategory"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const {
            data: { data }
          } = await queryFulfilled;
          dispatch(deleteVersion({ id: data.deletedVersion.id! }));
          hitToast("success", "Deleted");
        } catch (err) {
          console.log(err);
          hitToast("error", "Error Deleting");
        }
      }
    })
  })
});

export const { useGetVersionsQuery, useCreateVersionMutation, useGetSingleVersionQuery, useUpdateVersionMutation, useDeleteVersionMutation } =
  versionApi;
