import React, { useState, useRef, useEffect } from 'react'
import '../css/IndvMail.css'
import DragIcon from '@material-ui/icons/DragIndicator'
import AttachIcon from '@material-ui/icons/AttachFile'
import TimeIcon from '@material-ui/icons/AccessTime'
import ForwardIcon from '@material-ui/icons/KeyboardArrowRight'
import DownwardIcon from '@material-ui/icons/KeyboardArrowDown'
import { motion } from 'framer-motion'

function IndvMail({data, callback, checked}) {

  const [expand, setexpand] = useState(false)
  const [checkedStatusIndv, setcheckedStatusIndv] = useState(false);

  useEffect(() => {
    setcheckedStatusIndv(checked)
  },[checked])

  const msToTime = (duration, display) => {
    if(display == "preview"){
        var months = [ "January", "February", "March", "April", "May", "June", 
           "July", "August", "September", "October", "November", "December" ];
        const date = new Date(duration)

        var milliseconds = Math.floor((duration % 1000) / 100),
        seconds = Math.floor((duration / 1000) % 60),
        minutes = Math.floor((duration / (1000 * 60)) % 60),
        hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
    
        hours = hours;
        minutes = minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;

        var officialDate = `${months[date.getMonth()]} ${date.getDay()}, ${date.getFullYear()} at ${(hours % 12) || 12}:${minutes} ${hours >= 12 ? 'PM' : 'AM'}`
        return officialDate;
    }
    else if(display == "content"){
        var months = [ "January", "February", "March", "April", "May", "June", 
           "July", "August", "September", "October", "November", "December" ];
        var mS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
        const date = new Date(duration)

        var milliseconds = Math.floor((duration % 1000) / 100),
        seconds = Math.floor((duration / 1000) % 60),
        minutes = Math.floor((duration / (1000 * 60)) % 60),
        hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
    
        hours = hours;
        minutes = minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;

        var officialDate = `${date.getDay()} ${mS[date.getMonth()]} ${date.getFullYear()} ${(hours % 12) || 12}:${minutes} ${hours >= 12 ? 'PM' : 'AM'}`
        return officialDate;
    }
    else if(display == "miniPrev"){
        var months = [ "January", "February", "March", "April", "May", "June", 
        "July", "August", "September", "October", "November", "December" ];
        var mS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
        const date = new Date(duration)

        var milliseconds = Math.floor((duration % 1000) / 100),
        seconds = Math.floor((duration / 1000) % 60),
        minutes = Math.floor((duration / (1000 * 60)) % 60),
        hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
    
        hours = hours;
        minutes = minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;

        var officialDate = (
            <>
                <span className='span_date_prev_labels'>{date.getDay()}</span>
                <span className='span_date_prev_labels'>{mS[date.getMonth()].toUpperCase()}</span>
            </>
        )
        return officialDate;
    }
    else if(display == "estimate"){
        var milliseconds = Math.floor((duration % 1000) / 100),
        seconds = Math.floor((duration / 1000) % 60),
        minutes = Math.floor((duration / (1000 * 60)) % 60),
        hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
    
        hours = hours;
        minutes = minutes;
        seconds = (seconds < 10) ? "0" + seconds : seconds;

        if(hours == 0){
            return minutes + " mins"
        }
        else{
            return hours + " hrs"
        }
    }
  }

  return (
    <div id='div_indvmail'>
        <div id='div_mail_preview'>
            <div id='div_mail_navs'>
                <button className='btn_indv_mail_nav'><DragIcon /></button>
                <input type='checkbox' onChange={(e) => { callback(data._id, e.target.checked) }} onClick={() => { setcheckedStatusIndv(!checkedStatusIndv) }} checked={checkedStatusIndv}/>
                <div id='div_online_indicator' />
                <div id='div_date_prev'>
                    {msToTime(Date.parse(data.date), "miniPrev")}
                </div>
            </div>
            <div id='div_content_preview'>
                <div id='div_sender_prev_container'>
                    <div id='div_sender_prev'>
                        <span id='div_sender_initials'>{data.sender.name.split(" ")[0].split("")[0]}{data.sender.name.split(" ")[1].split("")[0]}</span>
                    </div>
                </div>
                <div id='div_content_prev_details_container'>
                    <span id='span_subject_label'>{data.subject}</span>
                    <div id='div_content_main_container'>
                        <span id='span_sender_label'>{data.sender.name}</span>
                        <span id='span_content_label'>{data.content.paragraph.slice(0, 40)}</span>
                        <span className='divider'>|</span>
                        <span id='span_date_label'>{msToTime(Date.parse(data.date), "preview")}</span>
                        {data.content.attachments != 0? (
                            <>
                                <span className='divider'>|</span>
                                <span id='span_attachments_label'><AttachIcon style={{fontSize: "15px"}} />{data.content.attachments}</span>
                            </>
                        ) : null}
                    </div>
                </div>
            </div>
            <motion.div
            animate={{
                display: data.tags.length != 0? expand? "none" : "flex" : "none"
            }}
            id='div_tags_preview'>
                <span className='span_tags'>{data.tags[0]}</span>
                <span className='span_tags'>{data.tags[1]}</span>
                <span className='span_tags'>{data.tags[2]}</span>
                <span className='span_tags'>+{data.tags.length - 3}</span>
            </motion.div>
            <div id='div_time_expand_container'>
                <span id='span_time_label'><TimeIcon style={{fontSize: "15px"}} />{msToTime(Date.parse(data.date), "estimate")}</span>
                <button id='btn_expand' onClick={() => { setexpand(!expand) }}>{expand? <DownwardIcon /> : <ForwardIcon />}</button>
            </div>
        </div>
        <motion.div
        animate={{
            height: expand? "auto" : "0px"
        }}
        id='div_content_expand_main'>
            <hr />
            <div id='div_expanded_content_header'>
                <div id='div_subject_date_container'>
                    <span id='span_subject_content'>{data.sender.name}</span>
                    <span id='span_date_content'>{msToTime(Date.parse(data.date), "content")}</span>
                </div>
                {data.tags.length != 0? (
                    <div id='div_tags_container'>
                        {data.tags.map((tgs, i) => {
                            return(
                                <span className='span_tags' key={i}>{tgs}</span>
                            )
                        })}
                    </div>
                ) : null}
            </div>
            <div id='div_main_content_container'>
                <p id='p_content_main_holder'>{data.content.paragraph}</p>
            </div>
        </motion.div>
    </div>
  )
}

export default IndvMail