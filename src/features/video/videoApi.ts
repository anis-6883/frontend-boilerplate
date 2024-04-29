import { apiSlice } from "@/features/api/apiSlice";
import { IVideo } from "@/types";
import hotToast from "@/utils/hotToast";
import { deleteVideo, updateVideo } from "./videoReducer";

const videoApi = apiSlice.injectEndpoints({
  // @ts-ignore
  overrideExisting: module.hot?.status() === "apply",
  endpoints: (builder) => ({
    getYoutubeVideos: builder.query({
      query: (channelId: string) => {
        return `/video/getvideos/${channelId}`;
      }
    }),
    getVideos: builder.query({
      query: (queries) => {
        const values = Object.values(queries);
        if (values.length) return `/video/all?${new URLSearchParams(queries)}`;
        return "/video/all";
      },
      providesTags: ["video"]
    }),
    getSinglevideo: builder.query({
      query: (id) => `/video/${id}`
    }),
    createVideo: builder.mutation<{ data: { newvideo: IVideo; status: boolean; message: string } }, IVideo>({
      query: (data) => {
        return {
          url: "/video/create",
          method: "POST",
          body: data
        };
      },
      invalidatesTags: ["video"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const {
            data: { data }
          } = await queryFulfilled;
          // console.log("dataaa", data);
          // dispatch(addVideo(data));
          hotToast("success", "Added Videos");
        } catch (err) {
          console.log(err);
          hotToast("error", "Error adding");
        }
      }
    }),
    updateVideo: builder.mutation<{ data: { updatedvideo: IVideo; status: boolean; message: string } }, IVideo>({
      query: (id) => {
        return {
          url: `/video/update/${id}`,
          method: "PUT"
        };
      },
      invalidatesTags: ["video"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const {
            data: { data }
          } = await queryFulfilled;
          dispatch(updateVideo(data.updatedvideo));
          hotToast("success", "Updated");
        } catch (err) {
          console.log(err);
          hotToast("error", "Error updating");
        }
      }
    }),
    deleteVideo: builder.mutation<{ data: { deletedvideo: IVideo; status: boolean; message: string } }, IVideo>({
      query: (id) => {
        return {
          url: `/video/delete/${id}`,
          method: "DELETE"
        };
      },
      invalidatesTags: ["video"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const {
            data: { data }
          } = await queryFulfilled;
          dispatch(deleteVideo({ id: data.deletedvideo.id! }));
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
  useGetVideosQuery,
  useGetYoutubeVideosQuery,
  useCreateVideoMutation,
  useGetSinglevideoQuery,
  useUpdateVideoMutation,
  useDeleteVideoMutation
} = videoApi;
