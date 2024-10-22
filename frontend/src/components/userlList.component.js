import { useEffect, useState } from 'react';
import BASE_URL from '../utils/config';
import axios from 'axios';

const UserList = ({ usersData }) => {
  const [users, setUsers] = useState(usersData);

  return (
    <div>
      <div class="flow-root">
        <ul role="list" class="divide-y divide-gray-200 carousel carousel-vertical w-full rounded-box">
          {users.map((user, index) => (
            <li key={index} class="px-3 py-[14px] cursor-pointer">
              <div class="flex items-center space-x-2">
                <div class="flex-shrink-0">
                  <img class="w-8 h-8 rounded-full" src={`${BASE_URL}uploads/${user.user_id.image}`} alt="Profile" />
                </div>
                <div class="flex-1 min-w-0 ">
                  <p class="text-sm font-medium text-gray-900 truncate">
                    {user.user_id.username}
                  </p>
                </div>
                <div class=" items-center text-base font-semibold text-gray-900 ">
                  {user.role === 'projectManager' &&
                    <span class="bg-green-100 text-green-800 text-xs font-medium  px-2.5 py-0.5 rounded">Manager</span>}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserList;
