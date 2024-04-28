import PageHeader from "@/components/page-header";
import { routes } from "@/config/routes";
import { metaObject } from "@/config/site.config";
import CreateSongBook from "../_components/CreatePosterCategory";

const pageHeader = {
  title: "Create Poster Category",
  breadcrumb: [
    {
      href: routes.admin.dashboard,
      name: "Dashboard"
    },
    {
      href: routes.admin.posterCategory.home,
      name: "Poster Category"
    },
    {
      name: "Create"
    }
  ]
};

export const metadata = {
  ...metaObject("Poster Category")
};

export default function Page() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}></PageHeader>
      <CreateSongBook />
    </>
  );
}
