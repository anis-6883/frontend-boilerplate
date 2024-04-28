import PageHeader from "@/components/page-header";
import { routes } from "@/config/routes";
import { metaObject } from "@/config/site.config";
import CreateVerse from "../_components/CreateVerse";

const pageHeader = {
  title: "Create Verse",
  breadcrumb: [
    {
      href: routes.admin.dashboard,
      name: "Dashboard"
    },
    {
      href: routes.admin.verse.home,
      name: "Verse"
    },
    {
      name: "Create"
    }
  ]
};

export const metadata = {
  ...metaObject("Verse")
};

export default function Page() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}></PageHeader>
      <CreateVerse />
    </>
  );
}
