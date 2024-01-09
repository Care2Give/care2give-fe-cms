import Header from "@/components/campaigns/Header";
import Table from "@/components/campaigns/table";
import Layout from "@/components/layout";
import { CampaignTable } from "@/types/campaigns/CampaignTable";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

export default function Campaigns({
  campaigns,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Layout>
      <Header />
      <Table campaigns={campaigns} />
    </Layout>
  );
}

export const getServerSideProps = (async (context) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/v1/cms/campaigns`,
    {
      headers: {
        Authorization: `Bearer ${context.req.cookies["__session"]}`,
      },
    }
  );

  const campaigns: CampaignTable[] = await res.json();

  return { props: { campaigns } };
}) satisfies GetServerSideProps<{ campaigns: CampaignTable[] }>;
