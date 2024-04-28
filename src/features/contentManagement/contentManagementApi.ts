import { apiSlice } from "@/features/api/apiSlice";
import { IContent } from "@/types";
import hitToast from "@/utils/hitToast";
import { addContent, deleteContent, setValue, updateContent } from "./contentReducer";

const contentManagementApi = apiSlice.injectEndpoints({
  // @ts-ignore
  overrideExisting: module.hot?.status() === "apply",
  endpoints: (builder) => ({
    getContents: builder.query({
      query: (queries) => {
        console.log(queries);
        const values = Object.values(queries);
        if (values.length) return `/cms/all?${new URLSearchParams(queries)}`;
        return "/cms/all";
      },
      providesTags: ["contentManagement"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const {
            data: { data }
          } = await queryFulfilled;
          if (data.docs) {
            dispatch(setValue({ target: "contents", value: data.docs }));
            return;
          }
          dispatch(setValue({ target: "contents", value: data }));
        } catch (err) {
          console.log(err);
        }
      }
    }),
    getSingleContent: builder.query({
      query: (id) => `/cms/${id}`
    }),
    createContent: builder.mutation<{ data: { newContentManagement: IContent; status: boolean; message: string } }, IContent>({
      query: (data) => {
        return {
          url: "/cms/create",
          method: "POST",
          body: data
        };
      },
      invalidatesTags: ["contentManagement"],
    }),
    updateContent: builder.mutation<{ data: { updatedContentManagement: IContent; status: boolean; message: string } }, {}>({
      query: ({ id, data }: { id: string; data: IContent }) => {
        return {
          url: `/cms/update/${id}`,
          method: "PUT",
          body: data
        };
      },
      invalidatesTags: ["contentManagement"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const {
            data: { data }
          } = await queryFulfilled;
          dispatch(updateContent(data.updatedContentManagement));
          hitToast("success", "Updated");
        } catch (err) {
          console.log(err);
          hitToast("error", "Error updating");
        }
      }
    }),
    deleteContent: builder.mutation<{ data: { deletedContentManagement: IContent; status: boolean; message: string } }, IContent>({
      query: (id) => {
        return {
          url: `/cms/delete/${id}`,
          method: "DELETE"
        };
      },
      invalidatesTags: ["contentManagement"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const {
            data: { data }
          } = await queryFulfilled;
          dispatch(deleteContent({ id: data.deletedContentManagement.id! }));
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
  useGetContentsQuery,
  useCreateContentMutation,
  useGetSingleContentQuery,
  useUpdateContentMutation,
  useDeleteContentMutation
} = contentManagementApi;
