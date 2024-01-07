import Layout from "@/components/layout";
import Header from "@/components/campaigns/Header";
import SubHeader from "@/components/campaigns/edit/SubHeader"
import Footer from "@/components/campaigns/edit/Footer";
import {useState} from "react";
import { EditStage } from "./edit-stage";

export default function Index() {
    const [editStage, setEditStage] = useState(EditStage.Edit);

    return (
        <Layout>
            <Header />
            <SubHeader editStage={editStage} setEditStage={setEditStage}/>
            <div>This is the page to edit campaigns</div>
            <Footer editStage={editStage} setEditStage={setEditStage}/>
        </Layout>
    );
}
