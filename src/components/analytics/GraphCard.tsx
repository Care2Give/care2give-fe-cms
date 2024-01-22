import React, {useEffect} from "react";
import Card from "../shared/Card";
import useAnalyticsStore from "@/stores/useAnalyticsStore";
import { AxisOptions } from "react-charts";
import dynamic from "next/dynamic";
import { mmddFormatter } from "@/lib/utils";
import GraphCardHeader from "./GraphCardHeader";
import GraphCardSidebar from "./GraphCardSidebar";
import useClerkSWR from "@/lib/useClerkSWR";
import {DetailedCampaign} from "@/types/analytics/DetailedCampaign";
import Spinner from "@/components/shared/Spinner";

const Chart = dynamic(() => import("react-charts").then((mod) => mod.Chart), {
  ssr: false,
});

export const defaultColors = ["#1DCF9E", "#5185FF", "#FF5757", "#F8DF71"];

const GraphCard = () => {
  const { graphType, graphYAxis, graphStartDate, graphEndDate, graphInterval, setSelectedCampaigns, setAllCampaigns, selectedCampaigns } = useAnalyticsStore();

  const { data : fullData, error, isLoading } = useClerkSWR(`${process.env.NEXT_PUBLIC_API_URL}/v1/cms/analytics/detail-campaigns?filter=${graphInterval}&startDate=${graphStartDate.toISOString()}&endDate=${graphEndDate.toISOString()}`)

  const dataTyped: DetailedCampaign[] = fullData ? fullData[graphYAxis] : [];
  const graphData = dataTyped.map(campaign => ({
      label: campaign.title,
      data: campaign.series.map(dataPoint => ({
          primary: new Date(dataPoint.time),
          secondary: dataPoint.value
      }))
  }));

  const filteredGraphData = graphData.filter(campaign => selectedCampaigns.includes(campaign.label));

  useEffect(() => {
      const allCampaigns = dataTyped.map((data) => data.title);
      setAllCampaigns(allCampaigns);
      setSelectedCampaigns(allCampaigns);
  }, [fullData])


  const linePrimaryAxis = React.useMemo<
    AxisOptions<(typeof dataTyped)[number]["data"][number]>
  >(
    () => ({
      getValue: (datum) => datum.primary as Date,
    }),
    []
  ) as AxisOptions<unknown>;

  const barPrimaryAxis = React.useMemo<
    AxisOptions<(typeof dataTyped)[number]["data"][number]>
  >(
    () => ({
      getValue: (datum) => mmddFormatter(datum.primary as Date),
    }),
    []
  ) as AxisOptions<unknown>;

  const secondaryAxes = React.useMemo<
    AxisOptions<(typeof dataTyped)[number]["data"][number]>[]
  >(
    () => [
      {
        getValue: (datum) => datum.secondary,
      },
    ],
    []
  ) as AxisOptions<unknown>[];

  const secondaryStackedAxes = React.useMemo<
    AxisOptions<(typeof dataTyped)[number]["data"][number]>[]
  >(
    () => [
      {
        getValue: (datum) => datum.secondary,
        stacked: true,
      },
    ],
    []
  ) as AxisOptions<unknown>[];

  return (
    <Card>
      <GraphCardHeader />
      <div className="my-4 flex gap-8">
      {
          isLoading
            ? <Spinner />
            : <Graph
                  options={{
                      defaultColors: defaultColors,
                      data: filteredGraphData.length === 0 ? [{label: "", data: [{primary: graphStartDate, secondary: 0}]}] : filteredGraphData,
                      primaryAxis:
                          graphType === "line" ? linePrimaryAxis : barPrimaryAxis,
                      secondaryAxes:
                          graphType === "bar" ? secondaryStackedAxes : secondaryAxes,
                  }}
              />
      }
      <GraphCardSidebar />
      </div>
    </Card>
  );
};

function Graph({ ...props }: React.ComponentProps<typeof Chart>) {
  return (
    <div className="flex-1 min-h-96 ">
      <Chart {...props} />
    </div>
  );
}

export default GraphCard;
