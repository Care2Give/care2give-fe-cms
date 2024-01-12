import Header from "@/components/campaigns/Header";
import Table from "@/components/campaigns/table";
import Layout from "@/components/layout";
import { Skeleton } from "@/components/ui/skeleton";
import useClerkSWR from "@/lib/useClerkSWR";

export default function Campaigns() {
  const { data, error } = useClerkSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/v1/cms/campaigns`
  );

  if (error) return null;

  return (
    <Layout>
      <Header />
      {data ? (
        <Table campaigns={data} />
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
