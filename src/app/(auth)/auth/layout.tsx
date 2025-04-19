import { ReactNode, Suspense } from "react";

type Props = {
  children: ReactNode;
};

export default function AuthLayout({ children }: Props) {
  return (
    <div>
      <Suspense>{children}</Suspense>
    </div>
  );
}
