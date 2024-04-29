import { apiSlice } from "@/features/api/apiSlice";
import { IVideoCategory } from "@/types";
import hotToast from "@/utils/hotToast";
import { addVideoCategory, deleteVideoCategory, setValue, updateVideoCategory } from "./videoCategoryReducer";

const videoCategoryApi = apiSlice.injectEndpoints({
  // @ts-ignore
  overrideExisting: module.hot?.status() === "apply",
  endpoints: (builder) => ({
    getvideoCategorys: builder.query({
      query: (queries) => {
        const values = Object.values(queries);
        if (values.length) return `/video-category/all?${new URLSearchParams(queries)}`;
        return "/video-category/all";
      },
      providesTags: ["videoCategory"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const {
            data: { data }
          } = await queryFulfilled;
          if (data.docs) {
            const { docs, ...rest } = data;
            dispatch(setValue({ target: "videoCategorys", value: docs }));
            dispatch(setValue({ target: "pagination", value: rest }));
            return;
          }
          dispatch(setValue({ target: "videoCategorys", value: data }));
        } catch (err) {
          console.log(err);
        }
      }
    }),
    getSinglevideoCategory: builder.query({
      query: (id) => `/video-category/${id}`
    }),
    createVideoCategory: builder.mutation<{ data: { newvideoCategory: IVideoCategory; status: boolean; message: string } }, IVideoCategory>(
      {
        query: (data) => {
          return {
            url: "/video-category/create",
            method: "POST",
            body: data
          };
        },
        invalidatesTags: ["videoCategory"],
        async onQueryStarted(arg, { dispatch, queryFulfilled }) {
          try {
            const {
              data: { data }
            } = await queryFulfilled;
            dispatch(addVideoCategory(data.newvideoCategory));
            hotToast("success", "Added");
          } catch (err) {
            console.log(err);
            hotToast("error", "Error adding");
          }
        }
      }
    ),
    updateVideoCategory: builder.mutation<{ data: { updatedvideoCategory: IVideoCategory; status: boolean; message: string } }, {}>({
      query: ({ id, data }: { id: string; data: IVideoCategory }) => {
        return {
          url: `/video-category/update/${id}`,
          method: "PUT",
          body: data
        };
      },
      invalidatesTags: ["videoCategory"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const {
            data: { data }
          } = await queryFulfilled;
          dispatch(updateVideoCategory(data.updatedvideoCategory));
          hotToast("success", "Updated");
        } catch (err) {
          console.log(err);
          hotToast("error", "Error updating");
        }
      }
    }),
    deleteVideoCategory: builder.mutation<
      { data: { deletedvideoCategory: IVideoCategory; status: boolean; message: string } },
      IVideoCategory
    >({
      query: (id) => {
        return {
          url: `/video-category/delete/${id}`,
          method: "DELETE"
        };
      },
      invalidatesTags: ["videoCategory"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const {
            data: { data }
          } = await queryFulfilled;
          dispatch(deleteVideoCategory({ id: data.deletedvideoCategory.id! }));
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
  useGetvideoCategorysQuery,
  useCreateVideoCategoryMutation,
  useGetSinglevideoCategoryQuery,
  useUpdateVideoCategoryMutation,
  useDeleteVideoCategoryMutation
} = videoCategoryApi;
