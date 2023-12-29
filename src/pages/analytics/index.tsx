import Header from "@/components/analytics/Header";
import Layout from "@/components/layout";
import useIsLoggedIn from "@/lib/useIsLoggedIn";
import BarChartCard from "@/components/analytics/BarChartCard"
import CampaignTable from "@/components/analytics/CampaignTable";
import PopularTable from "@/components/analytics/PopularTable";

const dummyCampaignDetails = [
  {
    campaign: "Charity Dinner 2020",
    amount: 10230,
    trend: true
  },
  {
    campaign: "Smell Good, Feel Good, Do Good",
    amount: 6040,
    trend: false
  },
  {
    campaign: "Providing Housing Advice",
    amount: 5300,
    trend: true
  },
  {
    campaign: "Hidden Heroes",
    amount: 1300,
    trend: true
  },
]

const dummyPopularDetails = [
  {
    campaign: "Charity Dinner 2020",
    amount: 20,
    numberOfDonors: 62
  },
  {
    campaign: "Charity Dinner 2020",
    amount: 100,
    numberOfDonors: 46
  },
  {
    campaign: "Smell Good, Feel Good, Do Good",
    amount: 50,
    numberOfDonors: 23
  },
  {
    campaign: "Providing Housing Advice",
    amount: 20,
    numberOfDonors: 21
  },
  {
    campaign: "Smell Good, Feel Good, Do Good",
    amount: 10,
    numberOfDonors: 18
  },
  {
    campaign: "Providing Housing Advice",
    amount: 10,
    numberOfDonors: 18
  },
  {
    campaign: "Smell Good, Feel Good, Do Good",
    amount: 10,
    numberOfDonors: 17
  },
  {
    campaign: "Charity Dinner 2020",
    amount: 10,
    numberOfDonors: 10
  },
  {
    campaign: "Charity Dinner 2020",
    amount: 500,
    numberOfDonors: 4
  },
]

export default function Analytics() {
  useIsLoggedIn();

  const campaignDetails = dummyCampaignDetails.map(campaign => ({xLabel: "", yLabel: `$${Math.floor(campaign.amount/1000)}+`, scale: campaign.amount}))
  const popularDetails = dummyPopularDetails.map(campaign => ({xLabel: `$${campaign.amount}`, yLabel: `${campaign.numberOfDonors}`, scale: campaign.numberOfDonors}))
  
  return (
    <Layout>
      <Header />
      <div className='flex space-between w-full'>
        <BarChartCard title="Campaigns" barChartDetails={campaignDetails} tableDetails={dummyCampaignDetails} Table={CampaignTable}/>
        <BarChartCard title="Most Popular Amounts" barChartDetails={popularDetails} tableDetails={dummyPopularDetails} Table={PopularTable}/>
      </div>
    </Layout>
  );
}
