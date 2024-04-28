"use client";
import { routes } from "@/config/routes";
import { useGetStatsQuery } from "@/features/stats/statsApi";
import { RootState } from "@/features/store";
import _ from "lodash";
import Link from "next/link";
import { BiBible, BiVideoRecording } from "react-icons/bi";
import { BsFilePost } from "react-icons/bs";
import { GiPrayer } from "react-icons/gi";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoBookOutline } from "react-icons/io5";
import { LuBook, LuFileText, LuMusic, LuText, LuUsers, LuLanguages } from "react-icons/lu";
import { RiQuestionAnswerLine } from "react-icons/ri";
import { SiBookstack } from "react-icons/si";
import { shallowEqual, useSelector } from "react-redux";

export default function Stats() {
  const { isLoading } = useGetStatsQuery(null);
  const { stats } = useSelector((state: RootState) => ({ stats: state.statsStore.stats }), shallowEqual);
  const iconMap = {
    language: LuLanguages,
    book: IoBookOutline,
    chapter: SiBookstack,
    "content Management": LuFileText,
    dictionary: LuBook,
    poster: BsFilePost,
    prayer: GiPrayer,
    song: LuMusic,
    user: LuUsers,
    verse: LuText,
    version: BiBible,
    video: BiVideoRecording,
    "daily Manna": IoMdNotificationsOutline,
    "question Answer": RiQuestionAnswerLine
  };

  // Function to get the icon component for a given key
  const getIconComponent = (key: any) => {
    // @ts-ignore
    return iconMap[key] || null;
  };

  return (
    <div>
      <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7 gap-5 max-w-screen-2xl'>
        {Object.entries(stats).map(([key, value]) => {
          // Get the icon component for the current key
          const IconComponent = getIconComponent(key);
          return (
            // @ts-ignore
            <Link href={routes.admin?.[key.replace(" ", "")]?.home} key={key}>
              <div className='p-4 border border-primary-lighter rounded-md'>
                <div className='flex justify-between items-center '>
                  <h3 className='font-semibold truncate'>{_.capitalize(key)}</h3>
                  {IconComponent && <IconComponent size={20} className='text-primary' />}
                </div>
                <div className='text-2xl font-bold'>{value}</div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
