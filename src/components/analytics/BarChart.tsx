import { Montserrat } from "next/font/google";

type BarProps = {
  xLabel: string;
  yLabel: string;
  height: number;
  color: string;
  highlightColor: string;
}

type BarChartDataProps = {
  xLabel: string;
  yLabel: string;
  scale: number;
}

const COLORS: string[] = [
  "#1dcf9e",
  "#ff5757",
  "#5185ff",
  "#fae794",
  "#17a67e",
  "#cc4646",
  "#416acc",
  "#c6b25a"
]

const montserrat = Montserrat({
  subsets: ["latin"],
  style: ["normal"],
  weight: ["400"],
});

export default function BarChart(data: BarChartDataProps[]) {
  const dataArray = Object.values(data).slice(0, 4)
  const maximum_amount = dataArray.reduce((max, obj) => obj.scale > max ? obj.scale : max, 0)

  return(
    <div className='flex space-between h-full w-full relative'>
      {
        dataArray.map((barProps, idx) => 
          <Bar
            key={idx}
            {...barProps}
            height={barProps.scale / maximum_amount * 100}
            color={COLORS[idx]}
            highlightColor={COLORS[idx + 4]}/>
        )
      }
    </div>
    
  )
}

const Bar = ({xLabel, yLabel, height, color, highlightColor }: BarProps) => {
  return(
    <div style={{height: `${height}%`, width: '30px', backgroundColor: `${color}`}} className='mx-1 mt-auto relative'>
      <div className='h-2' style={{backgroundColor: `${highlightColor}`}}></div>
      <div className={`${montserrat.className} text-xs w-full text-center text-white my-0.5`}>{yLabel}</div>
      <div className={`${montserrat.className} text-xs w-full text-center text-white absolute bottom-0 my-0.5`}>{xLabel}</div>
    </div>
  )
}