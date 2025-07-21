export default function Card({ employee }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-md hover:shadow-lg transition-all flex flex-col gap-2">
      <div className="flex items-center gap-4">
        <img src={employee.avatar} alt="avatar" className="w-12 h-12 rounded-full" />
        <div>
          <h2 className="text-lg font-semibold">{employee.name}</h2>
          <p className="text-sm text-gray-500">{employee.email}</p>
        </div>
      </div>

      <p className="text-sm text-gray-700 dark:text-gray-300">
        Age: {employee.age} | Dept: {employee.department}
      </p>

      <div className="flex items-center gap-2">
        {/* Rating logic */}
        {"★".repeat(employee.rating)}{"☆".repeat(5 - employee.rating)}
      </div>

      <div className="flex gap-2 mt-2">
        <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
          View
        </button>
        <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
          Bookmark
        </button>
      </div>
    </div>
  );
}
