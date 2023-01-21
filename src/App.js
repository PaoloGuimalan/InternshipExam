import logo from './logo.svg';
import './App.css';
import SaveIcon from '@material-ui/icons/Save'
import FilterIcon from '@material-ui/icons/Sort'
import DeleteIcon from '@material-ui/icons/Delete'
import NextIcon from '@material-ui/icons/NavigateNext'
import PrevIcon from '@material-ui/icons/NavigateBefore'
import IndvMail from './components/jsx/IndvMail';
import sampledata from '../src/components/sampleData/mails.json'
import { useEffect, useState } from 'react';

function App() {

  const [mails, setmails] = useState([]);
  const [checkedmail, setcheckedmail] = useState([]);
  const [checkAllState, setcheckAllState] = useState(false);
  const [maincheck, setmaincheck] = useState(false);

  useEffect(() => {
    // console.log(sampledata)
    setmails(sampledata)
  },[])

  const deleteMailEnlist = (id, bool) => {
    // setmails(mails.filter())
    // console.log(bool)
    if(bool){
      setcheckedmail([
        ...checkedmail,
        id
      ])
      // console.log(checkedmail)
    }
    else{
      setcheckedmail(checkedmail.filter(chkml => (chkml != id)))
    }
  }

  const deleteMail = () => {
    setmails(mails.filter(mls => !checkedmail.includes(mls._id)))
    setcheckedmail([])
    setmaincheck(false)
    setcheckAllState(false)
  }

  const checkAll = () => {
    setcheckAllState(!checkAllState)
    mails.map((chk, i) => {
      setcheckedmail((oldArray) => [...oldArray, chk._id])
    })
    if(checkAllState){
      setcheckedmail([])
    }
  }

  return (
    <div className="App">
      <div id='div_header'>
        <div id='div_input_container'>
          <input type='checkbox' onChange={() => { checkAll() }} onClick={(e) => { setmaincheck(!maincheck) }} checked={maincheck}/>
          <button className='btn_navigations'>SAVE <SaveIcon style={{fontSize: "12px"}} /></button>
          <button className='btn_navigations'>MANAGE FILTERS <FilterIcon style={{fontSize: "12px"}} /></button>
          <span>|</span>
          <button className='btn_navigations' onClick={() => { deleteMail() }}>DELETE <DeleteIcon style={{fontSize: "12px"}} /></button>
        </div>
        <div id='div_page_nav_container'>
          <button className='btn_page_navs'><PrevIcon /></button>
          <span id='span_page_ind'>{checkedmail.length} of {mails.length}</span>
          <button className='btn_page_navs'><NextIcon /></button>
        </div>
      </div>
      <p id='p_label'>Unread</p>
      <div id='div_mail_list_container'>
        <div id='div_container_listing'>
            {mails.map((items, i) => {
              return(
                <IndvMail key={items._id} data={items} callback={(id, bool) => { deleteMailEnlist(id, bool) }} checked={checkAllState} />
              )
            })}
        </div>
      </div>
    </div>
  );
}

export default App;
