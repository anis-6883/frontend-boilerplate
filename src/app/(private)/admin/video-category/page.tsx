import PageHeader from "@/components/page-header";
import { routes } from "@/config/routes";
import { metaObject } from "@/config/site.config";
import Link from "next/link";
import { HiPlus } from "react-icons/hi2";
import VideoCategoryTable from "./_components/VideoCategoryTable";

const pageHeader = {
  title: "Video Category Management",
  breadcrumb: [
    {
      href: routes.admin.videoCategory.home,
      name: "Dashboard"
    },
    {
      name: "Video Category"
    }
  ]
};

export const metadata = {
  ...metaObject("Video Category Management")
};

export default function Page() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <Link
          href={routes.admin.videoCategory.create}
          className='bg-primary hover:bg-primary-dark duration-300 transition-all py-2 px-3 rounded-md flex space-x-2 items-center text-white'
        >
          <HiPlus className='text-lg' /> Add Video Category
        </Link>
      </PageHeader>
      <VideoCategoryTable />
    </>
  );
}
