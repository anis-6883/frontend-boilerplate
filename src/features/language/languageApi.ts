import { apiSlice } from "@/features/api/apiSlice";
import { ILanguage } from "@/types";
import hitToast from "@/utils/hitToast";
import { addLanguage, deleteLanguage, setValue, updateLanguage } from "./languageReducer";

const languageApi = apiSlice.injectEndpoints({
  // @ts-ignore
  overrideExisting: module.hot?.status() === "apply",
  endpoints: (builder) => ({
    getLanguages: builder.query({
      query: (queries) => {
        const values = Object.values(queries);
        if (values.length) return `/language/all?${new URLSearchParams(queries)}`;
        return "/language/all";
      },
      providesTags: ["language"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const {
            data: { data }
          } = await queryFulfilled;
          if (data.docs) {
            const { docs, ...rest } = data;
            dispatch(setValue({ target: "languages", value: docs }));
            dispatch(setValue({ target: "pagination", value: rest }));
            return;
          }
          dispatch(setValue({ target: "languages", value: data }));
        } catch (err) {
          console.log(err);
        }
      }
    }),
    getSingleLanguage: builder.query({
      query: (id) => `/language/${id}`
    }),
    createLanguage: builder.mutation<{ data: { newLanguage: ILanguage; status: boolean; message: string } }, ILanguage>({
      query: (data) => {
        return {
          url: "/language/create",
          method: "POST",
          body: data
        };
      },
      invalidatesTags: ["language"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const {
            data: { data }
          } = await queryFulfilled;
          dispatch(addLanguage(data.newLanguage));
          hitToast("success", "Added");
        } catch (err) {
          console.log(err);
          hitToast("error", "Error adding");
        }
      }
    }),
    updateLanguage: builder.mutation<{ data: { updatedLanguage: ILanguage; status: boolean; message: string } }, {}>({
      query: ({ id, data }: { id: string; data: ILanguage }) => {
        return {
          url: `/language/update/${id}`,
          method: "PUT",
          body: data
        };
      },
      invalidatesTags: ["language"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const {
            data: { data }
          } = await queryFulfilled;
          dispatch(updateLanguage(data.updatedLanguage));
          hitToast("success", "Updated");
        } catch (err) {
          console.log(err);
          hitToast("error", "Error updating");
        }
      }
    }),
    deleteLanguage: builder.mutation<{ data: { deletedLanguage: ILanguage; status: boolean; message: string } }, ILanguage>({
      query: (id) => {
        return {
          url: `/language/delete/${id}`,
          method: "DELETE"
        };
      },
      invalidatesTags: ["language"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const {
            data: { data }
          } = await queryFulfilled;
          console.log("dfdkjf", data);
          dispatch(deleteLanguage({ id: data?.deletedLanguage.id! }));
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
  useGetLanguagesQuery,
  useCreateLanguageMutation,
  useGetSingleLanguageQuery,
  useUpdateLanguageMutation,
  useDeleteLanguageMutation
} = languageApi;
