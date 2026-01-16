"use client";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

interface AllocationChartProps {
  fb: number;
  gg: number;
  tt: number;
}

export function AllocationChart({ fb, gg, tt }: AllocationChartProps) {
  // Define colors consistent with the design and image provided
  const channelColors = {
    fb: "#7c3aed", // Purple for Facebook
    gg: "#3f3f46", // Dark Gray for Google to match the image
    tt: "#ffffff", // White for TikTok
  };

  const activeChannels = [];
  if (fb > 0) {
    activeChannels.push({ name: "FB", value: fb, color: channelColors.fb });
  }
  if (gg > 0) {
    activeChannels.push({ name: "GG", value: gg, color: channelColors.gg });
  }
  if (tt > 0) {
    activeChannels.push({ name: "TT", value: tt, color: channelColors.tt });
  }
  
  const hasData = activeChannels.length > 0;

  const data = {
    labels: hasData ? activeChannels.map(c => `${c.name} ${c.value}%`) : ['No Data'],
    datasets: [
      {
        data: hasData ? activeChannels.map(c => c.value) : [100],
        backgroundColor: hasData ? activeChannels.map(c => c.color) : ['#27272a'],
        borderColor: "#050505",
        borderWidth: 10,
        hoverBorderWidth: 10,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    cutout: "80%",
    plugins: {
      legend: {
        display: false, // The legend is now displayed in the center via HTML
      },
      tooltip: {
        enabled: hasData, // Disable tooltips if there is no data
      },
    },
  };

  return (
    <div className="relative w-full h-full">
      <Doughnut data={data} options={options} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-start justify-center gap-y-2">
        {hasData ? (
          activeChannels.map((channel) => (
            <div key={channel.name} className="flex items-center gap-x-3">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: channel.color }}
              ></span>
              <span className="text-white font-semibold text-base tracking-wider">
                {channel.name} {channel.value}%
              </span>
            </div>
          ))
        ) : (
          <div className="text-zinc-500 font-semibold text-base">No Data</div>
        )}
      </div>
    </div>
  );
}