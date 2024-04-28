import PageHeader from "@/components/page-header";
import { routes } from "@/config/routes";
import { metaObject } from "@/config/site.config";
import CreatePoster from "../_components/CreatePoster";

const pageHeader = {
  title: "Create A Poster",
  breadcrumb: [
    {
      href: routes.admin.dashboard,
      name: "Dashboard"
    },
    {
      href: routes.admin.poster.home,
      name: "Poster"
    },
    {
      name: "Create"
    }
  ]
};

export const metadata = {
  ...metaObject("Poster")
};

export default function Page() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}></PageHeader>
      <CreatePoster />
    </>
  );
}
