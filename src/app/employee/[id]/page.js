import EmployeeTabs from '@/app/EmployeeTabs';

export async function generateStaticParams() {
  const res = await fetch('https://dummyjson.com/users?limit=30');
  const data = await res.json();

  return data.users.map((user) => ({
    id: user.id.toString(),
  }));
}

async function getUser(id) {
  const res = await fetch(`https://dummyjson.com/users/${id}`);
  const data = await res.json();

  return {
    ...data,
    department: ['Engineering', 'Marketing', 'Sales', 'HR'][Math.floor(Math.random() * 4)],
    rating: Math.floor(Math.random() * 5) + 1,
  };
}

export default async function EmployeePage({ params }) {
  const user = await getUser(params.id);

  return (
    <div className="flex items-center space-x-4 p-4 border rounded-md shadow-sm">
      <img
        src={`https://api.dicebear.com/7.x/shapes/svg?seed=${user.id}`}
        alt={user.firstName}
        className="w-16 h-16"
      />

      <div>
        <h2 className="text-xl font-bold text-gray-900">
          {user.firstName} {user.lastName}
        </h2>
        <p className="text-gray-600">{user.email}</p>
        <p className="text-sm text-gray-700 mt-1">
          Age: {user.age} | Dept: {user.department}
        </p>
      </div>
      <EmployeeTabs user={user} />
    </div>
  );
}