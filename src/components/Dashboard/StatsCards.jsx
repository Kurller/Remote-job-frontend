export default function StatsCards() {
  const stats = [
    { label: "Total CVs", value: 3 },
    { label: "Jobs Applied", value: 5 },
    { label: "Interviews", value: 1 },
  ];

  return (
    <div className="flex gap-4 flex-wrap">
      {stats.map((stat, i) => (
        <div
          key={i}
          className="flex-1 min-w-[200px] bg-white p-5 rounded shadow text-center"
        >
          <h3 className="text-gray-500">{stat.label}</h3>
          <p className="text-3xl font-bold">{stat.value}</p>
        </div>
      ))}
    </div>
  );
}
