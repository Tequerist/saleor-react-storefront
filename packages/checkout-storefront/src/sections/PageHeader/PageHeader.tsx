import { SaleorLogo } from "@/checkout-storefront/images";
import { getSvgSrc } from "@/checkout-storefront/lib/svgSrc";
import { LanguageSelect } from "@/checkout-storefront/sections/PageHeader/LanguageSelect";
import Link from "next/link";

export const PageHeader = () => {
  return (
    <div className="page-header">
      {/* <img src='' alt="logo" className="logo" /> */}
      <Link href={"default-channel/en-US/"} passHref legacyBehavior>
        <a href="pass" className="">
          <p style={{ fontSize: "15px" }}> Back to Home </p>
        </a>
      </Link>
      <LanguageSelect />
    </div>
  );
};
