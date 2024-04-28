import PageHeader from "@/components/page-header";
import { routes } from "@/config/routes";
import { metaObject } from "@/config/site.config";
import CreateVideo from "../_components/CreateVideo";

const pageHeader = {
  title: "Create Videos",
  breadcrumb: [
    {
      href: routes.admin.dashboard,
      name: "Dashboard"
    },
    {
      href: routes.admin.video.home,
      name: "Videos"
    },
    {
      name: "Create"
    }
  ]
};

export const metadata = {
  ...metaObject("Videos")
};

export default function Page() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}></PageHeader>
      <CreateVideo />
    </>
  );
}
