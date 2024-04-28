import PageHeader from "@/components/page-header";
import { routes } from "@/config/routes";
import { metaObject } from "@/config/site.config";
import CreateDailyManna from "../_components/CreateDailyManna";

const pageHeader = {
  title: "Create A Daily Manna",
  breadcrumb: [
    {
      href: routes.admin.dashboard,
      name: "Dashboard"
    },
    {
      href: routes.admin.contentManagement.home,
      name: "Daily Manna"
    },
    {
      name: "Create"
    }
  ]
};

export const metadata = {
  ...metaObject("Daily Manna")
};

export default function Page() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}></PageHeader>
      <CreateDailyManna />
    </>
  );
}
