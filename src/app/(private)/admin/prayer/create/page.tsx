import PageHeader from "@/components/page-header";
import { routes } from "@/config/routes";
import { metaObject } from "@/config/site.config";
import CreatePrayer from "../_components/CreatePrayer";

const pageHeader = {
  title: "Create A Prayer",
  breadcrumb: [
    {
      href: routes.admin.dashboard,
      name: "Dashboard"
    },
    {
      href: routes.admin.prayer.home,
      name: "Prayer"
    },
    {
      name: "Create"
    }
  ]
};

export const metadata = {
  ...metaObject("Prayer")
};

export default function Page() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}></PageHeader>
      <CreatePrayer />
    </>
  );
}
