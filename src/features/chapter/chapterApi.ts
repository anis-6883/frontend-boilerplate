import { apiSlice } from "@/features/api/apiSlice";
import { IChapter } from "@/types";
import hitToast from "@/utils/hitToast";
import { addChapter, deleteChapter, setValue, updateChapter } from "./chapterReducer";

const chapterApi = apiSlice.injectEndpoints({
  // @ts-ignore
  overrideExisting: module.hot?.status() === "apply",
  endpoints: (builder) => ({
    getChapters: builder.query({
      query: (queries) => {
        const values = Object.values(queries);
        if (values.length) return `/chapter/all?${new URLSearchParams(queries)}`;
        return "/chapter/all";
      },
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const {
            data: { data }
          } = await queryFulfilled;
          if (data.docs) {
            const { docs, ...rest } = data;
            dispatch(setValue({ target: "chapters", value: docs }));
            dispatch(setValue({ target: "pagination", value: rest }));
            return;
          }
          dispatch(setValue({ target: "chapters", value: data }));
        } catch (err) {
          console.log(err);
        }
      }
    }),
    getSingleChapter: builder.query({
      query: (id) => `/chapter/${id}`
    }),
    createChapter: builder.mutation<{ data: { newChapter: IChapter; status: boolean; message: string } }, IChapter>({
      query: (data) => {
        return {
          url: "/chapter/create",
          method: "POST",
          body: data
        };
      },
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const {
            data: { data }
          } = await queryFulfilled;
          dispatch(addChapter(data.newChapter));
          hitToast("success", "Added");
        } catch (err) {
          console.log(err);
          hitToast("error", "Error adding");
        }
      }
    }),
    updateChapter: builder.mutation<{ data: { updatedChapter: IChapter; status: boolean; message: string } }, {}>({
      query: ({ id, data }: { id: string; data: IChapter }) => {
        return {
          url: `/chapter/update/${id}`,
          method: "PUT",
          body: data
        };
      },
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const {
            data: { data }
          } = await queryFulfilled;
          dispatch(updateChapter(data.updatedChapter));
          hitToast("success", "Updated");
        } catch (err) {
          console.log(err);
          hitToast("error", "Error updating");
        }
      }
    }),
    deleteChapter: builder.mutation<{ data: { deletedChapter: IChapter; status: boolean; message: string } }, IChapter>({
      query: (id) => {
        return {
          url: `/chapter/delete/${id}`,
          method: "DELETE"
        };
      },
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const {
            data: { data }
          } = await queryFulfilled;
          dispatch(deleteChapter({ id: data.deletedChapter.id! }));
          hitToast("success", "Deleted");
        } catch (err) {
          console.log(err);
          hitToast("error", "Error Deleting");
        }
      }
    })
  })
});

export const { useGetChaptersQuery, useCreateChapterMutation, useGetSingleChapterQuery, useUpdateChapterMutation, useDeleteChapterMutation } =
  chapterApi;
