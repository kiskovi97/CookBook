import { useState, useEffect } from 'react';
import inputStyles from './Input.module.css'
import deleteIcon from '../logos/bin.png';
import checkIcon from '../logos/degree.png';

export interface EventType
{
    target: {
        name: string;
        value: string[];
    }
}

const InputList = ({ onChanged, name, defaultState } : 
    { 
        onChanged: (e: EventType) => void; 
        name: string; 
        defaultState: string[]; 
    }) => {
    const [list, setList] = useState(defaultState);

    const addInstruction = () => {
        let listPrev = [...list];
        listPrev.push("");
        onChanged({
            target: {
                name: name,
                value: [...listPrev ]
            }
        });
        setList([...listPrev ]);
    }

    const removeInstruction = (index : number) => {
        let listPrev = [...list];
        listPrev.splice(index, 1)
        onChanged({
            target: {
                name: name,
                value: [...listPrev ]
            }
        });
        setList([...listPrev ]);
    }

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        let listPrev = [...list];
        listPrev[parseInt(e.target.name)] = e.target.value;
        onChanged({
            target: {
                name: name,
                value: [...listPrev ]
            }
        });
        setList([...listPrev ]);
    }
     useEffect(() => {
            if(defaultState) {
                setList([ ...defaultState ])
            }
        }, [defaultState]);

    return(
        <div className={inputStyles.section}>
            {list?.map((value, index) => (
                <li className={inputStyles.section} key={index}>
                    <textarea className={inputStyles.textarea} rows={8} cols={80}
                        name={index.toString()}
                        value={value}
                        defaultValue={value}
                        onChange={handleChange}
                    />
                    <img src={deleteIcon.src} alt="remove" className={inputStyles.icon} onClick={() => removeInstruction(index)}/>
                </li>
                ))}
                <li  className={inputStyles.section}>
                    <button className={inputStyles.button} onClick={addInstruction}>Add New</button>
                </li>
        </div>)
}

export default InputList;