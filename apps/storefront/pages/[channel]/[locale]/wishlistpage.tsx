import { Layout } from "@/components";
import Wishlist from "@/components/Wishlist";
import React, { ReactElement } from "react";

const wishlistpage = () => {
  return (
    <div>
      <Wishlist />
    </div>
  );
};

export default wishlistpage;

wishlistpage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
