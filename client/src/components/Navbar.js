import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Button, Dropdown } from "antd";
import logo from "../assets/logo.jpg";

const navigation = [
  { name: "About Us", href: "about-section" },
  { name: "Gallery", href: "gallery-section" },
  { name: "Our Goals", href: "ourGoal-section" },
  { name: "Our Teachers", href: "teacher-section" },
  { name: "Contact", href: "instructor-section" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 70;
      const elementPosition =
        element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Disclosure as="nav" className="bg-gray-950 sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                aria-hidden="true"
                className="block size-6 group-data-[open]:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden size-6 group-data-[open]:block"
              />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div
              className="shrink-0 items-center hidden sm:flex md:flex"
              onClick={scrollToTop}
              style={{ cursor: "pointer" }}
            >
              <img
                alt="Your Company"
                src={logo}
                className="h-11 w-auto rounded"
              />
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4 ">
                {navigation.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => handleScroll(item.href)}
                    className={classNames(
                      "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "rounded-md px-3 py-2 text- font-medium"
                    )}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>

            <Menu as="div" className="relative ml-3">
              <div>
                <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span className="absolute -inset-1.5" />
                  <Dropdown overlay={""} trigger={["click"]}>
                    <Button
                      type="text"
                      icon={<UserOutlined />}
                      style={{
                        color: "#fff",
                        border: "none",
                        background: "transparent",
                        fontSize: "16px",
                      }}
                    >
                      <DownOutlined />
                    </Button>
                  </Dropdown>
                </MenuButton>
              </div>
              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
              >
                <MenuItem className="text-center">
                  <a
                    href="/login"
                    className="block px-2 py-2 font-semibold text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                  >
                    School Login
                  </a>
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map((item) => (
            <button
              key={item.name}
              onClick={() => handleScroll(item.href)}
              className={classNames(
                "block text-gray-300 hover:bg-gray-700 hover:text-white",
                "rounded-md px-3 py-2 text-base font-medium"
              )}
            >
              {item.name}
            </button>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
