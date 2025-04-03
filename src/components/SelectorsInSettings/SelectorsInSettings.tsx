import { AxiosResponse } from 'axios';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { fetchUserOptions } from '../../getQueries';
import { WorkingSideType, TimeFrameType, changeOptions } from '../../postQueries';
import { getCookie } from '../../utils';
import { MdOutlineReplay, MdSave } from 'react-icons/md';
import { SlSettings } from 'react-icons/sl';
import ButtonWithIcon from '../Buttons/ButtonWithIcon';
import SelectComponent from '../Select/SelectComponent';


const dictionary = {
  "OL": "Only Long",
  "OS": "Only Short",
  "ALL": "All",

  "Only Long": "OL",
  "Only Short": "OS",
  "All": "ALL",
};

type UserOptionsType = {
  timeFrame: 'H' | 'M',
  workingSide: WorkingSideType,
}


const SelectorsInSettings = () => {
	const workingSideOpts = ["Only Long", "Only Short", "All"];
  const timeframeOpts = ["H", "M"];
  const [initialWorkingSide, setInitialWorkingSide] = useState<WorkingSideType | null>(null);
	const [initialTimeFrame, setInitialTimeFrame] = useState<TimeFrameType | null>(null);
  const [workingSide, setWorkingSide] = useState<WorkingSideType | null>(null);
	const [timeFrame, setTimeFrame] = useState<TimeFrameType | null>(null);

  const [isFetched, setIsFetched] = useState<boolean>(false)
  const id = getCookie('id');

  const ChangeOptionsOnServer = async (
    _id: number | null,
    _workingSide: WorkingSideType | null,
    _timeFrame: TimeFrameType | null
  ) => {
		if (_id && _workingSide && _timeFrame) {
			await changeOptions(_id, _workingSide, _timeFrame).then(()=>{

				setInitialWorkingSide(dictionary[_workingSide] as WorkingSideType);
				setWorkingSide(dictionary[_workingSide] as WorkingSideType);

				setInitialTimeFrame(_timeFrame);
				setTimeFrame(_timeFrame);

			});
		}
  }

  useEffect(()=>{
    if (id && !isFetched) 
      fetchUserOptions(id).then((res: AxiosResponse<UserOptionsType>)=>{
        
				//set working side
        setInitialWorkingSide(dictionary[res.data.workingSide] as WorkingSideType);
        setWorkingSide(dictionary[res.data.workingSide] as WorkingSideType);

				//set time frame
				setInitialTimeFrame(res.data.timeFrame);
        setTimeFrame(res.data.timeFrame);

        setIsFetched(true);
    })
  })
	return (
		<div className="flex-column basic-block bottom-border">
        <div className="flex-row gap">
          <div className="rotate icon">
            <SlSettings size='100%'/>
          </div>
          <h1>Настройки</h1>
        </div>
        <p>Сторона, в которую работает бот:</p>
        <div className="flex-row flex-wrap">
          <div style={{ width: "360px", zIndex: '20' }}>
            <SelectComponent
              options={workingSideOpts}
              value={workingSide}
              setValue={setWorkingSide as Dispatch<SetStateAction<string | undefined | null>>}
            />
          </div>
          {workingSide !== initialWorkingSide ? (
            <ButtonWithIcon
              text="Сброс"
              Icon={MdOutlineReplay}
              className="coral-light-bg"
              onClick={() => { 
								setWorkingSide(initialWorkingSide);
							}}
            />
          ) : null}
          {workingSide !== initialWorkingSide ? (
            <ButtonWithIcon 
              text="Сохранить" 
              Icon={MdSave}
              onClick={() => {
								if (id && workingSide && initialTimeFrame) {
									const parsedWorkingSide: WorkingSideType = dictionary[workingSide] as WorkingSideType;
									ChangeOptionsOnServer(parseInt(id), parsedWorkingSide, initialTimeFrame)
								}
              }} 
            />
          ) : null}
        </div>
				<p>Timeframe:</p>
        <div className="flex-row flex-wrap">
          <div style={{ width: "360px", zIndex: '10' }}>
            <SelectComponent
              options={timeframeOpts}
              value={timeFrame}
              setValue={setTimeFrame as Dispatch<SetStateAction<string | undefined | null>>}
            />
          </div>
          {timeFrame !== initialTimeFrame ? (
            <ButtonWithIcon
              text="Сброс"
              Icon={MdOutlineReplay}
              className="coral-light-bg"
              onClick={() => setTimeFrame(initialTimeFrame)}
            />
          ) : null}
          {timeFrame !== initialTimeFrame ? (
            <ButtonWithIcon 
              text="Сохранить" 
              Icon={MdSave}
              onClick={() => {
								if (id && initialWorkingSide && timeFrame) {
									const parsedInitialWorkingSide: WorkingSideType = dictionary[initialWorkingSide] as WorkingSideType;
									ChangeOptionsOnServer(parseInt(id), parsedInitialWorkingSide, timeFrame)
								}
              }} 
            />
          ) : null}
        </div>
      </div>
	)
}

export default SelectorsInSettings