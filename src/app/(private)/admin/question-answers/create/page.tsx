import PageHeader from "@/components/page-header";
import { routes } from "@/config/routes";
import { metaObject } from "@/config/site.config";
import CreateQa from "../_components/CreateQa";

const pageHeader = {
  title: "Create A QA",
  breadcrumb: [
    {
      href: routes.admin.dashboard,
      name: "Dashboard"
    },
    {
      href: routes.admin.questionAnswer.home,
      name: "QA"
    },
    {
      name: "Create"
    }
  ]
};

export const metadata = {
  ...metaObject("QA")
};

export default function Page() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}></PageHeader>
      <CreateQa />
    </>
  );
}
