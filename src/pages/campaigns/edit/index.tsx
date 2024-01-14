import Layout from "@/components/layout";
import Header from "@/components/campaigns/Header";
import SubHeader from "@/components/campaigns/edit/SubHeader";
import Footer from "@/components/campaigns/edit/Footer";
import { useState } from "react";
import { EditStage } from "@/components/campaigns/edit/edit-stage";
import EditCampaign from "@/components/campaigns/edit/EditCampaign";
import PreviewSite from "@/components/campaigns/edit/PreviewSite";
import { PublishDialog } from "@/components/campaigns/edit/PublishDialog";

export default function Index() {
  const [editStage, setEditStage] = useState(EditStage.Edit);

  if (editStage === EditStage.Preview) {
    return <PreviewSite setEditStage={setEditStage} />;
  }
  return (
    <Layout>
      <Header />
      <SubHeader editStage={editStage} setEditStage={setEditStage} />
      <EditCampaign setEditStage={setEditStage} />
      {editStage === EditStage.Publish && (
        <PublishDialog setEditStage={setEditStage} />
      )}
      <Footer editStage={editStage} />
    </Layout>
  );
}
