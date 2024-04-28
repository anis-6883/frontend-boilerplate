import PageHeader from "@/components/page-header";
import { routes } from "@/config/routes";
import { metaObject } from "@/config/site.config";
import CreateVideoCategory from "../_components/createVideoCategory";

const pageHeader = {
  title: "Create Video Category",
  breadcrumb: [
    {
      href: routes.admin.dashboard,
      name: "Dashboard"
    },
    {
      href: routes.admin.videoCategory.home,
      name: "Video Category"
    },
    {
      name: "Create"
    }
  ]
};

export const metadata = {
  ...metaObject("Video Category")
};

export default function Page() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}></PageHeader>
      <CreateVideoCategory />
    </>
  );
}
