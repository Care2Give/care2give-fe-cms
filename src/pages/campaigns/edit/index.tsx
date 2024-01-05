import Layout from "@/components/layout";
import Header from "@/components/campaigns/Header";
import SubHeader from "@/components/campaigns/edit/SubHeader"
export default function Index() {
    return (
        <Layout>
            <Header />
            <SubHeader />
            <div>This is the page to edit campaigns</div>
        </Layout>
    );
}
