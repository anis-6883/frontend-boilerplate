import PageHeader from "@/components/page-header";
import { routes } from "@/config/routes";
import { metaObject } from "@/config/site.config";
import CreateQaCategory from "../_components/CreateQaCategory";

const pageHeader = {
  title: "Create Qa Category",
  breadcrumb: [
    {
      href: routes.admin.dashboard,
      name: "Dashboard"
    },
    {
      href: routes.admin.questionAnswerCategory.home,
      name: "Qa Category"
    },
    {
      name: "Create"
    }
  ]
};

export const metadata = {
  ...metaObject("Qa Category")
};

export default function Page() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}></PageHeader>
      <CreateQaCategory />
    </>
  );
}
