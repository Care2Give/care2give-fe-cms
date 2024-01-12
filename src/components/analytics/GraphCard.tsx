import React from "react";
import Card from "../shared/Card";
import useAnalyticsStore from "@/stores/useAnalyticsStore";
import useChartConfig from "@/lib/useDemoConfig";
import { AxisOptions } from "react-charts";
import dynamic from "next/dynamic";
import { mmddFormatter } from "@/lib/utils";
import GraphCardHeader from "./GraphCardHeader";
import GraphCardSidebar from "./GraphCardSidebar";

const Chart = dynamic(() => import("react-charts").then((mod) => mod.Chart), {
  ssr: false,
});

const GraphCard = () => {
  const { graphType } = useAnalyticsStore();

  const { data } = useChartConfig({
    series: 3,
    dataType: "time",
  });

  const linePrimaryAxis = React.useMemo<
    AxisOptions<(typeof data)[number]["data"][number]>
  >(
    () => ({
      getValue: (datum) => datum.primary as Date,
    }),
    []
  ) as AxisOptions<unknown>;

  const barPrimaryAxis = React.useMemo<
    AxisOptions<(typeof data)[number]["data"][number]>
  >(
    () => ({
      getValue: (datum) => mmddFormatter(datum.primary as Date),
    }),
    []
  ) as AxisOptions<unknown>;

  const secondaryAxes = React.useMemo<
    AxisOptions<(typeof data)[number]["data"][number]>[]
  >(
    () => [
      {
        getValue: (datum) => datum.secondary,
      },
    ],
    []
  ) as AxisOptions<unknown>[];

  const secondaryStackedAxes = React.useMemo<
    AxisOptions<(typeof data)[number]["data"][number]>[]
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
        <Graph
          options={{
            data,
            primaryAxis:
              graphType === "line" ? linePrimaryAxis : barPrimaryAxis,
            secondaryAxes:
              graphType === "bar" ? secondaryStackedAxes : secondaryAxes,
          }}
        />
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
