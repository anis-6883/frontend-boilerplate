import PageHeader from "@/components/page-header";
import { routes } from "@/config/routes";
import { metaObject } from "@/config/site.config";
import Link from "next/link";
import { HiPlus } from "react-icons/hi2";
import ChapterTable from "./_components/ChapterTable";

const pageHeader = {
  title: "Chapter",
  breadcrumb: [
    {
      href: routes.admin.language.home,
      name: "Dashboard"
    },
    {
      name: "Chapter"
    }
  ]
};

export const metadata = {
  ...metaObject("Chapter")
};

export default function Page() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <Link
          href={routes.admin.language.create}
          className='bg-primary hover:bg-primary-dark duration-300 transition-all py-2 px-3 rounded-md flex space-x-2 items-center text-white'
        >
          <HiPlus className='text-lg' /> Add Chapter
        </Link>
      </PageHeader>
      <ChapterTable />
    </>
  );
}
