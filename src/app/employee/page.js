
import Badge from '@/app/(components)/Badge';
import Image from 'next/image';

const getUser = async (id) => {
  const res = await fetch(`https://dummyjson.com/users/${id}`);
  if (!res.ok) throw new Error('User not found');
  const user = await res.json();
  user.department = ['Engineering', 'Marketing', 'Sales', 'HR'][Math.floor(Math.random() * 4)];
  user.rating = Math.floor(Math.random() * 5) + 1;
  return user;
};

const getRatingBadgeColor = (rating) => {
  if (rating >= 4) return 'bg-green-500';
  if (rating >= 3) return 'bg-yellow-500';
  return 'bg-red-500';
};

export async function generateStaticParams() {
  const res = await fetch('https://dummyjson.com/users?limit=20');
  const data = await res.json();
  return data.users.map((user) => ({ id: user.id.toString() }));
}

const EmployeePage = async ({ params }) => {
  const user = await getUser(params.id);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
      <div className="flex items-center space-x-4">
        <Image
          src={user.image}
          alt={user.firstName}
          width={96}
          height={96}
          className="rounded-full"
        />
        <div>
          <h1 className="text-3xl font-bold">{`${user.firstName} ${user.lastName}`}</h1>
          <p className="text-gray-500 dark:text-gray-400">{user.email}</p>
          <div className="flex items-center mt-2">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-6 h-6 ${i < user.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.96a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.368 2.448a1 1 0 00-.364 1.118l1.287 3.96c.3.921-.755 1.688-1.539 1.118l-3.368-2.448a1 1 0 00-1.176 0l-3.368 2.448c-.783.57-1.838-.197-1.539-1.118l1.287-3.96a1 1 0 00-.364-1.118L2.24 9.387c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.96z" />
              </svg>
            ))}
            <Badge
              text={`${user.rating} Stars`}
              color={getRatingBadgeColor(user.rating)}
              className="ml-2"
            />
          </div>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-bold">Details</h3>
        <p>Address: {`${user.address.address}, ${user.address.city}`}</p>
        <p>Phone: {user.phone}</p>
        <p>Department: {user.department}</p>
      </div>
    </div>
  );
};

export default EmployeePage;
