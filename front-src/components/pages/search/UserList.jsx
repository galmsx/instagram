import React from 'react';
import UserInfo from '../../UserInf';

function UserList({users}){
return <div className="user-list">
{users.map(u=><UserInfo id={u.id} big={true} />)}
</div>;
}
export default UserList;