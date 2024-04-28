import PageHeader from "@/components/page-header";
import { routes } from "@/config/routes";
import { metaObject } from "@/config/site.config";
import CreateLanguage from "../_components/CreateLanguage";

const pageHeader = {
  title: "Create Language",
  breadcrumb: [
    {
      href: routes.admin.dashboard,
      name: "Dashboard"
    },
    {
      href: routes.admin.language.home,
      name: "Language"
    },
    {
      name: "Create"
    }
  ]
};

export const metadata = {
  ...metaObject("Language")
};

export default function Page() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}></PageHeader>
      <CreateLanguage />
    </>
  );
}
