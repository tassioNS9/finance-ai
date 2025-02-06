import {
  PiggyBankIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  WalletIcon,
} from "lucide-react";
import SummaryCard from "./summary-card";
import { db } from "@/app/_lib/prisma";

interface SummaryCards {
  month: string;
  //   balance: number;
  //   depositsTotal: number;
  //   investmentsTotal: number;
  //   expensesTotal: number;
  //   userCanAddTransaction?: boolean;
}

const SummaryCards = async ({ month }: SummaryCards) => {
  // Pega as trasações do tipo DEPOSIT e soma todos os valores

  const where = {
    date: {
      gte: new Date(`2025-${month}-01`),
      lt: new Date(`2025-${month}-31`),
    },
  };
  const depositsTotal = (
    await db.transaction.aggregate({
      where: { ...where, type: "DEPOSIT" },
      _sum: {
        amount: true,
      },
    })
  )?._sum?.amount;

  const investmentsTotal = (
    await db.transaction.aggregate({
      where: { ...where, type: "INVESTMENT" },
      _sum: {
        amount: true,
      },
    })
  )?._sum?.amount;
  const expensesTotal = (
    await db.transaction.aggregate({
      where: { ...where, type: "EXPENSE" },
      _sum: {
        amount: true,
      },
    })
  )?._sum?.amount;
  const balance =
    Number(depositsTotal) - Number(investmentsTotal) - Number(expensesTotal);
  return (
    <div className="space-y-6">
      {/* PRIMEIRO CARD */}

      <SummaryCard
        icon={<WalletIcon size={16} />}
        title="Saldo"
        amount={balance}
        size="large"
        // userCanAddTransaction={userCanAddTransaction}
      />

      {/* OUTROS CARDS */}
      <div className="grid grid-cols-3 gap-6">
        <SummaryCard
          icon={<PiggyBankIcon size={16} />}
          title="Investido"
          amount={Number(investmentsTotal)}
        />
        <SummaryCard
          icon={<TrendingUpIcon size={16} className="text-primary" />}
          title="Receita"
          amount={Number(depositsTotal)}
        />
        <SummaryCard
          icon={<TrendingDownIcon size={16} className="text-red-500" />}
          title="Despesas"
          amount={Number(expensesTotal)}
        />
      </div>
    </div>
  );
};

export default SummaryCards;
