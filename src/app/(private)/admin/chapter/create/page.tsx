import PageHeader from "@/components/page-header";
import { routes } from "@/config/routes";
import { metaObject } from "@/config/site.config";
import CreateChapter from "../_components/CreateChapter";

const pageHeader = {
  title: "Create Chapter",
  breadcrumb: [
    {
      href: routes.admin.dashboard,
      name: "Dashboard"
    },
    {
      href: routes.admin.chapter.home,
      name: "Chapter"
    },
    {
      name: "Create"
    }
  ]
};

export const metadata = {
  ...metaObject("Chapter")
};

export default function Page() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}></PageHeader>
      <CreateChapter />
    </>
  );
}
