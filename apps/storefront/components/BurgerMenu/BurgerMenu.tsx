import clsx from "clsx";
import { useMainMenuQuery } from "@/saleor/api";

import NavIconButton from "../Navbar/NavIconButton";
import { useRegions } from "../RegionsProvider";
import styles from "./BurgerMenu.module.css";
import { CollapseMenu } from "./CollapseMenu";

export interface BurgerMenuProps {
  open?: boolean;
  onCloseClick?: () => void;
  externalCheckoutUrl: string;
}

export function BurgerMenu({ open, onCloseClick }: BurgerMenuProps) {
  const { query } = useRegions();

  const { error, data } = useMainMenuQuery({
    variables: { ...query },
  });

  if (error) {
    console.error("BurgerMenu component error", error.message);
  }

  const menu = data?.menu?.items || [];

  return (
    <div
      className={clsx(styles.container, {
        [styles["container--open"]]: open,
      })}
    >
      <div className={styles.backdrop} aria-hidden="true" onClick={onCloseClick} />
      <div className={styles.body}>
        <div className="flex justify-start items-center w-fit mb-5 bg-grey py-2 px-4 rounded-2xl">
          <NavIconButton icon="back" onClick={onCloseClick} />
          <p className="text-[16px] font-semibold ml-2">back</p>
        </div>
        {/* <Link href={paths.$url()} passHref legacyBehavior>
        <h1 className="text-main !text-[18px] leading-[1.2em] font-semibold block w-full text-left mb-[2.4000000000000004rem]">Home</h1>
            </Link>
            <Link href={paths.search.$url()} passHref legacyBehavior>
            <h1 className="text-main !text-[18px] leading-[1.2em] font-semibold block w-full text-left mb-[2.4000000000000004rem]">Search</h1>
            </Link>
            <Link href={externalCheckoutUrl} passHref legacyBehavior>
            <h1 className="text-main !text-[18px] leading-[1.2em] font-semibold block w-full text-left mb-[2.4000000000000004rem]">Cart</h1>
            </Link> */}
        <div className="px-6 py-2">
          {menu.map((item) => (
            <CollapseMenu menuItem={item} key={item.id} />
          ))}
        </div>

        {/* <div className="mt-auto pt-4">
          <div className="flex flex-col">
            {authenticated ? (
              <>
                <Link href={paths.account.preferences.$url()} passHref legacyBehavior>
                  <a tabIndex={0} className={styles["burger-link"]} href="pass">
                    {t.formatMessage(messages.menuAccountPreferences)}
                  </a>
                </Link>
                <button
                  type="button"
                  onClick={onLogout}
                  tabIndex={-1}
                  className={styles["burger-link"]}
                >
                  {t.formatMessage(messages.logOut)}
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => router.push(paths.account.login.$url())}
                tabIndex={-1}
                className={styles["burger-link"]}
              >
                {t.formatMessage(messages.logIn)}
              </button>
            )}
          </div>
        </div> */}
        {/* <div className="flex mt-4 gap-4">
          <ChannelDropdown />
          <LocaleDropdown />
        </div> */}
      </div>
    </div>
  );
}

export default BurgerMenu;
