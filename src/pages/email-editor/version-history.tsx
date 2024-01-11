import CurrentTemplate from "@/components/email-editor/version-history/CurrentTemplate";
import Header from "@/components/email-editor/version-history/Header";
import PreviousTemplates from "@/components/email-editor/version-history/PreviousTemplates";
import Layout from "@/components/layout";
import useClerkSWR from "@/lib/useClerkSWR";
import useEmailEditorStore from "@/stores/useEmailEditorStore";
import { useEffect } from "react";

export default function VersionHistory() {
  const { data, error } = useClerkSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/v1/cms/email-editor/version-history`
  );
  const { setEmails } = useEmailEditorStore();

  useEffect(() => {
    if (data) {
      setEmails(data);
    }
  }, [data]);

  if (error) return null;

  return (
    <Layout>
      <Header />
      {data && <CurrentTemplate email={[data[0]]} />}
      {data && data?.length > 1 && <PreviousTemplates emails={data.slice(1)} />}
    </Layout>
  );
}
