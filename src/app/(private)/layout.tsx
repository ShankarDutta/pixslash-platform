import PrivateHeader from "@/components/Header/PrivateHeader";
import { RootLayoutProps } from "@/lib/type";

const PrivateLayout = ({ children }: RootLayoutProps) => {
  return (
    <>
      <PrivateHeader />
      <main className="mx-auto max-w-7xl">{children}</main>
    </>
  );
};

export default PrivateLayout;