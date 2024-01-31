import React from "react";
import { AxisOptions } from "react-charts";

// very yucky workaround for importing react-charts
import dynamic from "next/dynamic";
import { addDays, differenceInDays } from "date-fns";
import { mmddFormatter } from "@/lib/utils";

import { useEffect } from "react";
import useClerkSWR from "@/lib/useClerkSWR";

const Chart = dynamic(() => import("react-charts").then((mod) => mod.Chart), {
  ssr: false,
});

type BarGraphProps = {
  startDate: Date;
  endDate: Date;
};

export default function BarGraph({ startDate, endDate }: BarGraphProps) {
  const length = differenceInDays(endDate, startDate) + 1; // Inclusive of end

  useEffect(() => {}, [startDate, endDate]);

  let { data, error } = useClerkSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/v1/cms/homepage-analytics/daily-donations?first=` +
      startDate +
      "&second=" +
      endDate
  );

  /**
   * IMPT: required to name variable as data, and respective properties for Chart component to process
   * Colour is dependent on the series (the object in data array) for a respective group of bar graphs
   * Series 1: Blue, Series 2: Orange
   */
  data = [
    {
      label: "Total Donation",
      data: [...new Array(length)].map((_, i) => {
        const currentDate = addDays(startDate, i);
        const currentDateString = currentDate.toISOString().split("T")[0];
        const donationAmount =
          data && currentDateString in data ? data[currentDateString] : 0;

        return {
          date: mmddFormatter(currentDate),
          donationAmt: donationAmount ? donationAmount : 0,
        };
      }),
    },
  ];

  /**
   * In AxisOptions<type>: Depending on the type inferred from the "date" attribute, different graphs are generated.
   * If we have Date type in "date" attribute, this generates a Line Graph
   * If we have string type in "date" attribute, then it generates a Bar Graph
   */
  const primaryAxis = React.useMemo<
    AxisOptions<(typeof data)[number]["data"][number]>
  >(
    () => ({
      getValue: (datum) => datum.date,
    }),
    []
  ) as AxisOptions<unknown>;

  const secondaryAxes = React.useMemo<
    AxisOptions<(typeof data)[number]["data"][number]>[]
  >(
    () => [
      {
        getValue: (datum) => datum.donationAmt,
      },
    ],
    []
  ) as AxisOptions<unknown>[];

  if (error) return null;

  return (
    <div className="min-h-[350px]">
      <Chart
        options={{
          data,
          primaryAxis,
          secondaryAxes,
        }}
      />
    </div>
  );
}
