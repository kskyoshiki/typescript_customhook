import { useState } from 'react';
import './App.css';
import { UserCard } from './components/UserCard';
import { User } from './types/api/user';
import { UserProfile } from './types/userProfile';
import axios from 'axios';

const user = {
  id: 1,
  name: '吉木敬祐',
  email: '111@example.com',
  address: '日本国',
};

function App() {
  const [userProfiles, setUserProfiles] = useState<Array<UserProfile>>([]);

  const onClickFetchUser = () => {
    axios
      .get<Array<User>>('https://jsonplaceholder.typicode.com/users')
      .then((res) => {
        const data = res.data.map((user) => ({
          id: user.id,
          name: `${user.name}(${user.username})`,
          email: user.email,
          address: `${user.address.city}${user.address.suite}${user.address.street}`,
        }));
        setUserProfiles(data);
      });
  };

  return (
    <div>
      <button onClick={onClickFetchUser}>データ取得</button>
      {userProfiles.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}

export default App;
