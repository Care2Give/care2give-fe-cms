import Layout from "@/components/layout";
import Header from "@/components/campaigns/Header";
import SubHeader from "@/components/campaigns/edit/SubHeader"
import Footer from "@/components/campaigns/edit/Footer";
import {useState} from "react";
import { EditStage } from "./edit-stage";
import EditCampaign from "@/components/campaigns/edit/EditCampaign";
import PreviewSite from "@/components/campaigns/edit/PreviewSite";

export default function Index() {
    const [editStage, setEditStage] = useState(EditStage.Edit);
    return (
        <Layout>
            <Header />
            <SubHeader editStage={editStage} setEditStage={setEditStage}/>
            {
                editStage === EditStage.Edit && <EditCampaign setEditStage={setEditStage}/>
            }
            { editStage === EditStage.Preview && <PreviewSite />}
            <Footer editStage={editStage} setEditStage={setEditStage}/>
        </Layout>
    );
}
