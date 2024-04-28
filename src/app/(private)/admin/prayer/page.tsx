import PageHeader from "@/components/page-header";
import { routes } from "@/config/routes";
import { metaObject } from "@/config/site.config";
import PrayerTable from "./_components/PrayerTable";

const pageHeader = {
  title: "Daily Prayer",
  breadcrumb: [
    {
      href: routes.admin.dashboard,
      name: "Dashboard"
    },
    {
      name: "Daily Prayer"
    }
  ]
};

export const metadata = {
  ...metaObject("Daily Prayer")
};

export default function Page() {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        {/* <Link
          href={routes.admin.prayer.create}
          className='bg-primary hover:bg-primary-dark duration-300 transition-all py-2 px-3 rounded-md flex space-x-2 items-center text-white'
        >
          <HiPlus className='text-lg' /> Add Daily Prayer
        </Link> */}
      </PageHeader>
      <PrayerTable />
    </>
  );
}
