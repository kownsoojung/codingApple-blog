/* eslint-disable */ // warring 멘트 없애고 싶을 떄 사용

import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

// 메인페이지  (얘도 컴포넌트임)
function App() {

  // state는 사용하는 가장 최상위 컴포넌트에 만드는것이 좋음
  let post ="강남우동맛집";
  let [list, setList] = useState([{subject: '글제목1', like:0} , {subject: '글제목2', like:0} , {subject: '글제목3', like:0}, {subject: '글제목4', like:0}]); 
  let [modal, setModal] = useState(false);
  let [title, setTitle] = useState(0);
  let [inputValue, setInputValue] = useState('');
  // 모든 array에는 map 사용 가능
  // callback function(자료 개수만큼 함수안에 코드 실행함)
  [1,2,3].map(function(a){
    // array 자리에 값 넣어줌
    return '1234'; 
  });

  // 자료보관
  // subjectList => 자료보관 변수
  // setSubjectList => state변경할 수 있는 변수

  // let[num1, num2] = [1, 2] // let num = [1,2]; 와 동일
  
  // 변수와 state 차이점
  // => 변수는 html에 자동변경이 안되지만 state는 html이 자동 재랜더링이됨
  // 자주 변경될 것 같은 요소들은 state로 개발

  let [like, setLike] = useState(0);
  
  // span에 해당 함수를 넣어도됨 {addLike}
  function changeSubject(){
    // state가 array나 object면 복사하여 하기
    // let copy = subjectList 로 하는 경우 화살표복제로 변경안됨
    let copy = [...list]; // ... => 괄호를 벗겨주고 다시 씌어주세요. // 새로운 state로 인색
    copy[0].subject = '여자코트추천';
    setList(copy);
  }

  function addList() {
    
    if (  inputValue == "") {
      alert("빈값입니다.")
      return;
    }

    let copy = [...list];
    copy.unshift({subject:inputValue, like:0});
    setList(copy);
    
  }

  // html 내 조건문 쓰고 싶을 경우 삼항 연산자 사용
  // span onClick={(e)=>{ e.stopPropagation(); ==> 상위 컴포넌트 이벤트 작동 X
  return (
    <div className="App">
      <div className="black-nav">
         <h4>ReactBlog</h4>
      </div>
      <button onClick={changeSubject}>글제목수정</button>
      <button onClick={()=>{ 
        let copy = [...subjectList.sort()]; 
        setSubjectList(copy);
        } }> 가나다순정렬 </button>

     {
      list.map(function(value, i) {
        return (
          <div className='list' key={i}>
            <h4 onClick={()=>{ setModal(true);setTitle(i)}}>{value.subject}
              <span onClick={(e)=>{ e.stopPropagation();
                let copy = [...list];
                copy[i].like++;
                setList(copy);
              }}>😊</span> {value.like} 
            </h4>
            <p>2월 17일 발행</p>
            <button onClick={()=>{
              let copy = [...list];
              copy.splice(i,1); 
              setList(copy); 
            }}>삭제</button>
          </div>
          )
        })
      } 

      <input type='text' onChange={(e)=>{ setInputValue(e.target.value)}}/>
      <button onClick={addList}>글추가</button>
      { modal == true ? <Modal list={list} title={title}/> : null }

    </div>
  );
}

/* 컴포넌트
// const Modal = () { } // 동일 (const == 수정 불가하여 함수로 만들기 좋음)
 <> </>의미 없는 div 대신 사용
 컴포넌트 쓰기 좋은 경우
 1. 반복적인 html 축약할 때
 2. 큰 페이지
 3. 자주 변경되는 html UI
*/ 
/*
 props문법으로 부모 -> 자식 stae 전송(자식 -> 부모 불가능, 같은 레벨도 불가)
 * 함수도 전달 가능
**/
function Modal(props) {
  return (
    <>
      <div className='modal'>
        <h4>{props.list[props.title].subject}</h4>
        <p>날짜</p>
        <p>상세내용</p>
      </div>
    </>
  )
}

/**
 * 옛날 class react  문법
 * 
 * 기본문법
 constructor(){
    super()
  }
  render(){
    
  }
 
class Modal2 extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      name:"kim",
      age:20
    }
  }
  render(){
    <>
      <div>안녕{this.state.name}</div>
      <button onClick={()=>
        {this.setState({age:21})
      }}>버튼</button>
    </>
  }
}
*/
export default App;
