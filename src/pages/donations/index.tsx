import Layout from "@/components/layout";
import Table from "@/components/donations/table";
import Header from "@/components/donations/Header";
import useClerkSWR from "@/lib/useClerkSWR";
import { Skeleton } from "@/components/ui/skeleton";

export default function Donations() {
  const { data, error } = useClerkSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/v1/cms/donations`
  );

  if (error) return null;

  return (
    <Layout>
      <Header />
      {data ? (
        <Table data={data} />
      ) : (
        <>
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="w-full h-16 rounded-xl" />
          ))}
        </>
      )}
    </Layout>
  );
}
