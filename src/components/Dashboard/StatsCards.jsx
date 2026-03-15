export default function StatsCards() {
  const stats = [
    { label: "Total CVs", value: 3 },
    { label: "Jobs Applied", value: 5 },
    { label: "Interviews", value: 1 },
  ];

  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {stats.map((stat, i) => (
        <div
          key={i}
          className="flex-1 min-w-[150px] max-w-[300px] bg-white p-5 rounded-lg shadow text-center"
        >
          <h3 className="text-gray-500 text-sm sm:text-base">{stat.label}</h3>
          <p className="text-2xl sm:text-3xl font-bold mt-2">{stat.value}</p>
        </div>
      ))}
    </div>
  );
}