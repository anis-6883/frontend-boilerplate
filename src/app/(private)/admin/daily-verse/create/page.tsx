import PageHeader from "@/components/page-header";
import { routes } from "@/config/routes";
import { metaObject } from "@/config/site.config";
import CreateDailyVerse from "../_components/CreateDailyVerse";

const pageHeader = {
  title: "Create A Daily Verse",
  breadcrumb: [
    {
      href: routes.admin.dashboard,
      name: "Dashboard"
    },
    {
      href: routes.admin.dailyVerse.home,
      name: "Daily Verse"
    },
    {
      name: "Create"
    }
  ]
};

export const metadata = {
  ...metaObject("Daily Verse")
};

export default function Page() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}></PageHeader>
      <CreateDailyVerse />
    </>
  );
}
