import { ConnectButton } from "@rainbow-me/rainbowkit";
import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-zinc-200 flex justify-end p-8 ">
      <ConnectButton />
    </nav>
  );
};

export default Navbar;
