"use client";

import { routes } from "@/config/routes";
import { useLogoutUserMutation } from "@/features/auth/authApi";
import { setValue } from "@/features/auth/authSlice";
import { RootState } from "@/features/store";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Avatar, Button, Popover, Text, Title } from "rizzui";

const menuItems = [
  {
    name: "My Profile",
    href: "#"
  },
  {
    name: "Account Settings",
    href: "#"
  }
];

function DropdownMenu() {
  const { push } = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector(
    (state: RootState) => ({
      user: state.authSlice.user
    }),
    shallowEqual
  );

  const [logOut] = useLogoutUserMutation();
  const handleLogout = async () => {
    logOut(null)
      .then((res) => {
        push(routes.adminLogin);
        dispatch(setValue({ target: "user", value: undefined }));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className='w-64 text-left rtl:text-right'>
      <div className='flex items-center border-b border-gray-300 px-6 pb-5 pt-6'>
        <Avatar src='https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-11.webp' name={user?.name ?? ""} />
        <div className='ms-3'>
          <Title as='h6' className='font-semibold'>
            {user?.name ?? ""}
          </Title>
          <Text className='text-gray-600'>{user?.email ?? ""}</Text>
        </div>
      </div>
      <div className='grid px-3.5 py-3.5 font-medium text-gray-700'>
        {menuItems.map((item) => (
          <Link
            key={item?.name ?? ""}
            href={item?.href ?? ""}
            className='group my-0.5 flex items-center rounded-md px-2.5 py-2 hover:bg-gray-100 focus:outline-none hover:dark:bg-gray-50/50'
          >
            {item?.name ?? ""}
          </Link>
        ))}
      </div>
      <div className='border-t border-gray-300 px-6 pb-6 pt-5'>
        <Button
          className='h-auto w-full justify-start p-0 font-medium text-gray-700 outline-none focus-within:text-gray-600 hover:text-gray-900 focus-visible:ring-0'
          variant='text'
          onClick={() => handleLogout()}
        >
          Sign Out
        </Button>
      </div>
    </div>
  );
}

export default function ProfileMenu({ buttonClassName, avatarClassName }: { buttonClassName?: string; avatarClassName?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <Popover enableOverlay placement='bottom-start'>
      <Popover.Trigger>
        <div className='w-12 cursor-pointer'>
          <Avatar name='Jane Doe' src='https://isomorphic-furyroad.s3.amazonaws.com/public/avatars-blur/avatar-11.webp' size='lg' />
        </div>
      </Popover.Trigger>
      <Popover.Content>{({ setOpen }) => <DropdownMenu />}</Popover.Content>
    </Popover>
  );
}
