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

  useEffect(() => {
    // console.log(sampledata)
    setmails(sampledata)
  },[])

  const deleteMail = () => {
    // setmails(mails.filter())
  }

  return (
    <div className="App">
      <div id='div_header'>
        <div id='div_input_container'>
          <input type='checkbox' />
          <button className='btn_navigations'>SAVE <SaveIcon style={{fontSize: "12px"}} /></button>
          <button className='btn_navigations'>MANAGE FILTERS <FilterIcon style={{fontSize: "12px"}} /></button>
          <span>|</span>
          <button className='btn_navigations'>DELETE <DeleteIcon style={{fontSize: "12px"}} /></button>
        </div>
        <div id='div_page_nav_container'>
          <button className='btn_page_navs'><PrevIcon /></button>
          <span id='span_page_ind'>50 of 100</span>
          <button className='btn_page_navs'><NextIcon /></button>
        </div>
      </div>
      <p id='p_label'>Unread</p>
      <div id='div_mail_list_container'>
        <div id='div_container_listing'>
            {mails.map((items, i) => {
              return(
                <IndvMail key={i} data={items} />
              )
            })}
        </div>
      </div>
    </div>
  );
}

export default App;
