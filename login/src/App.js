import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [loading, setLoading]=useState();

  const onSubmitHandler = async (event) =>{
    event.preventDefault();

    if(!id || !pw){
      alert('아이디 또는 패스워드 값 입력이 없습니다.');
      return;
    }

    setLoading(true);

    setTimeout(async () => {
      try {
        const response = await axios.post('http://localhost:8000/user/login', { id, pw });
        //alert("로그인했당");
        //console.log(response.data);
        const{result:{userId, AccessToken}} = response.data;
        localStorage.setItem('token',AccessToken);
        localStorage.setItem('id',userId);
      } finally {
        setLoading(false);
      }
    }, 1500);
  }

  /*const onSubmitHandler = async (event) =>{
    event.preventDefault();
    const id = event.target.id.value;
    const pw = event.target.pw.value;
    await axios.post('http://localhost:8000/user/login',{id,pw});
  };*/

  return (
    <div className="App">
      <form onSubmit={onSubmitHandler}>
        <input type="text" name="id" placeholder="아이디" value={id} onChange={(event)=>setId(event.target.value)}/>
        <input type="password" name="pw" placeholder="비밀번호" value={pw} onChange={(event)=>setPw(event.target.value)}/> 
        <input type="submit" value="로그인" disabled={loading}/>
        {loading && <p>Loading...</p>}
      </form>
    </div>
  );
}

export default App;
