import React, { useEffect } from "react";
import { callsStore } from "../../entities/calls/model/callsStore";

import styles from './calls-list.module.scss';
import { ICall } from "../../entities/calls/model/types";

import CallIn from '../../assets/img/call-in.svg'
import CallOut from '../../assets/img/call-out.svg'
import NoAvatar from '../../assets/img/no-avatar.svg'

import AudioFile from '../../assets/audio/Король и Шут - Лесник [audiovk.com].mp3'
import { AudioPlayer } from "../../widgets/AudioPlayer";

const getCallTypeIcon = (call: ICall) => {
  switch (call.inOut) {
    case 1:
      return CallIn
    case 0:
      return CallOut

    default:
      break;
  }
}

const getTimeFromDate = (date: string) => {
  const breakDate = date.split(' ');
  return breakDate[1]
}

interface ICallProps {
  call: ICall
}

export const CallsItem = ({ call }: ICallProps) => {


  return (
    <li className={styles.callsItem}>
      <div className={styles.callType}>
        <img src={getCallTypeIcon(call)} />
      </div>
      <div className={styles.callTime}>
        <span>
          {getTimeFromDate(call.date)}
        </span>
      </div>
      <div className={styles.callPersonAvatar}>
        <img src={call.personAvatar || NoAvatar} />
      </div>
      <div className={styles.callTel}>
        <span>
          {call.fromNumber}
        </span>
      </div>
      <div className={styles.callSource}>
        <span>
          {call.source}
        </span>
      </div>
      <div className={styles.callMark}>
        <span>
          {''}
        </span>
      </div>
      <div className={styles.callDuration}>
        <div className={styles.audioPlayer}>
          {call.record ? 
          // <audio controls src={AudioFile} style={{height: '40px'}}>
          //   <a href={call.record}> Download audio </a>
          // </audio> 
          <AudioPlayer track={AudioFile}/>
          
          : ''}
        </div>
      </div>
    </li>
  )
}
