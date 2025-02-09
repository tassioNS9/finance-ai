"use client";

import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  return (
    <nav className="flex justify-between border-b border-solid px-8 py-4 max-md:overflow-x-auto">
      {/* ESQUERDA */}
      <div className="flex w-full items-center gap-10">
        <Image
          src="/logo.svg"
          width={173}
          height={39}
          alt="Finance AI"
          style={{ width: "auto", height: "auto" }}
        />
        <Link
          href="/"
          className={
            pathname === "/"
              ? "font-bold text-primary"
              : "text-muted-foreground"
          }
        >
          Dashboard
        </Link>
        <Link
          href="/transactions"
          className={
            pathname === "/transactions"
              ? "font-bold text-primary"
              : "text-muted-foreground"
          }
        >
          Transações
        </Link>
        <Link
          href="/subscription"
          className={
            pathname === "/subscription"
              ? "font-bold text-primary"
              : "text-muted-foreground"
          }
        >
          Assinatura
        </Link>
        <div className="flex w-full justify-end pr-3">
          <UserButton showName />
        </div>
      </div>

      {/* DIREITA */}
    </nav>
  );
};

export default Navbar;
